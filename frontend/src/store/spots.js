import { csrfFetch } from "./csrf";

const GET_ALL_SPOT = '/spots/allspots'
const GET_SPOT_DETAIL = '/spots/:spotId/detail'
export const getallSpots = (spots) => {
    return {
        type: GET_ALL_SPOT,
        spots
    }
}

export const getSpotDetail = (spot) => {
    return {
        type: GET_SPOT_DETAIL,
        spot
    }
}

export const fetchgetAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    const data = await res.json()
    if (res.ok) {
        dispatch(getallSpots(data))
    }
}

export const fetchGetSpotDetail = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`)
    const data = await res.json()

    if (res.ok) {

        dispatch(getSpotDetail(data))
    } else {

        throw data
    }
}

const initialState = { allSpots: { optionalOrderedList: [] }, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOT: {
            newState = {}
            Object.values(action.spots.Spots).forEach(spot => newState[spot.id] = spot)
            return { ...state, allSpots: { ...state.allSpots, ...newState } }
        }
        case GET_SPOT_DETAIL: {
            return { ...state, singleSpot: { ...action.spot } }
        }
        default:
            return state;
    }
};

export default spotsReducer;
