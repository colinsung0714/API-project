import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import MapContainer from "../Maps";
import '../BookingDetail/BookingDetail.css'
import { PhotoTrack } from "../PhotoTrack";
import { bookingDetailDateString, weeksLaterStartDate } from "../helper";
import { useSelector } from "react-redux";

export const BookingDetail = () => {
    const currentUser = useSelector(state => state.session.user)
    const location = useLocation()
    const history = useHistory()
    const { bookingId } = useParams()
    const bookingInfo = Object.values(useSelector(state => state.bookings.user))?.find(reserve => reserve.id === Number(bookingId))
    const booking = location.state ? location.state.booking : bookingInfo
    const spot = booking?.Spot
    const spotImages = spot?.SpotImages
    const prevImage = []
    const otherImages = []
    const photoCounter = []
    const defaultImage = "https://opentables.s3.us-west-1.amazonaws.com/default-profile-pic.jpg"
    let photoList = []
    if (spotImages?.length) {
        for (let photo of spotImages) {
            if (photo.preview === true) prevImage.push(photo.url)
            else otherImages.push(photo.url)
        }
    }
    if (otherImages.length) {
        photoList = [prevImage[0], ...otherImages]
    } else {
        photoList = [prevImage[0]]
    }
    const [index, setIndex] = useState(0)
    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const [currentUserLocation, setCurrentUserLocation] = useState({})
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.screen.width);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!spot) return null
    const handlePhotos = e => {
        if (index < photoList.length - 1) setIndex(prev => prev + 1)
        else setIndex(0)
    }
    const checkInString = bookingDetailDateString(booking?.startDate)
    const checkoutString = bookingDetailDateString(booking?.endDate)

    if (screenWidth <= 1000) {
        for (let i = 19; i < booking.guests * 19; i += 19) {
            photoCounter.push(i)
        }
    }
    else if (screenWidth <= 1300) {
        for (let i = 25; i < booking.guests * 25; i += 25) {
            photoCounter.push(i)
        }
    }
    else {
        for (let i = 45; i < booking.guests * 45; i += 45) {
            photoCounter.push(i)
        }
    }

    if (currentUser.id !== booking.userId) history.push('/')

    const cancellationDate = weeksLaterStartDate(booking?.startDate)

    const findMe = () => {
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCurrentUserLocation({ lat: latitude, lng: longitude })
        }

        function error() {
            alert("Unable to retrieve your location")
        }

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser")
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        <div className="booking-detail-container">
            <div className="booking-detail-left-container">
                <div id="booking-photos-container">
                    <img style={{ width: "100%", height: "400px" }} src={photoList[index]} alt={photoList[index]} />
                    <i id="photo-selector-icon" onClick={handlePhotos} className="fas fa-chevron-circle-right"></i>
                    <div id="outer-photo-tracker">{photoList.length ? photoList.map((photo, i) => <div id="photo-tracker-container" key={photo.id}><PhotoTrack index={index} i={i} /></div>) : null}</div>
                    <i onClick={() => history.push('/bookings/current')} id="back-to-manage-booking-icon" className="fas fa-arrow-circle-left"></i>
                    <div id="title-photo-booking-detail-box">{`You're all set for ${spot.city}`}</div>
                </div>
                <div className="booking-checkin-checkout-container">
                    <div className="booking-check-left">
                        <div style={{ padding: "10px 0" }}>Check-in</div>
                        <div style={{ fontWeight: "bold" }}>{checkInString}</div>
                        <div style={{ fontSize: "15px", color: "darkgray" }}>3:00 PM</div>
                    </div>
                    <div className="booking-check-right">
                        <div style={{ padding: "10px 0" }}>Checkout</div>
                        <div style={{ fontWeight: "bold" }}>{checkoutString}</div>
                        <div style={{ fontSize: "15px", color: "darkgray" }}>11:00 AM</div>
                    </div>
                </div>
                <div className="booking-detail-address-container">
                    <i className="fas fa-map-marker-alt"></i>
                    <div onClick={findMe} id="user-location-direction">
                        <div style={{ fontWeight: "bold" }}>Getting There</div>
                        <div style={{ fontSize: "15px", color: "darkgray" }}>{`Address: ${spot.address}`}</div>
                        {distance && duration ? <div id="distance-duration-status-box">
                            <div>
                                {`Distance: ${distance}`}
                            </div>
                            <div>
                               {`Duration: ${duration}`}
                            </div>
                        </div> : null}
                    </div>
                </div>
                <div className="reservation-detail-booking-container">
                    <div style={{ fontWeight: "bold", fontSize: "25px", paddingBottom: "20px" }}>Reservation details</div>
                    <div id="reservation-detail-guest-box">
                        <div id="reservation-detail-guest-box-left">
                            <div style={{ fontWeight: "bold" }}>Who's coming</div>
                            <div>{booking.guests === 1 ? `${booking.guests} guest` : `${booking.guests} guests`}</div>
                        </div>
                        <div id="reservation-detail-guest-box-right">
                            <img id="user-profile-pic-guest" src={currentUser.profileUrl} alt={currentUser.profileUrl} />
                            {photoCounter.length > 0 ? photoCounter.map((el, i) => <img id="extra-guest-photo" style={{ position: "absolute", left: `${el}px`, zIndex: `${i}` }} key={i} src={defaultImage} alt={defaultImage} />) : null}
                        </div>
                    </div>
                    <div className="cancellation-reservation-detail-box">
                        <div id="cancellation-policy-message">Cancellation policy</div>
                        <div>{`Free cancellation before 3:00 PM on ${cancellationDate}. After that, the reservation is non-refundable.`}</div>
                    </div>
                </div>
                <div onClick={() => history.push(`/bookings/${bookingId}/edit`)} className="update-reservation-button-container">
                    <i className="fas fa-pencil-alt"></i>
                    <div>Change reservation</div>
                    <i className="fas fa-angle-right"></i>
                </div>
                <div onClick={() => history.push(`/bookings/${bookingId}/cancel`)} className="cancel-reservation-button-container">
                    <i className="fas fa-ban"></i>
                    <div>Cancel reservation</div>
                    <i className="fas fa-angle-right"></i>
                </div>
            </div>
            <div className="booking-detail-right-container">
                <MapContainer currentUserLocation={currentUserLocation} spot={spot} type={'booking'} booking={booking} setDistance={setDistance} setDuration={setDuration}/>
            </div>
        </div>
    )
}