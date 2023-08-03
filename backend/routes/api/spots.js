const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const e = require('express');
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Latitude is not valid")
        .custom(value => {
            if (value < -90 || value > 90) {
                return false
            }
            return true
        })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Longitude is not valid")
        .custom(value => {
            if (value < -180 || value > 180) {
                return false
            }
            return true
        })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 30 })
        .withMessage("Description needs a minimum of 30 characters"),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Price per day is required"),

    handleValidationErrors
];
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt().withMessage("Stars must be an integer from 1 to 5")
        .custom((value) => {
            if (value < 1 || value > 5) {
                return false
            }
            return true
        })
        .withMessage("Stars must be an integer from 1 to 5"),

    handleValidationErrors
]
const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            let startDate = new Date(req.body.startDate).getTime()
            let endDate = new Date(value).getTime()
            if (startDate >= endDate) {
                return false
            } else {
                return true
            }
        })
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
]
const validateQuery = [
    query('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage('Size must be greater than or equal to 1'),
    query('minLat')
        .optional()
        .isDecimal()
        .withMessage('Minimum latitude is invalid')
        .custom(value => {
            if (value < -90) {
                return false
            }
            return true
        })
        .withMessage('Minimum latitude is invalid'),
    query('maxLat')
        .optional()
        .isDecimal()
        .withMessage('Maximum latitude is invalid')
        .custom(value => {
            if (value > 90) {
                return false
            }
            return true
        })
        .withMessage('Maximum latitude is invalid'),
    query('minLng')
        .optional()
        .isDecimal()
        .withMessage('Minimum longitude is invalid')
        .custom(value => {
            if (value < -180) {
                return false
            }
            return true
        })
        .withMessage('Minimum longitude is invalid'),
    query('maxLng')
        .optional()
        .isDecimal()
        .withMessage('Maximum longitude is invalid')
        .custom(value => {
            if (value > 180) {
                return false
            }
            return true
        })
        .withMessage('Maximum longitude is invalid'),
    query('minPrice')
        .optional()
        .isDecimal().withMessage("Minimum price must be greater than or equal to 0")
        .custom((value) => {
            if (value < 0) {
                return false
            }
            return true
        }).withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isDecimal().withMessage("Maximum price must be greater than or equal to 0")
        .custom((value) => {
            if (value < 0) {
                return false
            }
            return true
        }).withMessage("Maximum price must be greater than or equal to 0"),

    handleValidationErrors
]
router.get('/current', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    const Spots = [];
    for (let spot of allSpots) {
        let avgRating = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        let previewImage = await spot.getSpotImages({
            attributes: ['url']
        })
        spot = spot.toJSON();
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
        spot.createdAt = spot.createdAt.toISOString().replace('T', ' ').substring(0, 19)
        spot.updatedAt = spot.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
        for (let num of avgRating) {
            num = num.toJSON();
            spot.avgRating = parseInt((Object.values(num)[0]));
        }
        for (let url of previewImage) {
            url = url.toJSON();
            spot.previewImage = Object.values(url)[0];
        }
        Spots.push(spot);
    }


    res.json({ Spots })

})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    const spots = await Spot.findAll({ where: { id: req.params.spotId } })
    if (spots.length) {
        const bookingArr = [];
        for (let spot of spots) {
            let bookings = await spot.getBookings({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ],
                attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
            })
            for (let booking of bookings) {
                const bookingObj = {}
                if (spot.ownerId === currentUser.id) {
                    booking = booking.toJSON()
                    bookingObj.User = booking.User
                    bookingObj.id = booking.id
                    bookingObj.spotId = booking.spotId
                    bookingObj.userId = booking.userId
                    bookingObj.startDate = booking.startDate.toISOString().replace('T', ' ').substring(0, 10)
                    bookingObj.endDate = booking.endDate.toISOString().replace('T', ' ').substring(0, 10)
                    bookingObj.createdAt = booking.createdAt.toISOString().replace('T', ' ').substring(0, 19)
                    bookingObj.updatedAt = booking.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
                    bookingArr.push(bookingObj)
                } else {
                    bookingObj.spotId = booking.spotId,
                        bookingObj.startDate = booking.startDate.toISOString().replace('T', ' ').substring(0, 10)
                    bookingObj.endDate = booking.endDate.toISOString().replace('T', ' ').substring(0, 10)
                    bookingArr.push(bookingObj)
                }
            }

        }

        res.json({ Bookings: bookingArr })
    } else {
        const err = new Error();
        err.status = 404
        err.message = "Spot couldn't be found"
        next(err)
    }
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const reviews = await spot.getReviews({
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        })
        res.json({ Reviews: reviews })
    } else {
        const err = new Error();
        err.status = 404
        err.message = "Spot couldn't be found"
        next(err)
    }
})

