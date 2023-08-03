import React, {useState} from "react";
import './SpotReviews.css'
import DeleteReviewModal from '../DeleteReviewModal'
import OpenModalButton from '../OpenModalButton'
import { useDispatch, useSelector } from 'react-redux'
import {fetchDeleteReview} from '../../store/reviews'
import { useModal } from '../../context/Modal'

const ReviewList = ({ review, currentUser }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [modalOn, setModalOn] = useState(false)
    // const deleteReview = () => {
    //     dispatch(fetchDeleteReview(review.id)).then(closeModal)
    //     setModalOn(!modalOn)
    // }
    const spot = useSelector(state=>state.spots.singleSpot)
    const testReview = Object.values(useSelector(state=>state.reviews.spot))
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
                return 'April'
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
    
    if(!Object.values(testReview).length && currentUser.id !== spot?.ownerId )  return (
        <div id="recommend-review-comment">Be the first to post a review!</div>
    )

    return (<>{testReview.sort((a, b) => {
        const timeA = new Date(a.createdAt)
        const timeB = new Date(b.createdAt)
        if (timeA.getTime() > timeB.getTime()) return -1
        if (timeA.getTime() < timeB.getTime()) return 1
        return 0;
    })
        .map(review=>
        <div key={review.id} className="firstname-month-comment-list-container">
            <div id="review-list-firstName">{ review.User ? review.User.firstName : currentUser?.firstName}</div>
            <div id='review-list-month'>{`${getMonth(review)} ${getYear(review)}`}</div>
            <div id='review-list-comment'>{ review.review}</div>
            {currentUser?.id === review.userId && <OpenModalButton className='delete-review-button' buttonText="Delete" modalComponent={<DeleteReviewModal  review={review}/>}/>}
        </div>
        )}
        </>
    )
}

export default ReviewList
