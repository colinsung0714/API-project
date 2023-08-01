import { csrfFetch } from "./csrf";

const GET_REVIEWS_SPOT = '/spots/:spotId/reviews'
const POST_REVIEWS_SPOT = '/spots/:spotId/reviews/new'


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
            return {...state, spot:{...state.spot, [action.review.id]:{...action.review}}}
        }
        default:
            return state;
    }
}

export default reviewsReducer