router.get('/:spotId', async (req, res, next) => {
    let oneSpot = await Spot.findByPk(req.params.spotId)
    if (!oneSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err)
    }

    oneSpot = await Spot.findByPk(req.params.spotId,
        {
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'], [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']],
            include: [{
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: Review,
                attributes: []
            }
            ],
            group: [
                'Spot.id',
                'SpotImages.id',
                'Owner.id'
            ]
        }

    )

    if (!oneSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err)
    }
    // const reviews = await oneSpot.getReviews();
    // const numReviews = reviews.length
    // let starsSum = 0;
    // for(let review of reviews) {
    //     starsSum += review.stars
    // }
    // const avgStarRating = starsSum/numReviews

    oneSpot = oneSpot.toJSON();
    oneSpot.lat = Number(oneSpot.lat)
    oneSpot.lng = Number(oneSpot.lng)
    oneSpot.price = Number(oneSpot.price)
    oneSpot.numReviews = Number(oneSpot.numReviews)
    oneSpot.avgStarRating = Number(oneSpot.avgStarRating)
    oneSpot.createdAt = oneSpot.createdAt.toISOString().replace('T', ' ').substring(0, 19)
    oneSpot.updatedAt = oneSpot.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
    res.json(oneSpot)
})

router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    if (!page) page = 1
    if (!size) size = 20
    const pagenation = {}
    if (page >= 1 && size >= 1) {
        pagenation.limit = size
        pagenation.offset = (page - 1) * size
    }
    const where = {}
    if (minLat) where.lat = { [Op.gte]: minLat }
    if (maxLat) where.lat = { [Op.lte]: maxLat }
    if (minLng) where.lng = { [Op.gte]: minLng }
    if (maxLng) where.lng = { [Op.lte]: maxLng }
    if (minPrice) where.price = { [Op.gte]: minPrice }
    if (maxPrice) where.price = { [Op.lte]: maxPrice }

    const allSpots = await Spot.findAll({
        where,
        ...pagenation
    })
    const Spots = [];
    for (let spot of allSpots) {
        let avgRating = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        let previewImage = await spot.getSpotImages({
            attributes: ['url']
        })
        spot = spot.toJSON();
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
        spot.createdAt = spot.createdAt.toISOString().replace('T', ' ').substring(0, 19)
        spot.updatedAt = spot.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
        for (let num of avgRating) {
            num = num.toJSON();
            spot.avgRating = parseInt((Object.values(num)[0]));
        }
        for (let url of previewImage) {
            url = url.toJSON();
            spot.previewImage = Object.values(url)[0];
        }
        Spots.push(spot);
    }

    page = Number(page)
    size = Number(size)
    res.json({ Spots, page, size })
})

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (currentUser.id !== spot.ownerId) {
            let { startDate, endDate } = req.body
            const bookings = await spot.getBookings({
                attributes: ['startDate', 'endDate']
            })
            const pivStartDate = new Date(startDate).getTime()
            const pivEndDate = new Date(endDate).getTime()
            for (let booking of bookings) {
                const bookingStartDate = new Date(booking.startDate).getTime()
                const bookingEndDate = new Date(booking.endDate).getTime()
                if (pivStartDate === bookingStartDate || (pivStartDate > bookingStartDate && pivStartDate < bookingEndDate)) {
                    const err = new Error()
                    const errObj = {}
                    err.status = 403
                    err.message = "Sorry, this spot is already booked for the specified dates"
                    errObj.startDate = "Start date conflicts with an existing booking"
                    if (pivEndDate === bookingEndDate || (pivEndDate > bookingStartDate && pivEndDate < bookingEndDate)) {
                        errObj.endDate = "End date conflicts with an existing booking"
                    }
                    err.errors = errObj
                    return next(err)
                }
                if (pivEndDate === bookingEndDate || (pivEndDate > bookingStartDate && pivEndDate < bookingEndDate)) {
                    const err = new Error()
                    const errObj = {}
                    err.status = 403
                    err.message = "Sorry, this spot is already booked for the specified dates"
                    errObj.endDate = "End date conflicts with an existing booking"
                    if (pivStartDate === bookingStartDate || (pivStartDate > bookingStartDate && pivStartDate < bookingEndDate)) {
                        errObj.startDate = "Start date conflicts with an existing booking"
                    }
                    err.errors = errObj
                    return next(err)
                }
            }
            const body = {}
            body.userId = currentUser.id
            body.startDate = startDate
            body.endDate = endDate
            const newBooking = await spot.createBooking(body)

            let bodyBooking = newBooking.toJSON()
            bodyBooking.startDate = bodyBooking.startDate.toISOString().replace('T', ' ').substring(0, 10)
            bodyBooking.endDate = bodyBooking.endDate.toISOString().replace('T', ' ').substring(0, 10)
            bodyBooking.createdAt = bodyBooking.createdAt.toISOString().replace('T', ' ').substring(0, 19)
            bodyBooking.updatedAt = bodyBooking.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            res.json(bodyBooking)
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Spot must NOT belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        next(err)
    }
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const currentUser = await User.findByPk(req.user.id)
        let currentSpot = await currentUser.getSpots({
            where: {
                ownerId: req.user.id,
                id: req.params.spotId
            }
        })
        if (currentSpot.length) {
            const { url, preview } = req.body
            let newImg = await currentSpot[0].createSpotImage({ url, preview })
            newImg = newImg.toJSON()
            const body = {}
            body.id = newImg.id
            body.url = newImg.url
            body.preview = newImg.preview
            res.json(body)
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Spot must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        next(err)
    }
})

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { review, stars } = req.body
    if (spot) {
        const reviews = await spot.getReviews({ where: { userId: req.user.id } })
        if (reviews.length) {
            const err = new Error();
            err.status = 500;
            err.message = "User already has a review for this spot"
            next(err)
        } else {
            const currentUser = await User.findByPk(req.user.id)
            let newReview = await spot.createReview({ review, stars, userId: currentUser.id })
            newReview = newReview.toJSON()
            newReview.stars = Number(newReview.stars)
            newReview.createdAt = newReview.createdAt.toISOString().replace('T', ' ').substring(0, 19)
            newReview.updatedAt = newReview.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            res.status(201).json(newReview)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        next(err)
    }
})


