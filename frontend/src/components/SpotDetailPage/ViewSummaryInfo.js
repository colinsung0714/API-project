import React from "react";
import { useSelector } from "react-redux";
const ViewSummaryInfo = ({ spot }) => {
    const reviews = useSelector(state => state.reviews.spot)
    if(spot.numReviews === 0) return (
        <div id='detail-star-review'>
        <div>
            <i className="fa-solid fa-star"></i>
            {' '}{spot.avgStarRating && Number.parseFloat(spot.avgStarRating).toFixed(1)}
        </div>
        <div></div>
    </div>
    )
    if (!Object.values(reviews).length) return (

        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                <div>New</div>
            </div>
        </div>
    )
    if(Object.values(reviews).length===1) return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {' '}{spot.avgStarRating && Number.parseFloat(spot.avgStarRating).toFixed(1)}
            </div>
            <div>{spot.numReviews && ` • ${spot.numReviews}`} Review</div>
        </div>
    )
    return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {' '}{spot.avgStarRating && Number.parseFloat(spot.avgStarRating).toFixed(1)}
            </div>
            <div>{spot.numReviews && ` • ${spot.numReviews}`} Review</div>
        </div>
    )
}

export default ViewSummaryInfo