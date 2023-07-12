const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: [{
            model: Spot
        }]
    })
    const currentUser = await User.findByPk(req.user.id)
    if (spotImage) {
        if (spotImage.Spot.ownerId === currentUser.id) {
            await spotImage.destroy();
            res.json({
                message: "Successfully deleted"
            })
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Spot must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot Image couldn't be found"
        next(err)
    }
})

module.exports = router;