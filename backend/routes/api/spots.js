const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User } = require('../../db/models')
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

router.get('/:spotId', async (req, res, next)=>{
    let oneSpot = await Spot.findByPk(req.params.spotId)
    if(!oneSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err)
    }

    oneSpot = await Spot.findByPk(req.params.spotId, 
        {
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','price','createdAt','updatedAt',[sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']],
        include:[{
            model:SpotImage,
            attributes:['id','url','preview']
        },{
            model:User,
            as:'Owner',
            attributes:['id','firstName','lastName']
        },{
            model:Review,
            attributes:[]
        }
    ],
    group:[
        'Spot.id',
        'SpotImages.id',
        'Owner.id'
    ]
    }
    
    )
   
    if(!oneSpot) {
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
    res.json(oneSpot)
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