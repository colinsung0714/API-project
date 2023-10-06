import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetSpotDetail } from '../../store/spots'
import SpotReviews from "./SpotReviews";
import ViewSummaryInfo from "./ViewSummaryInfo";
import './SpotDetailPage.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import MapContainer from "../Maps";

const SpotDetailPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(fetchGetSpotDetail(spotId)).catch((e) => {
            return null;
        })
    }, [dispatch, spotId])
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = Object.values(useSelector(state => state.reviews.spot))
    const defaultImage = 'https://studentlegallounge.humboldt.edu/sites/default/files/styles/panopoly_image_original/public/image-coming-soon.jpg?itok=e-RY5zkr'

    if (!Object.values(spot).length) return null
    let imageOne;
    if (!spot.SpotImages) return null
    let restImages = []
    for (let img of spot.SpotImages) {
        if (img.preview) imageOne = img.url
        else {
            if (img.url) restImages.push(img.url)
        }
    }


    while (restImages.length < 4) {
        restImages.push('')
    }
    const [imageTwo, imageThree, imageFour, imageFive] = restImages


    return (
        <div className="spot-detail-review-container">
            <div className="spot-detail-container">
                <div className="spot-detail-contact-info-container">
                    <div className="spot-detail-name">
                        {spot.name}
                    </div>
                    <div className="spot-detail-address">
                        {`${spot.city}, ${spot.state}, ${spot.country}`}
                    </div>
                </div>
                <div className="spot-detail-image-container">
                    <div className="spot-detail-img-main">

                        <img id='spot-detail-main-img' src={imageOne} alt={imageOne} />
                    </div>
                    <div className="spot-detail-img-rest">

                        <img id="spot-detail-rest-img" src={imageTwo || defaultImage} alt={imageTwo || defaultImage} />
                        <img id="spot-detail-rest-img" src={imageThree || defaultImage} alt={imageThree || defaultImage} />
                        <img id="spot-detail-rest-img" src={imageFour || defaultImage} alt={imageFour || defaultImage} />
                        <img id="spot-detail-rest-img" src={imageFive || defaultImage} alt={imageFive || defaultImage} />
                    </div>
                </div>
                <div className="spot-detail-description-container">
                    <div className="spot-detail-description-left">
                        <div id="hostedby">{`Hosted by ${spot.Owner && spot.Owner.firstName} ${spot.Owner && spot.Owner.lastName}`}</div>
                        <div id="spot-description">{spot.description && spot.description}</div>
                    </div>
                    <div className="spot-detail-description-right">
                        <div className="reserve-button-container">
                            <div className="detail-star-reviews">
                                <div id="detail-price"><div>${spot.price && spot.price}</div><div>night</div></div>
                                <ViewSummaryInfo spot={spot} />
                            </div>
                            {currentUser ? <button id="reserve-button" onClick={() => history.push(`/spots/${spotId}/bookings`)}>Reserve</button> : <OpenModalButton id={'reserve-button'} buttonText="Reserve" modalComponent={<LoginFormModal />} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="map-info-container">
                <div>Where you'll be</div>
                <div id="map-address-info">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                <div id="spot-map-box">
                <MapContainer spot={spot} />
                </div>
            </div>
            <SpotReviews spotId={spotId} spot={spot} reviews={reviews} />
        </div>
    )
}

export default SpotDetailPage