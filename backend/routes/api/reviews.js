const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')

router.get('/current', requireAuth, async (req, res , next)=>{
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser) {
        let reviews = await currentUser.getReviews({
            include:[
                {
                    model:User,
                    attributes:['id','firstName','lastName']
                },
                {
                    model:Spot,
                    attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
                    include:[{
                        model:SpotImage,
                        attributes:['url']
                    }]
                },
                {
                    model:ReviewImage,
                    attributes:['id','url']
                }
            ]
        })
        const Reviews = []
        for(let review of reviews) {
            review = review.toJSON()
            for(let prvImg of  review.Spot.SpotImages ) {
                const value = Object.values(prvImg)
                const [valueUrl] = value
                review.Spot.previewImage = valueUrl
            }
            review.Spot.lat= Number(review.Spot.lat)
            review.Spot.lng=Number(review.Spot.lng)
            review.Spot.price= Number(review.Spot.price)
            delete review.Spot.SpotImages
            Reviews.push(review)
        }
        res.json({Reviews:Reviews})
    }
})

module.exports = router;