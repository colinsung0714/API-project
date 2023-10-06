import React, { useState } from "react";
import '../GuestsModal/GuestModal.css'
import { useModal } from "../../context/Modal"

export const GuestModal = ({ guest, setGuest }) => {
    const { closeModal } = useModal();
    const [adult, setAdult] = useState(guest)
    const [children, setChildren] = useState(0)
    const [infants, setInfants] = useState(0)
  
    return (
        <div className="guest-modal-container">
            <div style={{ fontSize: "18pt", fontWeight: "bold" }}>Guest</div>
            <div className="guest-selection-container">
                <div className="guest-selection-box">
                    <div id="guest-gen-left-box">
                        <div id="guest-gen-container">Adult</div>
                        <div id="guest-age-des-box">Age 13+</div>
                    </div>
                    <div id="guest-selection-right-box">
                        {adult > 1 ? <div onClick={() => {
                            setAdult(prev => prev - 1)
                            setGuest(prev => prev - 1)
                        }} id="minuse-guest-box"><i class="far fa-minus-square"></i></div> : null}
                        <div>{adult}</div>
                        <div onClick={() => {
                            setAdult(prev => prev + 1)
                            setGuest(prev => prev + 1)
                        }} id="guest-icon-container"><i className="far fa-plus-square" style={{ color: '#c3c4c6' }}></i></div>
                    </div>
                </div>
                <div className="guest-selection-box">
                    <div id="guest-gen-left-box">
                        <div id="guest-gen-container">Children</div>
                        <div id="guest-age-des-box">Age 2—12</div>
                    </div>
                    <div id="guest-selection-right-box">
                        {children > 0 ? <div onClick={() => {
                            setChildren(prev => prev - 1)
                            setGuest(prev => prev - 1)
                        }} id="minuse-guest-box"><i class="far fa-minus-square"></i></div> : null}
                        <div>{children}</div>
                        <div onClick={() => {
                            setChildren(prev => prev + 1)
                            setGuest(prev => prev + 1)
                        }} id="guest-icon-container"><i className="far fa-plus-square" style={{ color: '#c3c4c6' }}></i></div>
                    </div>
                </div>
                <div className="guest-selection-box">
                    <div id="guest-gen-left-box">
                        <div id="guest-gen-container">Infants</div>
                        <div id="guest-age-des-box">Under 2</div>
                    </div>
                    <div id="guest-selection-right-box">
                        {infants > 0 ? <div onClick={() => {
                            setInfants(prev => prev - 1)
                            setGuest(prev => prev - 1)
                        }} id="minuse-guest-box"><i class="far fa-minus-square"></i></div> : null}
                        <div>{infants}</div>
                        <div onClick={() => {
                            setInfants(prev => prev + 1)
                            setGuest(prev => prev + 1)
                        }} id="guest-icon-container"><i className="far fa-plus-square" style={{ color: '#c3c4c6' }}></i></div>
                    </div>
                </div>
            </div>
            <div className="guest-number-button-container">
                <button onClick={() => {
                    setGuest(1)
                    setAdult(1)
                    setChildren(0)
                    setInfants(0)
                    closeModal()
                    }} id="cancel-guest-number-button">Cancel</button>
                <button onClick={() => closeModal()} id="save-guest-number-button">Save</button>
            </div>
        </div>
    )
}