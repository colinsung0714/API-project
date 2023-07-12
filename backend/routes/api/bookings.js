const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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

router.get('/current', requireAuth, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    if (currentUser) {
        const bookings = await currentUser.getBookings({
            include: [{
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [{
                    model: SpotImage,
                    attributes: ['url']
                }]
            }],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        })
        const bookingArr = []
        for (let booking of bookings) {
            const bookingObj = {}
            booking = booking.toJSON()
            booking.Spot.lat = Number(booking.Spot.lat)
            booking.Spot.lng = Number(booking.Spot.lng)
            booking.Spot.price = Number(booking.Spot.price)
            const spotImgs = booking.Spot.SpotImages
            for (let spotImg of spotImgs) {
                booking.Spot.previewImage = spotImg.url
            }
            delete booking.Spot.SpotImages
            booking.createdAt = booking.createdAt.toISOString().replace('T', ' ').substring(0, 19)
            booking.updatedAt = booking.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            booking.startDate = booking.startDate.toISOString().replace('T', ' ').substring(0, 10)
            booking.endDate = booking.endDate.toISOString().replace('T', ' ').substring(0, 10)
            bookingObj.id = booking.id
            bookingObj.spotId = booking.spotId
            bookingObj.Spot = booking.Spot
            bookingObj.userId = booking.userId
            bookingObj.startDate = booking.startDate
            bookingObj.endDate = booking.endDate
            bookingObj.createdAt = booking.createdAt
            bookingObj.updatedAt = booking.updatedAt
            bookingArr.push(bookingObj)
        }
        res.json({ Bookings: bookingArr })
    }
})

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    const booking = await Booking.findByPk(req.params.bookingId)
    if (booking) {
        const bookings = await currentUser.getBookings({ where: { id: req.params.bookingId } })
        if (bookings.length) {

            let { startDate, endDate } = req.body
            for (let booking of bookings) {
                const bookingStartDate = new Date(booking.startDate).getTime()
                const bookingEndDate = new Date(booking.endDate).getTime()
                const pivStartDate = new Date(startDate).getTime()
                const pivEndDate = new Date(endDate).getTime()
                const currentDate = new Date().getTime()
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
                    next(err)
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
                    next(err)
                }
                if (currentDate > bookingEndDate) {
                    const err = new Error()
                    err.status = 403
                    err.message = "Past bookings can't be modified"
                    next(err)
                }
            }
            bookings[0].startDate = startDate
            bookings[0].endDate = endDate
            await bookings[0].save()
            let bookingBody = bookings[0].toJSON()
            bookingBody.startDate = bookingBody.startDate.toISOString().replace('T', ' ').substring(0, 10)
            bookingBody.endDate = bookingBody.endDate.toISOString().replace('T', ' ').substring(0, 10)
            bookingBody.createdAt = bookingBody.createdAt.toISOString().replace('T', ' ').substring(0, 19)
            bookingBody.updatedAt = bookingBody.updatedAt.toISOString().replace('T', ' ').substring(0, 19)
            res.json(bookingBody)
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Booking must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404
        err.message = "Booking couldn't be found"
        next(err)
    }
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    const booking = await Booking.findByPk(req.params.bookingId)
    
    if (booking) {
        const spot = await booking.getSpot()
        if (booking.userId === currentUser.id || spot.ownerId === currentUser.id) {
            const currentDate = new Date().getTime()
            const bookingStartDate = new Date(booking.startDate).getTime()
            if (currentDate > bookingStartDate) {
                const err = new Error()
                err.status = 403
                err.message = "Bookings that have been started can't be deleted"
                next(err)
            } else {
                await booking.destroy()
                res.json({
                    message: "Successfully deleted"
                })
            }
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Booking must belong to the current user or the Spot must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404
        err.message = "Booking couldn't be found"
        next(err)
    }
})

module.exports = router;