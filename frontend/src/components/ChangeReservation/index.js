import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookingFormModal from "../BookingFormModal";
import { GuestModal } from "../GuestsModal";
import { useBookingDate } from '../../context/BookingdateContext'
import { datesChangeBooking, monthString, weeksLaterStartDate, stiringMonthtoNumber } from "../helper";
import { useModal } from "../../context/Modal";
import {fetchupdateBookingbyBookingId} from '../../store/bookings'
import '../ChangeReservation/ChangeReservation.css'

export const ChangeReservation = () => {
    const { bookingId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const booking = Object.values(useSelector(state => state.bookings.user)).find(reserve => reserve.id === Number(bookingId))
    const spot = booking?.Spot
    const { setModalContent } = useModal()
    const { startDay, setStartDay, startMonth, setStartMonth, endDay, setEndDay, endMonth, setEndMonth, startYear, setStartYear, endYear, setEndYear, defaultStartDate, defaultEndDate } = useBookingDate()
    const owner = spot?.Owner
    const bookingStartDate = booking?.startDate
    const bookingEndDate = booking?.endDate
    const bookingCheckInDate = new Date(bookingStartDate)
    const bookingCheckOutDate = new Date(bookingEndDate)
    const bookingCheckInDay = bookingCheckInDate.getUTCDate()
    const bookingCheckInMonth = monthString(bookingCheckInDate.getMonth())?.slice(0, 3)
    const bookingCheckInYear = bookingCheckInDate.getFullYear()
    const bookingCheckOutDay = bookingCheckOutDate.getUTCDate()
    const bookingCheckOutMonth = monthString(bookingCheckOutDate.getMonth())?.slice(0, 3)
    const bookingCheckOutYear = bookingCheckOutDate.getFullYear()
    const [guest, setGuest] = useState(booking && booking.guests)
    const [checkin, setCheckIn] = useState(datesChangeBooking(startYear, startMonth, startDay))
    const [checkout, setCheckOut] = useState(datesChangeBooking(endYear, endMonth, endDay))
    const [error, setError] = useState({})
    useEffect(() => {
        setStartDay(bookingCheckInDay)
        setStartMonth(bookingCheckInMonth)
        setStartYear(bookingCheckInYear)
        setEndDay(bookingCheckOutDay)
        setEndMonth(bookingCheckOutMonth)
        setEndYear(bookingCheckOutYear)
    }, [])
    useEffect(() => {
        setCheckIn(datesChangeBooking(startYear, startMonth, startDay))
        setCheckOut(datesChangeBooking(endYear, endMonth, endDay))
    }, [startDay, startMonth, startYear, endDay, endMonth, endYear, checkin, checkout])
    if (!booking || !spot) return null
    const cancellationDate = weeksLaterStartDate(booking.startDate)
    const handleSubmit = e => {
        setError({})
        e.preventDefault()
        const startmonth = stiringMonthtoNumber(startMonth)
        const endmonth = stiringMonthtoNumber(endMonth)
        const data = {
            startDate:`${startYear}-${startmonth}-${startDay}`,
            endDate:`${endYear}-${endmonth}-${endDay}`,
            guests:guest
        }
        dispatch(fetchupdateBookingbyBookingId(data, bookingId)).then(()=>{
            history.push(`/bookings/current`)
            setStartDay(Number(defaultStartDate.getDate()))
            setEndDay(Number(defaultEndDate.getDate()))
            setStartMonth(monthString(defaultStartDate.getMonth()).slice(0, 3))
            setEndMonth(monthString(defaultEndDate.getMonth()).slice(0, 3))
            setStartYear(defaultStartDate.getFullYear())
            setEndYear(defaultEndDate.getFullYear())
        }).catch(e=>{
            setError(e)
        })
         
    }
    return (
        <div className="change-reservation-container">
            <div className="change-reservation-container-left">
                <div style={{ fontWeight: "bold" }}>Change Reservation</div>
                <div id="change-reservation-exit-button">
                    <i onClick={()=>history.push(`/bookings/${bookingId}`)} style={{fontSize:"30px", cursor:"pointer"}} className="fas fa-arrow-circle-left"></i>
                    <div>Exit</div>
                </div>
            </div>
            <div className="change-reservation-container-right">
                <div style={{ fontWeight: "bold", fontSize: "25px", width: "100%", paddingBottom: "20px" }}>What do you want to change?</div>
                <div style={{ width: "100%" }}>{`After making your desired changes, you can send a request to your host, ${owner?.firstName}, to confirm the alterations to your reservation.`}</div>
                <div className="change-booking-photo-info-box">
                    <img src={spot.previewImage} alt={spot.previewImage} />
                    <div style={{ fontWeight: "bold" }}>{spot.name}</div>
                </div>
                <div style={{ fontWeight: "bold" }}>Reservation details</div>
                <div className="reservation-edit-date-box">
                    <div style={{ width: "100%", fontWeight: "bold", padding: "10px 0" }}>Dates</div>
                    <div onClick={() => setModalContent(<BookingFormModal type={'update'} bookingCheckInDate={bookingCheckInDate}/>)} id="reservation-date-checkin-checkout-box">
                        <div id="reservation-date-checkin-box">
                            <div style={{ fontSize: "15px", color: "darkgray", padding: "10px", width: "100%" }}>Check-in</div>
                            <div style={{ paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px", width: "100%" }}>{checkin}</div>
                        </div>
                        <div id="reservation-date-checkout-box">
                            <div style={{ fontSize: "15px", color: "darkgray", padding: "10px", width: "100%" }}>Check out</div>
                            <div style={{ paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px", width: "100%" }}>{checkout}</div>
                        </div>
                    </div>
                </div>
                <div className="reservation-guests-container">
                    <div style={{ fontWeight: "bold", padding: "10px 0", width: "100%" }}>Guests</div>
                    <div onClick={() => setModalContent(<GuestModal guest={guest} setGuest={setGuest} />)} id="guest-edit-box">
                        <div style={{padding:"10px", width:"100%"}}>{guest === 1 ? `${guest} guest` : `${guest} guests`}</div>
                        <i style={{padding:"10px", width:"100%", textAlign:"right"}} className="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div className="cancellation-reservation-detail-box">
                        <div id="cancellation-policy-message">Cancellation policy</div>
                        <div>{`Free cancellation before 3:00 PM on ${cancellationDate}. After that, the reservation is non-refundable.`}</div>
                </div>
                <div id="change-reservation-button-box">
                {error.message && <p style={{color:"red"}}>{error.message}</p>}
                <button onClick={handleSubmit}>Send request</button>
                </div>
            </div>
        </div>
    )
}