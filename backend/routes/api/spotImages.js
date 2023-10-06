const express = require('express')
const router = express.Router();
const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3')
router.put('/:spotId', multipleMulterUpload('images'), requireAuth, async (req, res, next)=>{

    const spot = await Spot.findByPk(req.params.spotId)
    const spotImages = await spot.getSpotImages({
    })
   
    const currentUser = await User.findByPk(req.user.id)
    if(currentUser.id === spot.ownerId) {
        const imagesList = await multiplePublicFileUpload(req.files)
        let newImg
        let body = []
        if(imagesList.length) {
            if(spotImages.length) {
                for(let img of spotImages) {
                    await img.destroy()
                }
            }
            for (let i = 0; i < imagesList.length; i++) {
                const imgObj = {}
                const imgUrl = imagesList[i]
                let url;
                let preview;
                if (i === 0) {
                    url = imgUrl
                    preview = true
                    newImg = await spot.createSpotImage({ url, preview });
                    newImg = newImg.toJSON()
                    imgObj.id = newImg.id
                    imgObj.url = newImg.url
                    imgObj.preview = newImg.preview
                    body.push(imgObj)
                } else {
                    preview = false
                    url = imgUrl
                    newImg = await spot.createSpotImage({ url, preview })
                    newImg = newImg.toJSON()
                    imgObj.id = newImg.id
                    imgObj.url = newImg.url
                    imgObj.preview = newImg.preview
                    body.push(imgObj)
                }
            }
            return res.status(201).json(body)
        } else {
            return res.status(201).json(spotImages)
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