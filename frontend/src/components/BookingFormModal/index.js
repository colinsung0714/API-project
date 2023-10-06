import React, { useState, useEffect, useRef } from "react"
import BookingCalender from "./BookingCalender"
import { useBookingDate } from "../../context/BookingdateContext"
import './BookingCalender.css'
import { monthLater, yearLater } from "../../helper/dateCalculator"
import { useModal } from "../../context/Modal"
import { stiringMonthtoNumber, nightstoString1, nightstoString2, monthString, userTime, currentMonthDateBoolean, nextMonthDateBoolean } from '../helper'

const BookingFormModal = ({type, bookingCheckInDate}) => {
    const now = new Date(userTime)
    const [currentDate , setCurrentDate] = useState(type === 'update' ? bookingCheckInDate : new Date(userTime))
    const currentMonth = currentDate.getMonth()
    const currentMonthString = monthString(currentMonth).slice(0,3)
    const currentYear = currentDate.getFullYear()
    const { closeModal } = useModal();
    const startYearRef = useRef()
    const endYearRef = useRef()
    const { defaultStartDate, defaultEndDate, startDay, endDay, startMonth, endMonth, setStartDay, setEndDay, setStartMonth, setEndMonth, count, setCount, startYear, setStartYear, endYear, setEndYear } = useBookingDate()
    const nextMonth = monthLater(currentMonth, 1)
    const nextMonthString = monthString(nextMonth).slice(0,3)
    const nextYear = yearLater(currentMonth, currentYear) 
    const [isClick, setIsClick] = useState(true)
    const [activeCheckInThisMonth, setActiveCheckInThisMonth] = useState(currentMonthString === startMonth ? [startDay]:[])
    const [activeCheckOutThisMonth, setActiveCheckOutThisMonth] = useState(currentMonthString === endMonth ? [endDay]:[])
    const [activeCheckInNextMonth, setActiveCheckInNextMonth] = useState(nextMonthString === startMonth?[startDay]:[])
    const [activeCheckOutNextMonth, setActiveCheckOutNextMonth] = useState( nextMonthString === endMonth ?[endDay]:[])
    useEffect(() => {
        if ((activeCheckInThisMonth.length && activeCheckOutThisMonth.length && count  === 1)||(activeCheckInThisMonth.length && activeCheckOutThisMonth.length && count  === 3 ) || (activeCheckInThisMonth.length && activeCheckOutNextMonth.length && count === 3) || (activeCheckInNextMonth.length && activeCheckOutNextMonth.length && count === 3) || (activeCheckInThisMonth.length && activeCheckOutThisMonth.length && activeCheckInNextMonth.length) || (activeCheckInThisMonth.length && activeCheckOutThisMonth.length && activeCheckOutNextMonth.length)) {
            setCount(0)
            setActiveCheckInThisMonth([])
            setActiveCheckOutThisMonth([])
            setActiveCheckInNextMonth([])
            setActiveCheckOutNextMonth([])
            setStartDay(Number(defaultStartDate.getDate()))
            setEndDay(Number(defaultEndDate.getDate()))
            setStartMonth(monthString(defaultStartDate.getMonth()).slice(0, 3))
            setEndMonth(monthString(defaultEndDate.getMonth()).slice(0, 3))
            setStartYear(defaultStartDate.getFullYear())
            setEndYear(defaultEndDate.getFullYear())
            setIsClick(true)
        }
    }, [count, currentDate])
 
    function getFirstDaysOfMonth(year) {
        const firstDays = [];
        for (let month = 0; month < 12; month++) {

            const firstDayOfMonth = new Date(year, month, 1);
            firstDays.push(firstDayOfMonth);
        }
        return firstDays;
    }
    const firstDayofthisMonth = getFirstDaysOfMonth(currentYear).find(day => day.getMonth() === currentMonth)
    const firstDayofNextMonth = getFirstDaysOfMonth(currentYear).find(day => day.getMonth() === nextMonth)
    const day = firstDayofthisMonth.getDay()
    const dayNextMonth = firstDayofNextMonth.getDay()
    const emptyDay = []
    const nextemptyDay = []
    for (let i = 0; i < day; i++) {
        emptyDay.push(`X${i}`)
    }
    for (let i = 0; i < dayNextMonth; i++) {
        nextemptyDay.push(`X${i}`)
    }
    function getMonthLengths(year) {
        const monthLengths = [];
        for (let month = 0; month < 12; month++) {

            const lastDayOfMonth = new Date(year, month + 1, 0);

            const lengthOfMonth = lastDayOfMonth.getDate();

            monthLengths.push(lengthOfMonth);
        }
        return monthLengths;
    }
    const currentMonthLength = getMonthLengths(currentYear)[currentMonth]
    const nextMonthLength = getMonthLengths(currentYear)[nextMonth]
    const dates = []
    const datesNextMonth = []
    for (let i = 1; i < currentMonthLength + 1; i++) {
        dates.push(i)
    }
    for (let i = 1; i < nextMonthLength + 1; i++) {
        datesNextMonth.push(i)
    }
    const resetDate = () => {
        setCount(0)
        setActiveCheckInThisMonth([])
        setActiveCheckOutThisMonth([])
        setActiveCheckInNextMonth([])
        setActiveCheckOutNextMonth([])
        setStartDay(Number(defaultStartDate.getDate()))
        setEndDay(Number(defaultEndDate.getDate()))
        setStartMonth(monthString(defaultStartDate.getMonth()).slice(0, 3))
        setEndMonth(monthString(defaultEndDate.getMonth()).slice(0, 3))
        setStartYear(defaultStartDate.getFullYear())
        setEndYear(defaultEndDate.getFullYear())
        setIsClick(true)
    }
    
    const gobackMonth = (e) => {
        e.stopPropagation()
        setCurrentDate(prev=>new Date(prev.setMonth(prev.getMonth()-1)))
        setCount(0)
        setActiveCheckInThisMonth([])
        setActiveCheckOutThisMonth([])
        setActiveCheckInNextMonth([])
        setActiveCheckOutNextMonth([])
    }
    
    const goNextMonth = (e) => {
        e.stopPropagation()
        setCurrentDate(prev=>new Date(prev.setMonth(prev.getMonth()+1)))
        setCount(0)
        setActiveCheckInThisMonth([])
        setActiveCheckOutThisMonth([])
        setActiveCheckInNextMonth([])
        setActiveCheckOutNextMonth([])
    }
    
    return (
        <div className="date-choose-container">
            <div className="date-select-container">
                <div className="date-select-left-container">
                    <div style={{ fontWeight: "bold" }}>Select dates</div>
                    <div>{startMonth !== endMonth && count === 2 ? nightstoString1(currentMonthLength, startDay, endDay) : nightstoString2(startDay, endDay)}</div>
                </div>
                <div className="date-select-right container">
                    <div id="checkin-date-container">
                        <div id="checkin-date">CHECK-IN</div>
                        <div>{`${stiringMonthtoNumber(startMonth)}/${startDay}/${startYear}`}</div>
                    </div>
                    <div id="checkout-date-container">
                        <div id="checkout-date">CHECKOUT</div>
                        <div>{ `${stiringMonthtoNumber(endMonth)}/${endDay}/${endYear}`}</div>
                    </div>
                </div>
            </div>
            <div className="calender-container">
                <div className="current-calender-container">
                    <div id="calender-format-container">
                        <div id="go-back-month" onClick={gobackMonth}>
                        <i className="fas fa-chevron-left"></i>
                        </div>
                        <input disabled readOnly ref={startYearRef} style={{ border:"none", fontWeight: "bold", textAlign: "center", padding: "20px" }} value={`${monthString(currentMonth)} ${currentYear}`} />
                        <div id="weeks">
                            <div>Su</div>
                            <div>Mo</div>
                            <div>Tu</div>
                            <div>We</div>
                            <div>Th</div>
                            <div>Fr</div>
                            <div>Sa</div>
                            {emptyDay.map(day => <div className="date-disable" key={day}>{day}</div>)}
                            {dates.map((day) => <input disabled={currentMonthDateBoolean(currentYear, currentMonth, day, now)|| ((day < startDay) && now.getMonth() === currentMonth)} className={`each-day  ${currentMonthDateBoolean(currentYear, currentMonth, day, now) || (count > 0 && !activeCheckInThisMonth.length) ||  ( activeCheckInThisMonth.length && (day < startDay)) || (!activeCheckInThisMonth.length && (day < startDay) && currentMonth === now.getMonth())? 'past-day' : ''} ${activeCheckInThisMonth == day ? "activeIn" : ''}`} id={`${activeCheckOutThisMonth == day ? 'activeOut' : ''}`} key={day} value={day} onClick={e => {
                                if (isClick) {
                                    setStartDay(Number(e.target.value))
                                    setStartMonth(monthString(currentMonth).slice(0, 3))
                                    setActiveCheckInThisMonth([Number(e.target.value)])
                                    setCount(prev => prev + 1)
                                    setStartYear(Number(startYearRef.current.value.split(' ')[1]))
                                    return setIsClick(!isClick)
                                } else {
                                    setEndDay(Number(e.target.value))
                                    setEndMonth(monthString(currentMonth).slice(0, 3))
                                    setActiveCheckOutThisMonth([Number(e.target.value)])
                                    setEndYear(Number(startYearRef.current.value.split(' ')[1]))
                                    setCount(prev => prev + 1)
                                    return setIsClick(!isClick)
                                }
                            }}/>)}
                        </div>
                    </div>
                </div>
                <div className="next-calender-container">
                    <div id="calender-format-container">
                        <input disabled ref={endYearRef} readOnly style={{border:"none", fontWeight: "bold", textAlign: "center", padding: "20px" }} value={`${monthString(nextMonth)} ${yearLater(nextMonth, currentYear)}`} />
                        <div id="go-next-month" onClick={goNextMonth}>
                        <i className="fas fa-chevron-right"></i>
                        </div>
                        <div id="weeks">
                            <div>Su</div>
                            <div>Mo</div>
                            <div>Tu</div>
                            <div>We</div>
                            <div>Th</div>
                            <div>Fr</div>
                            <div>Sa</div>
                            {nextemptyDay.map(day => <div className="date-disable" key={day}>{day}</div>)}
                            {datesNextMonth.map((day) => <input disabled={nextMonthDateBoolean(currentYear, nextMonth, day, now) || ( activeCheckInNextMonth.length && (day < startDay) && (now.getMonth() !== nextMonth))} className={`each-day ${nextMonthDateBoolean(currentYear, nextMonth, day, now) ||((day < startDay) && now.getMonth() !== nextMonth && activeCheckInNextMonth.length) ? 'past-day' : ''} ${activeCheckInNextMonth.includes(day) ? "activeIn" : ''}`} id={`${activeCheckOutNextMonth.includes(day) ? 'activeOut' : ''}`} key={day} value={day} onClick={e => {
                                if (isClick) {
                                    setStartDay(Number(e.target.value))
                                    setStartMonth(monthString(nextMonth).slice(0, 3))
                                    setStartYear(Number(endYearRef.current.value.split(' ')[1]))
                                    setActiveCheckInNextMonth([Number(e.target.value)])
                                    setCount(prev => prev + 1)

                                    return setIsClick(!isClick)
                                } else {
                                    setEndDay(Number(e.target.value))
                                    setEndMonth(monthString(nextMonth).slice(0, 3))
                                    setEndYear(Number(endYearRef.current.value.split(' ')[1]))
                                    setActiveCheckOutNextMonth([Number(e.target.value)])
                                    setCount(prev => prev + 1)
                                    return setIsClick(!isClick)
                                }
                            }} readOnly />)}
                        </div>
                    </div>
                </div>
            </div>
            <div id="calender-button-container">
                <button onClick={resetDate}>Clear</button>
                <button onClick={closeModal}>Save</button>
            </div>
        </div>
    )
}
//activeCheckInNextMonth.length > 0 nextMonth disable and active
export default BookingFormModal