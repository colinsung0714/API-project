import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetReviewsbySpot } from '../../store/reviews'
import ViewSummaryInfo from "./ViewSummaryInfo";
import ReviewList from "./ReviewList";
import './SpotReviews.css'
import OpenModalButton from '../OpenModalButton'
import PostReviewFormModal from '../PostReviewFormModal'
import DeleteReviewModal from '../DeleteReviewModal'
const SpotReviews = ({ spotId, spot, reviews }) => {

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchgetReviewsbySpot(spotId))
    }, [dispatch, spotId])

    const checkUser = () => {
        if ((currentUser.id !== spot.ownerId) && checkReviewUser()) {
            return;
        }
        else return 'nonvisible'
    }


    const checkReviewUser = () => {

        if (!reviews.length) return true
        else {
            for (let review of reviews) {
                if (currentUser.id === review.userId) {
                    return false
                }
            }
            return true
        }
    }

    if (!reviews.length && currentUser?.id !== spot.ownerId) {
        return (
            <div id="be-the-first-review-container">
                <div>
                    <ViewSummaryInfo spot={spot} />
                </div>
                {currentUser && <OpenModalButton id="post-review-button" className={checkUser()} buttonText="Post Your Review"
                    modalComponent={<PostReviewFormModal />} />}
                <div id="be-first-msg">
                    Be the first to post a review!
                </div>
            </div>
        )
    }

    return (
        <div className="spot-review-container">
            <div>
                <ViewSummaryInfo spot={spot} />
            </div>
            {currentUser && <OpenModalButton id="post-review-button" className={checkUser()} buttonText="Post Your Review"
                modalComponent={<PostReviewFormModal />} />}
            <div className="spot-review-list-container">
                 <ReviewList currentUser={currentUser} />
            </div>
        </div>
    )
}

export default SpotReviews