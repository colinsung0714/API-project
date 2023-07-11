const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    if (currentUser) {
        const bookings = await currentUser.getBookings({
            include: [{
                model: Spot,
                attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
                include:[{
                    model:SpotImage,
                    attributes:['url']
                }]
            }],
            attributes:['id','spotId','userId','startDate','endDate','createdAt','updatedAt']
        })
        const bookingArr = []
        for (let booking of bookings) {
            const bookingObj = {}
            booking = booking.toJSON()       
            booking.Spot.lat = Number(booking.Spot.lat)
            booking.Spot.lng = Number(booking.Spot.lng)
            booking.Spot.price = Number(booking.Spot.price)
            const spotImgs = booking.Spot.SpotImages
            for(let spotImg of spotImgs) {
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

module.exports = router;