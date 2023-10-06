import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './BookingPage.css'
import { fetchgetAllBookingbyUser } from "../../store/bookings";
import { previousBookingList, futureBookingList, sortNewestBookingList } from "../helper";
import { BookingContainer } from "../BookingContainer";
import { UpcomingBookingContainer } from "../UpcomingBookingContainer";

const BookingPage = () => {
    const currentUser = useSelector(state => state.session.user)
    const userBookings = Object.values(useSelector(state => state.bookings.user))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchgetAllBookingbyUser())
    }, [])
    if (!currentUser) return null
    const previousBookings = previousBookingList(userBookings)
    const upcomingBookings = futureBookingList(userBookings, previousBookings)
    return (
        <div className="bookings-container">
            <div style={{fontSize:"24pt", fontWeight:"bold"}}>
                Trips
            </div>
            <div>
                <div style={{fontSize:"18pt", fontWeight:"bold", padding:"30px 0"}}>Upcoming reservations</div>
                <div className="booking-upcoming-container">
                    {upcomingBookings.length ? sortNewestBookingList(upcomingBookings)?.map(booking=><div id={booking.id}><UpcomingBookingContainer booking={booking}/></div>) : "No trips booked...yet!"}
                </div>
            </div>
            <div className="past-bookings-container">
                <div style={{fontSize:"18pt", fontWeight:"bold", padding:"30px 0"}}>Where you've been</div>
                <div className="past-bookings-container-single">
                    {previousBookings.length > 0 ? previousBookings.map(booking => {
                    return (<div id={booking.id}>
                        <BookingContainer booking={booking}/>
                      </div>
                    )}) : <div>No previous booking</div>}
                </div>
            </div>
        </div>
    )
}

export default BookingPage