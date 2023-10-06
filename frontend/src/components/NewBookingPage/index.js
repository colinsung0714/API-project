import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import BookingFormModal from "../BookingFormModal";
import OpenModalButton from "../OpenModalButton";
import { useBookingDate } from '../../context/BookingdateContext'
import { GuestModal } from "../GuestsModal";
import { fetchpostBookingbySpotId } from "../../store/bookings";
import { weekslater, monthString, stiringMonthtoNumber } from "../helper";
import './NewBookingPage.css'
const NewBookingPage = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const currentDay = new Date()
    const currentYear = currentDay.getFullYear()
    const currentMonth = currentDay.getMonth()
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const currentMonthLength = lastDay.getDate()
    const [guest, setGuest] = useState(1)
    const [error, setError] = useState({})
    const { spotId } = useParams()
    const { defaultStartDate, defaultEndDate, startDay, setStartDay, startMonth, setStartMonth, endDay, setEndDay, endMonth, setEndMonth, startYear, setStartYear, endYear, setEndYear, count, setCount } = useBookingDate()
    const history = useHistory()
    if (!Object.values(spot).length) return null
    const weeklater = weekslater(1)
    const weeklaterDate = weeklater.getDate()
    const weeklaterMonth = monthString(weeklater.getMonth())
    const handleSubmit = (e) => {
        e.preventDefault()
        const startmonth = stiringMonthtoNumber(startMonth)
        const endmonth = stiringMonthtoNumber(endMonth)
        const period = {
            startDate:`${startYear}-${startmonth}-${startDay}`,
            endDate:`${endYear}-${endmonth}-${endDay}`,
            guests:guest,
            accomodation:Number(accomodation),
            serviceFee:totalServicefee,
            taxes:Number(taxes),
            total
        }
        dispatch(fetchpostBookingbySpotId(period, spotId)).then(()=>{
            history.push('/bookings/current')
            setStartDay(Number(defaultStartDate.getDate()))
            setEndDay(Number(defaultEndDate.getDate()))
            setStartMonth(monthString(defaultStartDate.getMonth()).slice(0, 3))
            setEndMonth(monthString(defaultEndDate.getMonth()).slice(0, 3))
            setStartYear(defaultStartDate.getFullYear())
            setEndYear(defaultEndDate.getFullYear())
        }).catch(e=>setError(e))
    }
    const accomodation = (startMonth !== endMonth && count === 2) ? Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay)).toFixed(2) : Number.parseFloat(spot.price * Math.abs(startDay - endDay)).toFixed(2)
    const cleaningFee = (startMonth !== endMonth && count === 2) ? Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.176).toFixed(2) : Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.176).toFixed(2) 
    const serviceFee = (startMonth !== endMonth && count === 2) ? Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.166).toFixed(2) : Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.166).toFixed(2) 
    const taxes = (startMonth !== endMonth && count === 2) ? Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.118).toFixed(2) : Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.118).toFixed(2)
    const totalServicefee = Number(cleaningFee) + Number(serviceFee)
    const total = Number(accomodation) + Number(cleaningFee) + Number(serviceFee) + Number(taxes)
    return (
        <div className="new-booking-container">
            <div id="back-request-book">
                <i onClick={() => history.push(`/spots/${spotId}`)} className="fa-solid fa-chevron-left"></i>
                <div>Confirm and pay</div>
            </div>
            <div className="new-booking-sub-container">
                <div className="new-booking-sub-left-container">
                    <div className="your-trip-container">
                        <div className="date-period-guest-container">
                            <h2>Your Trip</h2>
                            <div className="date-period-guest-container">
                                <div className="date-period-edit-container">
                                    <div className="date-period-container">
                                        <div id="date-period-container-left">
                                            <div id="new-booking-date" style={{fontWeight:"bold"}}>Dates</div>
                                            <div id="new-booking-period">{startMonth === endMonth ? `${startMonth} ${startDay} — ${endDay}` : `${startMonth} ${startDay} —  ${endMonth} ${endDay}`}</div>
                                        </div>
                                        {<OpenModalButton id={'date-sumit-button'} buttonText="Edit" modalComponent={<BookingFormModal />} />}
                                    </div>


                                </div>
                                <div className="guests-edit-container">
                                    <div className="guests-guest-container">
                                        <div id="new-booking-guests">Guests</div>
                                        <div id="new-booking-guests-data">{guest > 1 ? `${guest} guests` : `${guest} guest` }</div>
                                    </div>
                                    <div>
                                        <OpenModalButton id={'guest-number-button'} buttonText="Edit" modalComponent={<GuestModal guest={guest} setGuest={setGuest}/>} />    
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="cancellation-container">
                        <div style={{fontSize:"18pt", fontWeight:"bold", padding:"20px 0"}}>Cancellation policy</div>
                        <div id="cancellation-content-bot">{`Cancel before ${weeklaterMonth} ${weeklaterDate} for a partial refund. After that, this reservation is non-refundable.`}</div>
                        <div style={{padding:"30px 0", fontSize:"12px"}}>By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.</div>
                    </div>
                    {error.message && <p style={{color:"red"}}>{error.message}</p>}
                    <div className="payment-plane-container">
                        <button onClick={handleSubmit} id="new-booking-submit-button" type="submit">Confirm and pay</button>
                    </div>
                </div>
                <div className="new-booking-sub-right-container">
                    <div className="new-booking-detail-container">
                        <div className="top-detail-container">
                            <img src={spot.SpotImages.find(img => img.preview === true).url} alt={spot.SpotImages.find(img => img.preview === true).url} />
                            <div className="top-right-detail-container">
                                <div>{spot.name}</div>
                                <div id="top-right-detail-avgstar-numreview">
                                    <div id="top-right-detail-avgstar">{spot.avgStarRating > 0 ? <><i className="fa-solid fa-star"></i><div>{spot.avgStarRating}</div></> : <><i className="fa-solid fa-star"></i><div>New</div></>}</div>
                                    <div id="top-right-detail-numreview">{spot.numReviews > 1 ? `(${spot.numReviews} reviews)` : spot.numReviews === 1 ? `(${spot.numReviews} review)` : '(No Review)'}</div>
                                </div>
                            </div>

                        </div>
                        <div className="middle-detail-container">
                            <h3>Price Detail</h3>
                            <div className="price-times-nights-container">
                                <div>{startMonth !== endMonth && count === 2 ? `$${spot.price} ✕ ${Math.abs(Math.abs(currentMonthLength - startDay) + endDay)} nights` : `$${spot.price} ✕ ${Math.abs(startDay - endDay)} nights`}</div>
                                <div>{startMonth !== endMonth && count === 2 ? `$${Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay)).toFixed(2)}` : `$${Number.parseFloat(spot.price * Math.abs(startDay - endDay)).toFixed(2)}`}</div>
                            </div>
                            <div className="cleaningfee-container">
                                <div>Cleaning fee</div>
                                <div>{startMonth !== endMonth && count === 2 ? `$${Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.176).toFixed(2)}` : `$${Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.176).toFixed(2)}`}</div>
                            </div>
                            <div className="airbrb-servicefee-container">
                                <div>AirBrB service fee</div>
                                <div>{startMonth !== endMonth && count === 2 ? `$${Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.166).toFixed(2)}` : `$${Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.166).toFixed(2)}`}</div>
                            </div>
                            <div className="taxes-container">
                                <div>Taxes</div>
                                <div>{startMonth !== endMonth && count === 2 ? `$${Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.118).toFixed(2)}` : `$${Number.parseFloat(spot.price * Math.abs(startDay - endDay) * 0.118).toFixed(2)}`}</div>
                            </div>
                        </div>
                        <div className="bottom-detail-container">
                            <div>{`Total (USD)`}</div>
                            <div>{startMonth !== endMonth && count === 2 ? `$${Number.parseFloat(spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) + spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.176 + spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.166 + spot.price * Math.abs(Math.abs(currentMonthLength - startDay) + endDay) * 0.118).toFixed(2)}` : `$${Number.parseFloat(spot.price * Math.abs(startDay - endDay) + spot.price * Math.abs(startDay - endDay) * 0.176 + spot.price * Math.abs(startDay - endDay) * 0.166 + spot.price * Math.abs(startDay - endDay) * 0.118).toFixed(2)}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBookingPage