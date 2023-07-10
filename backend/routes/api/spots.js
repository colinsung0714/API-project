const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Price per day is required"),

    handleValidationErrors
];

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

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({})
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
            const { url , preview } = req.body
            let newImg = await currentSpot[0].createSpotImage({ url , preview })
            newImg = newImg.toJSON()
            const body = {}
            body.id = newImg.id
            body.url = newImg.url
            body.preview = newImg.preview
            res.json(body)
        } else {
            const err = new Error()
            err.status = 401
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

router.put('/:spotId',requireAuth, validateSpot, async (req, res, next)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    if(spot) {
        const currentUser = await User.findByPk(req.user.id)
        let currentSpot = await currentUser.getSpots({
            where: {
                ownerId: req.user.id,
                id: req.params.spotId
            }
        })
        if(currentSpot.length) {
            
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
            currentSpot[0]= currentSpot[0].toJSON()
            currentSpot[0].lat = Number(currentSpot[0].lat)
            currentSpot[0].lng = Number(currentSpot[0].lng)
            currentSpot[0].price = Number(currentSpot[0].price)
            currentSpot[0].createdAt =currentSpot[0].createdAt.toISOString().replace('T', ' ').substring(0, 19)
            currentSpot[0].updatedAt =currentSpot[0].updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            res.json(currentSpot[0])
        } else {
            const err = new Error()
            err.status = 401
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