import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetReviewsbySpot } from '../../store/reviews'
import ViewSummaryInfo from "./ViewSummaryInfo";
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
    if(!review) return null
    return (
        <div className="firstname-month-comment-list-container">
            <div id="review-list-firstName">{review.User && review.User.firstName}</div>
            <div id='review-list-month'>{`${getMonth(review)} ${getYear(review)}`}</div>
            <div id='review-list-comment'>{review.User && review.review}</div>
        </div>
    )
}

const SpotReviews = ({ spotId, spot }) => {
    const reviews = Object.values(useSelector(state => state.reviews.spot))
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchgetReviewsbySpot(spotId))
    }, [dispatch, spotId])

    const checkUser = () => {
        if((currentUser?.id !== spot.ownerId) && checkReviewUser()) {
            return;
        }
        else return 'nonvisible'
    }
    
    const checkReviewUser = () => {
        for(let review of reviews ) {
            if(currentUser?.id === review.userId) {
                return false
            }
        }
        return true
    }

    if (!reviews.length && currentUser.id !== spot.ownerId) {
        return (
            <div>
                <div>
                    <ViewSummaryInfo spot={spot} />
                </div>
                <div id="be-first-msg">
                    Be the first to post a review!
                </div>
            </div>
        )
    }
    if (!reviews) return null
    return (
        <div className="spot-review-container">
            <div>
                <ViewSummaryInfo spot={spot} />
            </div>
             {currentUser && <button id="post-review-button" className={checkUser()}>Post Your Review</button>}
            <div className="spot-review-list-container">
                {reviews.sort((a, b) => {
                    const timeA = new Date(a.createdAt)
                    const timeB = new Date(b.createdAt)
                    if (timeA.getTime() > timeB.getTime()) return -1
                    if (timeA.getTime() < timeB.getTime()) return 1
                    return 0;
                }).map(review => <ReviewList key={review.id} review={review} />)}
            </div>
        </div>
    )
}

export default SpotReviews