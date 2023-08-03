import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetSpotDetail } from '../../store/spots'
import SpotReviews from "./SpotReviews";
import ViewSummaryInfo from "./ViewSummaryInfo";
import './SpotDetailPage.css';
const SpotDetailPage = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGetSpotDetail(spotId))
    }, [dispatch, spotId])
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = Object.values(useSelector(state => state.reviews.spot))
    const defaultImage = 'https://studentlegallounge.humboldt.edu/sites/default/files/styles/panopoly_image_original/public/image-coming-soon.jpg?itok=e-RY5zkr'
    if (!Object.values(spot).length) return null
    let imageOne;
   if(!spot.SpotImages) return null
   let restImages = []
    for(let img of spot.SpotImages) {
        if(img.preview) imageOne = img.url
        else {
            if(img.url) restImages.push(img.url)
        }
    }
    console.log(imageOne)
   
    while(restImages.length < 4) {
        restImages.push('')
    }
    const [ imageTwo, imageThree, imageFour, imageFive] = restImages

    // const imageOne = spot.SpotImages && spot.SpotImages.length ? spot.SpotImages[0]?.url : defaultImage
    // const imageTwo = spot.SpotImages && spot.SpotImages.length ? spot.SpotImages[1]?.url : defaultImage
    // const imageThree = spot.SpotImages && spot.SpotImages.length ? spot.SpotImages[2]?.url : defaultImage
    // const imageFour = spot.SpotImages && spot.SpotImages.length ? spot.SpotImages[3]?.url : defaultImage
    // const imageFive = spot.SpotImages && spot.SpotImages.length ? spot.SpotImages[4]?.url : defaultImage

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
                        {/* <img id='spot-detail-main-img' src={spot.SpotImages && spot.SpotImages[0]?.url} alt={spot.SpotImages && spot.SpotImages[0]?.url} /> */}
                        <img id='spot-detail-main-img' src={imageOne} alt={imageOne} />
                    </div>
                    <div className="spot-detail-img-rest">
                        {/* {spot.SpotImages && spot.SpotImages[0] && spot.SpotImages.map((spotImg, i) => {
                            if (i === 0) return null
                            return <img id="spot-detail-rest-img" key={spotImg.id} src={spotImg.url} alt={spotImg.url} />
                        })} */}
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
                            <button id="reserve-button" onClick={() => alert("Feature coming soon")}>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
            <SpotReviews spotId={spotId} spot={spot} reviews={reviews} />
        </div>
    )
}

export default SpotDetailPage