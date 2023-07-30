import React, { useDeferredValue, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetSpotDetail } from '../../store/spots'
import './SpotDetailPage.css'
const SpotDetailPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGetSpotDetail(spotId))
    }, [dispatch, spotId])
    const spot = useSelector(state => state.spots.singleSpot)
    if (!spot) return null
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
                        <img id='spot-detail-main-img' src={spot.SpotImages && spot.SpotImages[0].url} alt={spot.SpotImages && spot.SpotImages[0].url} />
                    </div>
                    <div className="spot-detail-img-rest">
                        {spot.SpotImages && spot.SpotImages[1] && spot.SpotImages.map((spotImg, i) => {
                            if (i === 0) return null
                            return <img id="spot-detail-rest-img" key={spotImg.id} src={spotImg.url} alt={spotImg.url}/>
                        })}
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
                                <div id="detail-price">{`$${spot.price} night`}</div>
                                <div id='detail-star-review'><i className="fa-solid fa-star"></i> {spot.avgStarRating}<div>* {spot.numReviews} reviews</div></div>
                            </div>
                            <button id="reserve-button">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetailPage