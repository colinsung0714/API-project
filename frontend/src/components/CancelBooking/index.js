import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import '../CancelBooking/CancelBooking.css'
import Navigation from "../Navigation";
import { DeleteReasonList } from "../DeleteReasonList";
import { periodStringReservation } from '../helper'
import {fetchDeleteBooking} from '../../store/bookings'
export const CancelBooking = () => {
    const { bookingId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [option, setOption] = useState('')
    const [showList, setShowList] = useState(false)
    const [step, setStep] = useState(1)
    const [error, setError] = useState({})
    const [text, setText] = useState('')
    const booking = Object.values(useSelector(state => state.bookings.user)).find(reserv => reserv.id === Number(bookingId))
    useEffect(() => {
        const header = document.querySelector('header')
        header.style.display = 'none'
    }, [])
    const loaded = true
    const handleClick = e => {
        setOption(e.target.value)
        setShowList(false)
    }
    const fowardStep = () => {
        if (step < 3) setStep(prev => prev + 1)
    }
    const backStep = () => {
        if (step > 1) setStep(prev => prev - 1)
    }
    const spot = booking?.Spot
    const owner = spot?.Owner
    const dateString = periodStringReservation(booking?.startDate, booking?.endDate)
    const fund = Number.parseFloat(booking?.total).toFixed(2)
    const taxe = Number.parseFloat(booking?.taxes).toFixed(2)
    const servicefee = Number.parseFloat(booking?.serviceFee).toFixed(2)
    const accomodation = Number.parseFloat(booking?.accomodation).toFixed(2)
    const optionList = ['I no longer need accommodations', 'I made the reservation by accident', 'My host needs to cancel', "I'm uncomfortable with the host", 'My travel dates changed', 'Other']
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(fetchDeleteBooking(bookingId)).then(()=>{
        const header = document.querySelector('header')
        header.style.display = ''
        history.push('/bookings/current')
    }).catch(e=>setError(e))
    }
    return (
        <>
            <Navigation loaded={loaded} type={'cancel'} step={step} />
            <div className="booking-cancel-container">
                <div className="cancel-container">
                    <div className="cancel-left-container">
                        {
                            step === 1 ? <>
                                <div className="cancel-left-upper-box">
                                    <div style={{ fontWeight: "bold", fontSize: "25px" }}>Why do you need to cancel?</div>
                                    <div id="cancel-reason-selection-box">
                                        <div onClick={() => {
                                            setShowList(prev => !prev)
                                            setOption('')
                                        }} id="selection-input">
                                            <div>
                                                <div style={option ? { fontSize: "15px", color: "darkgray" } : null}>Please select a reason</div>
                                                <div>{option}</div>
                                            </div>
                                            <i className="fas fa-sort-down"></i>
                                        </div>
                                        {showList ? optionList.map(opt => <div key={opt}><DeleteReasonList handleClick={handleClick} opt={opt} /></div>) : null}
                                    </div>
                                </div>
                            </> : null
                        }
                        {
                            step === 2 ? <>
                                <div className="cancel-left-upper-box">
                                    <div style={{ fontWeight: 'bold', fontSize: '25px', width: "100%" }}>{`Tell ${owner?.firstName} why you need to cancel`}</div>
                                    <textarea value={text} onChange={(e)=>setText(e.target.value)} style={{ border: "solid 1px lightgray", height: "100px", borderRadius: "10px", width: "auto" }} />
                                </div>
                            </> : null
                        }
                        {
                            step === 3 ? <>
                                <div className="cancel-left-upper-box">
                                    <div style={{ fontWeight: 'bold', fontSize: '25px', width: "100%" }}>Confirm cancellation</div>
                                    {booking?.total ?
                                        <div className="total-refund-summary-box">
                                            <div className="refund-summary-top-box">
                                                <div id="you-paid-box">
                                                    <div>You've paid</div>
                                                    <div style={{ fontWeight: "bold" }}>${fund}</div>
                                                </div>
                                                <div id="you-refund-box">
                                                    <div>Your refund</div>
                                                    <div style={{ fontWeight: "bold" }} >${fund}</div>
                                                </div>
                                            </div>
                                            <div id="refund-summary-middle-box">
                                                <div style={{ fontWeight: "bold" }}>Refund details</div>
                                                <div className="refund-section-box">
                                                    <div id="left-refund-section-box">
                                                        <div>Accommodation</div>
                                                        <div id="lower-refund-section-box">Full refund</div>
                                                    </div>
                                                    <div id="right-refund-section-box">
                                                        <div style={{display:"flex",alignSelf:"flex-end"}}>${accomodation}</div>
                                                        <div style={{textAlign:"end"}} id="lower-refund-section-box">of ${accomodation} paid</div>
                                                    </div>
                                                </div>
                                                <div className="refund-section-box">
                                                    <div id="left-refund-section-box">
                                                        <div>Service fee</div>
                                                        <div id="lower-refund-section-box">Full refund</div>
                                                    </div>
                                                    <div id="right-refund-section-box">
                                                        <div style={{display:"flex",alignSelf:"flex-end"}}>${servicefee}</div>
                                                        <div style={{textAlign:"end"}} id="lower-refund-section-box" >of ${servicefee} paid</div>
                                                    </div>
                                                </div>
                                                <div className="refund-section-box">
                                                    <div id="left-refund-section-box">
                                                        <div>Taxes</div>
                                                        <div id="lower-refund-section-box">Full refund</div>
                                                    </div>
                                                    <div id="right-refund-section-box">
                                                        <div style={{display:"flex",alignSelf:"flex-end"}}>${taxe}</div>
                                                        <div style={{textAlign:"end"}} id="lower-refund-section-box" >of ${taxe} paid</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="refund-total-confirm-box">
                                                <div>Total refund</div>
                                                <div>${fund}</div>
                                            </div>
                                        </div> : <div>There is no refund amount</div>
                                    }
                                </div>
                            </> : null
                        }
                        <div className="bottom-status-container">
                            <div className="status-bar">
                                <div style={step === 1 || step === 2 || step === 3 ? { border: "solid 1px black" } : null}></div>
                                <div style={step === 2 || step === 3 ? { border: "solid 1px black" } : null}></div>
                                <div style={step === 3 ? { border: "solid 1px black" } : null}></div>
                            </div>
                            <div className="bottom-status-button-container">
                                <div onClick={backStep} id="bottom-back-button-container">
                                    <i className="fas fa-chevron-left"></i>
                                    <div style={{ textDecoration: "underline" }}>Back</div>
                                </div>
                                <div style={{ color: "darkgray" }}>{`${step}/3`}</div>
                                {error.message && <p style={{color:"red"}}>{error.message}</p>}
                                {step === 1 || step === 2 ? <button onClick={fowardStep}>Continue</button> : <button onClick={handleSubmit} style={{ width: "150px" }}>Cancel reservation</button>}
                            </div>
                        </div>
                    </div>
                    <div className="cancel-right-container">
                        <div className="cancel-right-upper-container">
                            <img src={spot?.previewImage} alt={spot?.previewImage} />
                            <div id="cancel-right-upper-spot-info-container">
                                <div style={{ fontWeight: "bold" }}>{spot?.name}</div>
                                <div id="cancel-owner-info-box">
                                    <div>Hosted by</div>
                                    <div style={{ textDecoration: "underline" }}>{owner?.firstName}</div>
                                </div>
                            </div>
                        </div>
                        <div className="cancel-date-guests-box">
                            <div id="date-string-box">
                                <div>Dates</div>
                                <div>{dateString}</div>
                            </div>
                            <div id="guests-string-box">
                                <div>Guests</div>
                                <div>{booking?.guests === 1 ? `${booking?.guests} adult` : `${booking?.guests} adults`}</div>
                            </div>
                        </div>
                        {
                            booking?.total ?
                                <>
                                    <div className="payment-info-box">
                                        <div id="paid-date">
                                            <div>Paid to date</div>
                                            <div>${fund}</div>
                                        </div>
                                        <div id="total-refund">
                                            <div style={{ fontWeight: "bold" }}>Total refund</div>
                                            <div>${fund}</div>
                                        </div>
                                    </div>
                                    <div className="cancellation-policy-box">
                                        <div style={{ fontWeight: 'bold' }}>Cancellation policy</div>
                                        <div>Full refund: Get back 100% of what you paid.</div>
                                    </div>
                                </> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}