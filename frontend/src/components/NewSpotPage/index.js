import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { fethPostNewSpot, fetchPostNewImage } from '../../store/spots'
import './NewSpotPage.css'
const NewSpotPage = () => {
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
    const dispatch = useDispatch()
    const history = useHistory()
    const dispatchImage = async (url, spotId) => {
        return await dispatch(fetchPostNewImage(url, spotId))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const error = {}
        if (description.length < 30) error.description = "Description needs a minimum of 30 characters"
        if (!country.length) error.country = 'Country is required'
        if (!city.length) error.city = 'City is required'
        if (!state.length) error.state = 'State is required'
        if (!latitude.length) error.lat = 'Latitude is required'
        if (!longitude.length) error.lng = 'Longitude is required'
        if (!title.length) error.name = 'Name is required'
        if (!price.length) error.price = 'Price is requred'
        if (!previewImg.length) error.previewImg = 'Preview image is required'
        if (previewImg.split('.')[1] !=='png' && previewImg.split('.')[1] !=='jpg' && previewImg.split('.')[1] !=='jpeg' ) error.previewImgExt = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imgurlOne.split('.')[1] !=='png' && imgurlOne.split('.')[1] !=='jpg' && imgurlOne.split('.')[1] !=='jpeg' ) error.imgurlOne = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imgurlTwo.split('.')[1] !=='png' && imgurlTwo.split('.')[1] !=='jpg' && imgurlTwo.split('.')[1] !=='jpeg' ) error.imgurlTwo = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imgurlThree.split('.')[1] !=='png' && imgurlThree.split('.')[1] !=='jpg' && imgurlThree.split('.')[1] !=='jpeg' ) error.imgurlThree = 'Image URL must end in .png, .jpg, or .jpeg'
        if (imgurlFour.split('.')[1] !=='png' && imgurlFour.split('.')[1] !=='jpg' && imgurlFour.split('.')[1] !=='jpeg' ) error.imgurlFour = 'Image URL must end in .png, .jpg, or .jpeg'
        let spotId;

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
        const imgArr = [previewImg && previewImg, imgurlOne && imgurlOne, imgurlTwo && imgurlTwo, imgurlThree && imgurlThree, imgurlFour && imgurlFour]
        if (!Object.values(error).length) {
            dispatch(fethPostNewSpot(newSpot)).then(spot => {
                spotId = spot.id
                for (let i = 0; i < imgArr.length; i++) {
                    let imgurl = imgArr[i]
                    const url = {}
                    if (imgurl) {
                        if (i === 0) {
                            url.preview = true
                            url.url = imgurl
                        }
                        url.url = imgurl
                        url.preview = false
                        dispatchImage(url, spotId)
                    }
                }
                setErrors({})
                return history.push(`/spots/${spotId}`)

            }).catch(res => {

                if (res && res.message) {
                    setErrors(res.message);
                }
            })
        } else {
            setErrors(error)
        }
    }
    return (
        <div>
            <h1>
                Create a New Spot
            </h1>

            <form onSubmit={e => handleSubmit(e)}>
                <div className="plcae-info-container">
                    <div>
                        Where's Your Place Located?
                    </div>
                    <div>
                        Guest will only get your exact address once they booked a reservation.
                    </div>
                    <div>
                    <label htmlFor="country">Country</label>
                    <p>{errors.country && errors.country}</p>
                    </div>
                    <input type="text" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    <div>
                    <label htmlFor="address">Address</label>
                    <p>{errors.address && errors.address}</p>
                    </div>
                    <input type="text" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <div className="city-state-container">
                        <div className='city-container'>
                            <div>
                            <label htmlFor="city">City</label>
                            <p>{errors.city && errors.city}</p>
                            </div>
                            <input type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="state-container">
                            <div>
                            <label htmlFor="state">State</label>
                            <p>{errors.state && errors.state}</p>
                            </div>
                            <input type="text" name="state" placeholder="state" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <div className="lat-lng-container">
                        <div className="lat-container">
                            <div>
                            <label htmlFor="latitude">Latitude</label>
                            <p>{errors.lat && errors.lat}</p>
                            </div>
                            <input type="number" name="latitude" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        </div>
                        <div className="lng-container">
                            <div>
                            <label htmlFor="longitude">Longitude</label>
                            <p>{errors.lng && errors.lng}</p>
                            </div>
                            <input type="number" name="longitude" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="describe-container">
                    <div>
                        Describe your place to guests
                    </div>
                    <div>
                        Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                    </div>
                    <textarea id='describe-input' type="text" name="description" placeholder="Please write at least 30 characters" value={description} onChange={e => setDescription(e.target.value)} />
                    <p>{errors.description && errors.description }</p>
                </div>
                <div className="spot-name-container">
                    <div>Create a title for your spot</div>
                    <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                    <input type="text" name="title" placeholder="Name of your spot" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <p>{errors.name && errors.name }</p>
                </div>
                <div>
                    <input type='number' name="price" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <p>{errors.price && errors.price }</p>
                </div>
                <div className="img-url-container">
                    <div>Liven up your spot with photos</div>
                    <div>Submit a link to at least one photo to publish your spot</div>
                    <input type='url' name="previewImage" placeholder="Preview Image URL" value={previewImg} onChange={(e) => setPreviewImg(e.target.value)} />
                    <p>{errors.previewImg && errors.previewImg }</p>
                    <p>{errors.previewImgExt && errors.previewImgExt}</p>
                    <input type='url' name="imageOne" placeholder="Image URL" value={imgurlOne} onChange={(e) => setImgurlOne(e.target.value)} />
                    <p>{errors.imgurlOne && errors.imgurlOne }</p>
                    <input type='url' name="imageTwo" placeholder="Image URL" value={imgurlTwo} onChange={(e) => setImgurlTwo(e.target.value)} />
                    <p>{errors.imgurlTwo && errors.imgurlTwo }</p>
                    <input type='url' name="imageThree" placeholder="Image URL" value={imgurlThree} onChange={(e) => setImgurlThree(e.target.value)} />
                    <p>{errors.imgurlThree && errors.imgurlThree }</p>
                    <input type='url' name="imageFour" placeholder="Image URL" value={imgurlFour} onChange={(e) => setImgurlFour(e.target.value)} />
                    <p>{errors.imgurlFour && errors.imgurlFour }</p>
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default NewSpotPage