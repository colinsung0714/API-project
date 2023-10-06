import React from "react";
import {useHistory} from 'react-router-dom'
import "../UpcomingBookingContainer/UpcomingBookingContainer.css"
import { weeksfromNow, upcomingMonth, upcomingDays, upcomingYears } from "../helper";
export const UpcomingBookingContainer = ({ booking }) => {
    const spot = booking.Spot
    const owner = spot?.Owner
    const history = useHistory()
    const weekslater = weeksfromNow(booking?.startDate)
    const monthString = upcomingMonth(booking?.startDate, booking?.endDate)
    const dayString = upcomingDays(booking?.startDate, booking?.endDate)
    const yearString = upcomingYears(booking?.startDate, booking?.endDate)
    console.log(booking)
    return (
        <div onClick={()=>history.push(`/bookings/${booking?.id}`, {booking})} className="upcoming-reservation-single-container">
            <div className="upcoming-left-container">
                <div className="upcoming-left-upper-box">
                    <div style={{fontSize:"18pt", fontWeight:"bold", padding:"10px 20px"}}>{spot?.city}</div>
                    <div style={{fontSize:"14pt", paddingBottom:"20px", paddingLeft:"20px"}} >{`${spot?.name} hosted by ${owner?.firstName}`}</div>
                </div>
                <div className="upcoming-left-lower-box">
                    <div>
                        <div>{monthString}</div>
                        <div>{dayString}</div>
                        <div style={{fontSize:"14px"}}>{yearString}</div>
                    </div>
                    <div>
                        <div>{spot?.address}</div>
                        <div>{`${spot?.city}, ${spot?.state}`}</div>
                        <div style={{fontSize:"14px"}} >{spot?.country}</div>
                    </div>
                </div>
            </div>
            <div className="upcoming-right-container">
                <img src={spot?.previewImage} alt={spot?.previewImage}/>
                <div id="duration-weeks-box">{weekslater}</div>
            </div>
        </div>
    )
}