router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const currentUser = await User.findByPk(req.user.id)

    if (currentUser) {
        let newSpot = await currentUser.createSpot({ address, city, state, country, lat, lng, name, description, price })
        newSpot = newSpot.toJSON()
        newSpot.lat = Number(newSpot.lat)
        newSpot.lng = Number(newSpot.lng)
        newSpot.price = Number(newSpot.price)
        newSpot.createdAt = newSpot.createdAt.toISOString().replace('T', ' ').substring(0, 19)
        newSpot.updatedAt = newSpot.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
        res.status(201).json(newSpot)
    }
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const currentUser = await User.findByPk(req.user.id)
        let currentSpot = await currentUser.getSpots({
            where: {
                ownerId: req.user.id,
                id: req.params.spotId
            }
        })
        if (currentSpot.length) {

            const { address, city, state, country, lat, lng, name, description, price } = req.body
            currentSpot[0].address = address
            currentSpot[0].city = city
            currentSpot[0].state = state
            currentSpot[0].country = country
            currentSpot[0].lat = lat
            currentSpot[0].lng = lng
            currentSpot[0].name = name
            currentSpot[0].description = description
            currentSpot[0].price = price
            await currentSpot[0].save()
            currentSpot[0] = currentSpot[0].toJSON()
            currentSpot[0].lat = Number(currentSpot[0].lat)
            currentSpot[0].lng = Number(currentSpot[0].lng)
            currentSpot[0].price = Number(currentSpot[0].price)
            currentSpot[0].createdAt = currentSpot[0].createdAt.toISOString().replace('T', ' ').substring(0, 19)
            currentSpot[0].updatedAt = currentSpot[0].updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            res.json(currentSpot[0])
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Spot must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        next(err)
    }
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        const currentUser = await User.findByPk(req.user.id)
        const currentSpot = await currentUser.getSpots({
            where: {
                ownerId: req.user.id,
                id: req.params.spotId
            }
        })
        if (currentSpot.length) {
            await currentSpot[0].destroy()
            res.json({ message: "Successfully deleted" })
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Spot must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        next(err)
    }
})

module.exports = router;