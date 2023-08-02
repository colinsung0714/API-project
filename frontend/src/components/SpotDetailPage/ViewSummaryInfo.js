
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchGetSpotDetail} from '../../store/spots'
const ViewSummaryInfo = ({ spot }) => {
    const dispatch=useDispatch()
    const reviews = useSelector(state => state.reviews.spot)
    const testSpot =useSelector(state=>state.spots.singleSpot)
   
    if (!Object.values(reviews).length) return (

        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                <div>New</div>
            </div>
        </div>
    )
    if (Object.values(reviews).length === 1) return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {/* {' '}{spot.avgStarRating === 0 ? 'New' : Number.parseFloat(spot.avgStarRating).toFixed(1)} */}
                {/* {Number.parseFloat(Object.values(reviews)[0].stars).toFixed(1)} */}
                {testSpot.avgStarRating === 0 ? 'New' : Number.parseFloat(testSpot.avgStarRating).toFixed(1)}
            </div>
            <div>
                {testSpot.numReviews === 0 ? '' : ` • ${testSpot.numReviews} Review`}
                {/* {` • ${Object.values(reviews).length} Review`} */}
            </div>
        </div>
    )
    if (testSpot.numReviews === 0) return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {' '}{testSpot.avgStarRating && Number.parseFloat(testSpot.avgStarRating).toFixed(1)}
            </div>
            <div></div>
        </div>
    )
    // let avgStarValue = 0
    // let numberReview = 0
    // if (Object.values(reviews).length) {
    //     numberReview = Object.values(reviews).length
    //     for (let review of Object.values(reviews)) {

    //         avgStarValue += review.stars
    //     }
    // }

    return (
        <div id='detail-star-review'>
            {/* <div>
                <i className="fa-solid fa-star"></i>
                {' '}{Object.values(reviews).length && Number.parseFloat(avgStarValue / numberReview).toFixed(1)}
            </div>
            <div>{Object.values(reviews).length && ` • ${numberReview}`} Reviews</div> */}
              <div>
                <i className="fa-solid fa-star"></i>
                {' '}{Object.values(reviews).length && Number.parseFloat(testSpot.avgStarRating).toFixed(1)}
            </div>
            <div>{Object.values(reviews).length && ` • ${testSpot.numReviews}`} Reviews</div>
        </div>
    )
}

export default ViewSummaryInfo