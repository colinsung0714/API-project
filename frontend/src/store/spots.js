import { csrfFetch } from "./csrf";

const GET_ALL_SPOT = '/spots/allspots'
const GET_SPOT_DETAIL = '/spots/:spotId/detail'
const POST_NEW_SPOT =  '/spots'
const POST_NEW_IMAGE = '/spots/:spotId/images'
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

export const postNewSpot = (spot) => {
    return {
        type: POST_NEW_SPOT,
        spot
    }
}

export const postNewImage = (image) => {
    return {
        type:POST_NEW_IMAGE,
        image
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

       const response = dispatch(getSpotDetail(data))
       return response
    } else {

        throw data
    }
}

export const fethPostNewSpot = (spot) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(spot)
    })
    const data = await res.json()

    if (res.ok) {

        dispatch(postNewSpot(data))
        return data
    } else {

        throw data
    }
}

export const fetchPostNewImage = (url, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(url)
    })
    const data = await res.json()
    if(res.ok) {
        dispatch(postNewImage(data))
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
        case POST_NEW_SPOT: {
            return {...state, allSpots:{...state.allSpots, [action.spot.id]:{...action.spot}}, singleSpot:{...action.spot}}
        }
        case POST_NEW_IMAGE: {
            if(state.singleSpot.SpotImages?.length) {
            return { ...state, singleSpot: { ...state.singleSpot, SpotImages:[...state.singleSpot.SpotImages, action.image] } }
            } else {
                return { ...state, singleSpot: { ...state.singleSpot, SpotImages:[action.image] } }
            }
        }
        default:
            return state;
    }
};

export default spotsReducer;
