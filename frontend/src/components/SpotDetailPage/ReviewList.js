import React from "react";
import './SpotReviews.css'

const ReviewList = ({ review }) => {
    const getMonth = (review) => {
        const month = new Date(review.createdAt)
        switch (month.getMonth()) {
            case 0:
                return 'January'
            case 1:
                return 'Feburary'
            case 2:
                return 'March'
            case 3:
                return 'Apirl'
            case 4:
                return 'May'
            case 5:
                return 'June'
            case 6:
                return 'July'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'October'
            case 10:
                return 'November'
            case 11:
                return 'December'
            default:
                return;
        }
    }
    const getYear = (review) => {
        if(Object.values(review).length) {
        const year = review.createdAt?.split('-')
        return year[0]
        }
    }
    if(!Object.values(review).length) return null
    return (
        <div key={review.id} className="firstname-month-comment-list-container">
            <div id="review-list-firstName">{review.User && review.User.firstName}</div>
            <div id='review-list-month'>{`${getMonth(review)} ${getYear(review)}`}</div>
            <div id='review-list-comment'>{review.User && review.review}</div>
        </div>
    )
}

export default ReviewList
