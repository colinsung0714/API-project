import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { fethPostNewSpot, fetchPostNewImage, fetchGetSpotDetail, fetchEditNewSpot, fetchEditImage } from '../../store/spots'
import './NewSpotPage.css'

const NewSpotPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const formType = location.state?.formType || 'create'
    const spotId = location.state?.spotId
    const updateImages = useSelector(state => state.spots.singleSpot.SpotImages)
    const updateSpot = useSelector(state => state.spots.singleSpot)
    let updateId = spotId
    useEffect(() => {
        if (formType === 'update') {
            dispatch(fetchGetSpotDetail(spotId)).then(res => {
                const [img1, img2, img3, img4, img5] = res.spot.SpotImages
                setPrice(res.spot.price)
                setCountry(res.spot.country)
                setAddress(res.spot.address)
                setCity(res.spot.city)
                setState(res.spot.state)
                setLatitude(res.spot.lat)
                setLongitude(res.spot.lng)
                setDescription(res.spot.description)
                setTitle(res.spot.name)
                setPreviewImg(img1?.url ? img1.url : '')
                setImgurlOne(img2?.url ? img2.url : '')
                setImgurlTwo(img3?.url ? img3.url : '')
                setImgurlThree(img4?.url ? img4.url : '')
                setImgurlFour(img5?.url ? img5.url : '')
            })
        } else {

            setPrice('')
            setCountry('')
            setAddress('')
            setCity('')
            setState('')
            setLatitude('')
            setLongitude('')
            setDescription('')
            setTitle('')
            setPreviewImg('')
            setImgurlOne('')
            setImgurlTwo('')
            setImgurlThree('')
            setImgurlFour('')
        }
    }, [dispatch, formType, spotId])
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [imgurlOne, setImgurlOne] = useState('')
    const [imgurlTwo, setImgurlTwo] = useState('')
    const [imgurlThree, setImgurlThree] = useState('')
    const [imgurlFour, setImgurlFour] = useState('')
    const [errors, setErrors] = useState({})




    const dispatchImage = async (url, spotId) => {
        return await dispatch(fetchPostNewImage(url, spotId))
    }
    const checkingImgUrlExt = (img) => {
        // if (img) {
        // if (!img.length) return true
        if (img.includes('.png') || img.includes('.jpg') || img.includes('.jpeg')) {
            const splitPart = img.split('.')
            const lastPart = splitPart[splitPart.length - 1]
            if (lastPart !== 'png' && lastPart !== 'jpg' && lastPart !== 'jpeg') {
                return true
            }
            return false
        }
        // return true
        // }
        // return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const error = {}
        // if (description.length < 30) error.description = "Description needs a minimum of 30 characters"
        // if (!country.length) error.country = 'Country is required'
        // if (!city.length) error.city = 'City is required'
        // if (!state.length) error.state = 'State is required'
        // if (!latitude.length) error.lat = 'Latitude is required'
        // if (!longitude.length) error.lng = 'Longitude is required'
        // if (!title.length) error.name = 'Name is required'
        // if (!price.length) error.price = 'Price is requred'
        // if (!previewImg.length) error.previewImg = 'Preview image is required'
        // if (!address.length) error.address = 'Adress is required'
        // if (checkingImgUrlExt(previewImg)) error.previewImgExt = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (checkingImgUrlExt(imgurlOne)) error.imgurlOne = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (checkingImgUrlExt(imgurlTwo)) error.imgurlTwo = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (checkingImgUrlExt(imgurlThree)) error.imgurlThree = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (checkingImgUrlExt(imgurlFour)) error.imgurlFour = 'Image URL must end in .png, .jpg, or .jpeg'
        const newSpot = {
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name: title,
            description,
            price
        }
 
        // if(updateImages) imgUrls = [...updateImages]
        let spotId;
      
        const imgArr = [previewImg && previewImg, imgurlOne && imgurlOne, imgurlTwo && imgurlTwo, imgurlThree && imgurlThree, imgurlFour && imgurlFour]
        if (!Object.values(error).length) {
            if (formType === 'update') {
                let imgUrls = [
                    {id:updateImages[0]?.id , url:previewImg},
                    {id:updateImages[1]?.id, url:imgurlOne},
                    {id:imgurlTwo[2]?.id, url:imgurlTwo},
                    {id:imgurlThree[3]?.id, url:imgurlThree},
                    {id:imgurlFour[4]?.id, url:imgurlFour}
                ]
                dispatch(fetchEditNewSpot(newSpot, updateSpot.id, imgUrls))
                    .then(
                       dispatch(fetchEditImage(imgUrls))
                    )
                    .then(() => {
                        setErrors({})
                        return history.push(`/spots/${updateId}`)
                    }).catch(async res => {
                        const error = await res.json()
                        if (error.errors) {
                            let errorObj = { ...error.errors }
                            if (!previewImg.length) errorObj.previewImg = 'Preview image is required'
                            if (checkingImgUrlExt(previewImg)) errorObj.previewImgExt = 'Image URL must end in .png, .jpg, or .jpeg'
                            if (checkingImgUrlExt(imgurlOne)) errorObj.imgurlOne = 'Image URL must end in .png, .jpg, or .jpeg'
                            if (checkingImgUrlExt(imgurlTwo)) errorObj.imgurlTwo = 'Image URL must end in .png, .jpg, or .jpeg'
                            if (checkingImgUrlExt(imgurlThree)) errorObj.imgurlThree = 'Image URL must end in .png, .jpg, or .jpeg'
                            if (checkingImgUrlExt(imgurlFour)) errorObj.imgurlFour = 'Image URL must end in .png, .jpg, or .jpeg'
                            setErrors(errorObj);
                        }
                    })
                    return;
            } 

            dispatch(fethPostNewSpot(newSpot)).then(spot => {
                spotId = spot.id
                for (let i = 0; i < imgArr.length; i++) {
                    let imgurl = imgArr[i]
                    const url = {}
                    if (imgurl) {
                        if (i === 0) {
                            url.preview = true
                            url.url = imgurl
                            dispatchImage(url, spotId)
                            continue;
                        }
                        url.url = imgurl
                        url.preview = false
                        console.log(url)
                        dispatchImage(url, spotId)
                    }
                }
                setErrors({})
                history.push(`/spots/${spotId}`)

            }).catch(async res => {
                const error = await res.json()
                if (error.errors) {
                    let errorObj = { ...error.errors }
                    if (!previewImg.length) errorObj.previewImg = 'Preview image is required'
                    if (checkingImgUrlExt(previewImg)) errorObj.previewImgExt = 'Image URL must end in .png, .jpg, or .jpeg'
                    if (checkingImgUrlExt(imgurlOne)) errorObj.imgurlOne = 'Image URL must end in .png, .jpg, or .jpeg'
                    if (checkingImgUrlExt(imgurlTwo)) errorObj.imgurlTwo = 'Image URL must end in .png, .jpg, or .jpeg'
                    if (checkingImgUrlExt(imgurlThree)) errorObj.imgurlThree = 'Image URL must end in .png, .jpg, or .jpeg'
                    if (checkingImgUrlExt(imgurlFour)) errorObj.imgurlFour = 'Image URL must end in .png, .jpg, or .jpeg'
                    setErrors(errorObj);
                }
            })
        } else {
            setErrors(error)
        }
    }
    return (
        <div className="new-spot-container">


            <form onSubmit={e => handleSubmit(e)}>

                <div className="place-image-container">
                    <h1>
                        {formType === 'update' ? 'Update your Spot' : 'Create a New Spot'}
                    </h1>
                    <div className="new-from-subheading">
                        Where's Your Place Located?
                    </div>
                    <div className="new-form-content">
                        Guest will only get your exact address once they booked a reservation.
                    </div>
                    <div className="country-input-container">
                        <div className="country-label-container">
                            <label htmlFor="country">Country</label>
                            <p>{errors?.country && errors?.country}</p>
                        </div>
                        <input id="country-input" type="text" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="address-input-container">
                        <div className="address-error-conainer">
                            <label htmlFor="address">Street Address</label>
                            <p>{errors?.address && errors?.address}</p>
                        </div>
                        <input id='address-input' type="text" name="address" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="city-state-container">
                        <div className='city-container'>
                            <div className="city-error-container">
                                <label htmlFor="city">City</label>
                                <p>{errors?.city && errors?.city}</p>
                            </div>
                            <input type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="space-dot"> , </div>
                        <div className="state-container">
                            <div className="state-error-container">
                                <label htmlFor="state">State</label>
                                <p>{errors?.state && errors?.state}</p>
                            </div>
                            <input type="text" name="state" placeholder="state" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <div className="lat-lng-container">
                        <div className="lat-container">
                            <div className="lat-error-container">
                                <label htmlFor="latitude">Latitude</label>
                                <p>{errors?.lat && errors?.lat}</p>
                            </div>
                            <input type="number" name="latitude" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                        <div className="space-dot-one"> , </div>
                        <div className="lng-container">
                            <div className="lng-error-container">
                                <label htmlFor="longitude">Longitude</label>
                                <p>{errors?.lng && errors?.lng}</p>
                            </div>
                            <input type="number" name="longitude" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        </div>
                    </div>
                    <div className="describe-container">
                        <div className="new-from-subheading">
                            Describe your place to guests
                        </div>
                        <div className="new-form-content">
                            Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                        </div>
                        <div className="description-error-container">
                            <textarea id='describe-input' type="text" name="description" placeholder="Please write at least 30 characters" value={description} onChange={e => setDescription(e.target.value)} />
                            <p>{errors?.description && errors?.description}</p>
                        </div>
                        <div className="spot-name-container">
                            <div className="new-from-subheading" >Create a title for your spot</div>
                            <div className="new-form-content">Catch guests' attention with a spot title that highlights what makes your place special.</div>
                            <div className="title-error-container">
                                <input type="text" name="title" placeholder="Name of your spot" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <p>{errors?.name && errors?.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="spot-price-container">
                        <div>
                            <div className="new-from-subheading" >Set a base price for your spot</div>
                            <div className="new-form-content">Competitive pricing can help your listing stand out and rank higher in search results.</div>
                            <div className="price-error-container">
                                <div className="icon-price-container">
                                    <label htmlFor="price"><i className="fa-solid fa-dollar-sign"></i></label>
                                    <input type='number' name="price" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <p>{errors?.price && errors?.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="img-url-container">
                        <div className="new-from-subheading">Liven up your spot with photos</div>
                        <div className="new-form-content">Submit a link to at least one photo to publish your spot.</div>
                        <input type='url' name="previewImage" placeholder="Preview Image URL" value={previewImg} onChange={(e) => setPreviewImg(e.target.value)} />
                        <p>{errors?.previewImg && errors?.previewImg}</p>
                        <p>{errors?.previewImgExt && errors?.previewImgExt}</p>
                        <input type='url' name="imageOne" placeholder="Image URL" value={imgurlOne} onChange={(e) => setImgurlOne(e.target.value)} />
                        <p>{errors?.imgurlOne && errors?.imgurlOne}</p>
                        <input type='url' name="imageTwo" placeholder="Image URL" value={imgurlTwo} onChange={(e) => setImgurlTwo(e.target.value)} />
                        <p>{errors?.imgurlTwo && errors?.imgurlTwo}</p>
                        <input type='url' name="imageThree" placeholder="Image URL" value={imgurlThree} onChange={(e) => setImgurlThree(e.target.value)} />
                        <p>{errors?.imgurlThree && errors?.imgurlThree}</p>
                        <input type='url' name="imageFour" placeholder="Image URL" value={imgurlFour} onChange={(e) => setImgurlFour(e.target.value)} />
                        <p>{errors?.imgurlFour && errors?.imgurlFour}</p>
                    </div>
                </div>



                <button id="new-spot-submit" type="submit">{formType === 'update' ? 'Update your Spot' : 'Create a New Spot'}</button>
            </form>
        </div>
    )
}

export default NewSpotPage