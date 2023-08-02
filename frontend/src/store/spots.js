import { csrfFetch } from "./csrf";

const GET_ALL_SPOT = '/spots/allspots'
const GET_SPOT_DETAIL = '/spots/:spotId/detail'
const POST_NEW_SPOT =  '/spots'
const POST_NEW_IMAGE = '/spots/:spotId/images'
const DELETE_SPOT = '/api/spots/:spotId'
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

export const removeSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
  });

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
   

    if (res.ok) {
        const data = await res.json()
        dispatch(postNewSpot(data))
        return data
    } else { 

        throw res
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

export const fetchEditNewSpot = (spot, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(postNewSpot(data))
        
        return data
    } else {
        throw res
    }
}

export const fetchEditImage = (arr) => async dispatch => {
    
    const req = arr.map(img=>{
        if(img.id) {
        csrfFetch(`/api/spot-images/${img.id}`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(img)
    })
}
})
    Promise.allSettled(req).then(async response=>{
        if(response.status === 'fulfilled') {
            const data = await  response.json()
            dispatch(postNewImage(data))
            return data
        }
        }).catch(e=>{
        throw e
    })
   
}

export const fetchDeleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(removeSpot(spotId))
        return data
    } else {
        throw res
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

        case DELETE_SPOT: {
            newState={...state, allSpots:{...state.allSpots}}
         
            delete newState.allSpots[action.spotId]
            
            return newState
        }
        default:
            return state;
    }
};

export default spotsReducer;
