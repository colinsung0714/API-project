const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

router.put('/:imageId', requireAuth, async (req, res, next)=>{
    const { url, id } = req.body
    let spotImage = await SpotImage.findByPk(id, {
        include: [{
            model: Spot
        }]
    })
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.id === spotImage.Spot.ownerId) {
        if(spotImage) {
        spotImage.url = url
        await spotImage.save()
        res.status(201).json(spotImage)
        } else {
        const err = new Error();
        err.status = 404;
        err.message = "Spot Image couldn't be found"
        next(err)
        }
    } else {
        const err =new Error()
        err.status = 403
        err.message = 'Image must belong to the current user'
        next(err)
    }
   
})

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