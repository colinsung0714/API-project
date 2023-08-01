import React from "react";
import { useSelector } from "react-redux";
const ViewSummaryInfo = ({ spot }) => {
    const reviews = useSelector(state => state.reviews.spot)
    if (!Object.values(reviews).length) return (

        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                <div>New</div>
            </div>
        </div>
    )
    console.log(reviews)
    if (Object.values(reviews).length === 1) return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {/* {' '}{spot.avgStarRating === 0 ? 'New' : Number.parseFloat(spot.avgStarRating).toFixed(1)} */}
                {Number.parseFloat(Object.values(reviews)[0].stars).toFixed(1)}
            </div>
            <div>
                {/* {spot.numReviews === 0 ? '' : ` • ${spot.numReviews} Review`} */}
                {` • ${Object.values(reviews).length} Review`}
            </div>
        </div>
    )
    if (spot.numReviews === 0) return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {' '}{spot.avgStarRating && Number.parseFloat(spot.avgStarRating).toFixed(1)}
            </div>
            <div></div>
        </div>
    )
    let avgStarValue = 0
    let numberReview = 0
    if (Object.values(reviews).length) {
        numberReview = Object.values(reviews).length
        for (let review of Object.values(reviews)) {

            avgStarValue += review.stars
        }
    }

    return (
        <div id='detail-star-review'>
            <div>
                <i className="fa-solid fa-star"></i>
                {' '}{Object.values(reviews).length && Number.parseFloat(avgStarValue / numberReview).toFixed(1)}
            </div>
            <div>{Object.values(reviews).length && ` • ${numberReview}`} Reviews</div>
        </div>
    )
}

export default ViewSummaryInfo