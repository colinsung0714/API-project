import { csrfFetch } from "./csrf";

const GET_REVIEWS_SPOT = '/spots/:spotId/reviews'


const getReviewsbySpot = (reviews) => {
    return {
        type: GET_REVIEWS_SPOT,
        reviews
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
            action.reviews.Reviews.forEach(review =>newState[review.id]=review)
            return { ...state, spot: {...newState } }
        }
        default:
            return state;
    }
}

export default reviewsReducer

