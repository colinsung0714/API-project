const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.id)
    const review = await Review.findByPk(req.params.imageId)
    if (review) {
        if (review.userId === currentUser.id) {
            await review.destroy()
            res.json({
                message: 'Successfully deleted'
            })
        } else {
            const err = new Error()
            err.status = 403
            err.message = 'Review must belong to the current user'
            next(err)
        }
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Review Image couldn't be found"
        next(err)
    }
})

module.exports = router;