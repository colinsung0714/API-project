const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage } = require('../../db/models')
const { requireAuth } =require('../../utils/auth')

router.get('/current',requireAuth,async (req, res)=>{
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    const Spots = [];
    for(let spot of allSpots) {
        let avgRating = await spot.getReviews({
            attributes:[[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        let previewImage = await spot.getSpotImages({
            attributes:['url']
        })
        spot = spot.toJSON();
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
        for(let num of avgRating) {
            num = num.toJSON();
            spot.avgRating = parseInt((Object.values(num)[0]));
        }
        for (let url of previewImage) {
            url = url.toJSON();
            spot.previewImage = Object.values(url)[0];
        }
        Spots.push(spot);
    }
    
  
    res.json({Spots})

})

router.get('/', async (req, res)=>{
    const allSpots = await Spot.findAll({})
    const Spots = [];
    for(let spot of allSpots) {
        let avgRating = await spot.getReviews({
            attributes:[[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        let previewImage = await spot.getSpotImages({
            attributes:['url']
        })
        spot = spot.toJSON();
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
        for(let num of avgRating) {
            num = num.toJSON();
            spot.avgRating = parseInt((Object.values(num)[0]));
        }
        for (let url of previewImage) {
            url = url.toJSON();
            spot.previewImage = Object.values(url)[0];
        }
        Spots.push(spot);
    }
    
  
    res.json({Spots})
})

module.exports = router;