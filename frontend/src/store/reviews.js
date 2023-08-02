import { csrfFetch } from "./csrf";

const GET_REVIEWS_SPOT = '/spots/:spotId/reviews'
const POST_REVIEWS_SPOT = '/spots/:spotId/reviews/new'
const DELETE_REVIEW ='/api/reviews/:reviewId'

const getReviewsbySpot = (reviews) => {
    return {
        type: GET_REVIEWS_SPOT,
        reviews
    }
}

const postReviewsbySpot = (review) => {
    return {
        type: POST_REVIEWS_SPOT,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type:DELETE_REVIEW,
        reviewId
    }
}

export const fetchpostReviewsbySpot = (review, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(review)
    })
    const data = await res.json()
    if(res.ok) {
        dispatch(postReviewsbySpot(data))
        return data
    }
    else {
        throw data
    }
}

export const fetchgetReviewsbySpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await res.json()
    if (res.ok) {
        dispatch(getReviewsbySpot(data))
    } else {
        throw data
    }
}

export const fetchDeleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:'DELETE'
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(deleteReview(reviewId))
        return data
    }
    else {
        throw res
    }
}

const initialState = { spot: { optionalOrderedList: [] }, user: { optionalOrderedList: [] } };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS_SPOT: {
            newState = {}
            action.reviews.Reviews.forEach(review => newState[review.id] = review)
            return { ...state, spot: { ...newState } }
        }
        case POST_REVIEWS_SPOT : {
            newState={...action.review}
            return {...state, spot:{...state.spot, [action.review.id]:{...newState}}}
        }
        case DELETE_REVIEW : {
            newState = {...state, spot:{...state.spot}}
           
            delete newState.spot[action.reviewId]
            
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer

