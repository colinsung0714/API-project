import React, { useState } from "react";
import './BookingCalender.js'
const BookingCalender = ({ month, emptyDay, dates, checkIn, checkOut, checkInMonth, checkOutMonth }) => {
    const [isClick, setIsClick] = useState(true)
    const [activeCheckIn, setActiveCheckIn] = useState('')
    const [activeCheckOut, setActiveCheckOut] = useState('')
    const checkCheckIn = (e) => {
        setActiveCheckIn(e.target.value)
    }
    const checkCheckOut = (e) => {
        setActiveCheckOut(e.target.value)
    }
    return (
        <div id="calender-format-container">
            <div>{month}</div>
            <div id="weeks">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
                {emptyDay.map(day => <div className="date-disable" key={day}>{day}</div>)}
                {dates.map((day) => <input className={`each-day  ${activeCheckIn==day ?"activeIn" : ''}`} id={`${activeCheckOut==day ? 'activeOut':''}`} key={day} value={day} onClick={e => {
                    if (isClick) {
                        checkIn(e)
                        checkInMonth(month)
                        checkCheckIn(e)
                        return setIsClick(!isClick)
                    } else {
                        checkOut(e)
                        checkOutMonth(month)
                        checkCheckOut(e)
                        return setIsClick(!isClick)
                    }
                }} readOnly />)}
            </div>
        </div>
        

    )
}

export default BookingCalender