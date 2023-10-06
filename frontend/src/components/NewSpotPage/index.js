import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { fethPostNewSpot, fetchPostNewImage, fetchGetSpotDetail, fetchEditNewSpot, fetchEditImage } from '../../store/spots'
import './NewSpotPage.css'
import { useDropzone } from 'react-dropzone'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const NewSpotPage = () => {
    const apiKey = useSelector(state => state.maps.key)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const formType = location.state?.formType || 'create'
    const spotId = location.state?.spotId
    const updateSpot = useSelector(state => state.spots.singleSpot)
    const currentUser = Object.values(useSelector(state => state.session))
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: ['places']
    });
    let updateId = spotId
    useEffect(() => {
        if (formType === 'update') {
            dispatch(fetchGetSpotDetail(spotId)).then(res => {
                setPrice(res.spot.price)
                setCountry(res.spot.country)
                setAddress(res.spot.address)
                setCity(res.spot.city)
                setState(res.spot.state)
                setLatitude(res.spot.lat)
                setLongitude(res.spot.lng)
                setDescription(res.spot.description)
                setTitle(res.spot.name)
                setImageUrls(res.spot.SpotImages?.map(img => img.url))
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
    const [errors, setErrors] = useState({})
    const [images, setImages] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const [searchResult, setSearchResult] = useState("");
    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles)
        const tempImageUrls = [];
        acceptedFiles.forEach((file) => {
            const url = URL.createObjectURL(file);
            tempImageUrls.push(url);
        });
        setImageUrls(tempImageUrls);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        }, noClick: true, onDrop, noDragEventsBubbling: true
    })
    useEffect(() => {
        const error = {}
        if (images?.length) {
            if (images.length > 5) {
                error.imgLength = 'You can select only up to 5 images'
                setImageUrls([])
            }
            for (let img of images) {
                if (img.type !== 'image/png' && img.type !== 'image/jpg' && img.type !== 'image/jpeg') error.images = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        setErrors(error)
    }, [images])

    useEffect(() => {
        
        if(isLoaded) {
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder()
        const geoaddress = `${address}, ${city}, ${state}`

        const res = geocoder.geocode({ 'address': geoaddress }, function (results, status) {
            if (status === 'OK') {
                setLatitude(results[0].geometry.location.lat())
                setLongitude(results[0].geometry.location.lng())
            }
        })
    }
    }, [address, city, state])
    function onPlaceChanged() {

        if (searchResult != null) {
            const place = searchResult.getPlace();
            const name = place.name;
            const status = place.business_status;
            const formattedAddress = place.formatted_address;
            const addressParts = formattedAddress.split(',')
            const nation = isNaN(Number(place.address_components[6]?.long_name)) ? place.address_components[6]?.long_name : place.address_components[5]?.long_name
            setAddress(addressParts[0])
            setCity(addressParts[1].slice(1))
            setState(addressParts[2]?.split(' ')[1])
            setCountry(nation)
        } else {
            setErrors({ map: "Please enter address correctly" });
        }
    }
    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const error = {}
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

        let spotId;

        if (!Object.values(error).length) {
            if (formType === 'update') {

                dispatch(fetchEditNewSpot(newSpot, updateSpot.id))
                    .then(() => {

                        const formData = new FormData()
                        if (images && images.length !== 0) {
                            for (let image of images) {
                                formData.append('images', image)
                            }
                        }
                        dispatch(fetchEditImage(formData, updateId))
                    }
                    )
                    .then(() => {
                        setErrors({})
                        return history.push(`/spots/${updateId}`)
                    }).catch(async res => {
                        const error = await res.json()
                        if (error.errors) {
                            let errorObj = { ...error.errors }
                            setErrors(errorObj);
                        }
                    })
                return;
            }

            dispatch(fethPostNewSpot(newSpot)).then(spot => {
                spotId = spot.id
                const formData = new FormData()
                if (images && images.length !== 0) {
                    for (let image of images) {
                        formData.append('images', image)
                    }
                }
                dispatch(fetchPostNewImage(formData, spotId))
                setErrors({})
                history.push(`/spots/${spotId}`)

            }).catch(async res => {
                const error = await res.json()
                if (error.errors) {
                    let errorObj = { ...error.errors }
                    setErrors(errorObj);
                }
            })
        } else {
            setErrors(error)
        }
    }
    if (!currentUser[0]) return null
    return (
        <div className="new-spot-container">
            <h1 style={{width:"auto"}}>
                {formType === 'update' ? 'Update your Spot' : 'Create a New Spot'}
            </h1>
            <div className="new-from-subheading">
                Where's Your Place Located?
            </div>
            <div style={{ width: "auto" }} className="new-form-content">
                Guest will only get your exact address once they booked a reservation.
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "5px 0", width: "100%" }}>
                <div>Where is your spot?</div>
                {isLoaded &&
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <input style={{ width: "100%", border: "solid 1px black", height:"20px" }} type="text" />
                    </Autocomplete>}
            </div>
            <form onSubmit={e => handleSubmit(e)}>

                <div className="place-image-container">

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
                        <div style={{ width: '100%' }}>
                            <label style={{ width: '100%', display: "flex", flexDirection: "column", gap: "10px" }}>
                                <div className="drag-drop-pic-piclist-container">
                                    <div id="drag-drop-pic-container" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p style={{ color: "#2684ff" }}>Drop the images here ...</p> :
                                                <p style={{ color: "darkgray" }}>Drag 'n' drop some images here, or click to select images</p>
                                        }
                                    </div>
                                    <div style={{ width: "510px", paddingTop: "10px" }}>
                                        {imageUrls?.length > 0 &&
                                            <ul>
                                                <li>Image Preview</li>
                                                {imageUrls.map(el => <img style={{ width: "90px", height: "90px", borderRadius: "10px" }} src={el} key={el} />)}
                                            </ul>}
                                    </div>
                                </div>
                            </label>

                            <p style={{ color: "red" }}>{errors?.images && errors?.images}</p>
                            <p style={{ color: "red" }}>{errors?.imgLength && errors?.imgLength}</p>
                        </div>


                    </div>
                </div>

                <p style={{ color: "red" }}>{errors?.map && errors?.map}</p>
                <button style={Object.values(errors).length > 0 ? { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" } : null} id="new-spot-submit" type="submit">{formType === 'update' ? 'Update your Spot' : 'Create a New Spot'}</button>
            </form>
        </div>
    )
}

export default NewSpotPage