import { csrfFetch } from "./csrf";

const GET_ALL_BOOKINGS_USER = '/api/bookings/current'
const POST_BOOKING_SPOT = '/api/spots/:spotId/bookings'
const DELETE_BOOKING = '/api/bookings/:bookingId/delete'
export const getAllBookingsbyUser = (bookings) => {
    return {
        type: GET_ALL_BOOKINGS_USER,
        bookings
    }
} 

export const postBookingbySpotId = (booking) => {
    return {
        type:POST_BOOKING_SPOT,
        booking
    }
}

export const deleteBooking = booking => {
    return {
        type:DELETE_BOOKING,
        booking
    }
}


export const fetchgetAllBookingbyUser = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current')
    if(res.ok) {
        const data = await res.json()
        dispatch(getAllBookingsbyUser(data))
        return data
    } else {
        throw res
    }
}

export const fetchpostBookingbySpotId = (period, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(period)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(postBookingbySpotId(data))
        return data
    } else {
       
        throw res
    }
}

export const fetchupdateBookingbyBookingId = (body, bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method:'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(body)
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(postBookingbySpotId(data))
        return data
    } else {
       
        throw res
    }
}

export const fetchDeleteBooking = bookingId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(deleteBooking(data))
        return data
    } else {
       
        throw res
    }
}

const initialState = { user:{ optionalOrderedList:[]}, spot:{optionalOrderedList:[]}}

const bookingsReducer = (state = initialState , action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_BOOKINGS_USER: {
            newState = {}
            action.bookings.Bookings.forEach(booking =>{ 
                let spot = {...booking.Spot}
                newState[booking.id] = {...booking , Spot:{...spot}}
            })

            return { ...state, user: { ...newState } }
        }
        case POST_BOOKING_SPOT : {
            newState={...action.booking}
            return {...state, user:{...state.user, [action.booking.id]:{...newState}}, spot:{...state.spot}}
        }
        case DELETE_BOOKING : {
            newState = {...state, user:{...state.user}, spot:{...state.spot}}
            delete newState.user[action.booking.id]
            return {...newState, user:{...newState.user}, spot:{...newState.spot}}
        }
        default:
            return state;
    }
}

export default bookingsReducer


