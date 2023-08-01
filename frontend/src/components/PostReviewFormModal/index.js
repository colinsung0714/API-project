import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchpostReviewsbySpot } from '../../store/reviews'
import './PostReviewFormModal.css'
import { useModal } from '../../context/Modal'

const PostReviewFormModal = () => {
    const spot = useSelector(state => state.spots.singleSpot)
    const [review, setReview] = useState('')
    const [turnOn, setTurnOn] = useState(true)
    const [starRating, setStarRating] = useState('')
    const [error, setError] = useState({})
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const handleSubmit = (e) => {

        e.preventDefault()
        setError({})
        const newReview = {
            review,
            stars: starRating
        }
        dispatch(fetchpostReviewsbySpot(newReview, spot.id))
            .then(closeModal)
            .catch(data => {
                if (data && data.message) {
                    setError(data);
                }
            });

    }
    useEffect(() => {

        if (review.length > 10 && starRating) {
            return setTurnOn(false)
        }
        setTurnOn(true)

    }, [review, starRating])
    if (!Object.values(spot).length) return null
    return (

        <div className="new-review-spot-container">
            <h1> How was your stay?</h1>
            {error.message && <p>{error.message}</p>}
            <form onSubmit={e => handleSubmit(e)}>
                <div className="review-input-textarea">
                    <textarea type='text' placeholder="Leave your review here..." value={review} onChange={e => setReview(e.target.value)} />
                </div>
                <div className="rating-input">
                    <div>
                        <i className={starRating > 0 ? "fa-solid fa-star" : "fa-regular fa-star"} onMouseEnter={() => { setStarRating(1) }} onMouseLeave={() => setStarRating(starRating)} onClick={() => setStarRating(starRating)}></i>
                    </div>
                    <div >
                        <i className={starRating > 1 ? "fa-solid fa-star" : "fa-regular fa-star"} onMouseEnter={() => { setStarRating(2) }} onMouseLeave={() => setStarRating(starRating)} onClick={() => setStarRating(starRating)}> </i>
                    </div>
                    <div >
                        <i className={starRating > 2 ? "fa-solid fa-star" : "fa-regular fa-star"} onMouseEnter={() => { setStarRating(3) }} onMouseLeave={() => setStarRating(starRating)} onClick={() => setStarRating(starRating)}></i>
                    </div>
                    <div >
                        <i className={starRating > 3 ? "fa-solid fa-star" : "fa-regular fa-star"} onMouseEnter={() => { setStarRating(4) }} onMouseLeave={() => setStarRating(starRating)} onClick={() => setStarRating(starRating)}></i>
                    </div>
                    <div >
                        <i className={starRating > 4 ? "fa-solid fa-star" : "fa-regular fa-star"} onMouseEnter={() => { setStarRating(5) }} onMouseLeave={() => setStarRating(starRating)} onClick={() => setStarRating(starRating)}></i>
                    </div>
                    <div>
                        Stars
                    </div>
                </div>
                <button type="submit" disabled={turnOn}>Submit Your Review</button>

            </form>
        </div>

    )
}

export default PostReviewFormModal

