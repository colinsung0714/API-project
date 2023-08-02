import React from "react";
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import {fetchDeleteReview} from '../../store/reviews'
import "./DeleteReviewModal.css"
const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const deleteReview = () => {
        dispatch(fetchDeleteReview(review.id)).then(closeModal)
    }
    return (
        <div className="delete-review-confirm-container">
            <div id="delete-head">Confirm Delete</div>
            <div id="delete-subhead">Are you sure you want to delete this review?</div>
            <button id="delete-yes-button" onClick={deleteReview}>{'Yes (Delete Review)'}</button>
            <button id="delete-no-button" onClick={closeModal}>{'No (Keep Review)'}</button>
        </div>
    )
}

export default DeleteReviewModal