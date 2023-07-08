const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage } = require('../../db/models')
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
        for(let num of avgRating) {
            num = num.toJSON();
            spot.avgRating = Object.values(num)[0];
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