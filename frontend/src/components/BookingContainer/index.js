import React from "react";
import '../BookingContainer/BookingContainer.css'
import { periodStringReservation } from "../helper";

export const BookingContainer = ({booking}) => {
    const spot = booking.Spot
    const owner = booking.Spot?.Owner
  
    const periodStirng = periodStringReservation(booking.startDate, booking.endDate)
    return (
        <div className="single-booking-container">
            <img src={spot.previewImage} alt={spot.previewImage}/>
            <div className="booking-spot-detail-info-box">
                <div style={{fontSize:"16pt", fontWeight:"bold"}}>{spot.city}</div>
                <div>{`Hosted by ${owner?.firstName}`}</div>
                <div>{periodStirng}</div>
            </div>
        </div>
    )
}