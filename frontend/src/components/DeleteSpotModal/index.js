import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { fetchDeleteSpot, fetchgetAllSpots } from '../../store/spots'
import './DeleteSpotModal.css'
const DeleteSpotModal = ({ spot}) => {
    
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const deleteSpot = () => {
        dispatch(fetchDeleteSpot(spot.id))
        .then(()=>dispatch(fetchgetAllSpots()))
        .then(closeModal)
    
    }
    
 

    return (
        <div className='delete-confirm-container'>
            <div id='confirm-delete-head'>Confirm Delete</div>
            <div>Are you sure you want to remove this spot from listings?</div>
            <button id='delete-spot-button' onClick={deleteSpot}>{'Yes (Delete Spot)'}</button>
            <button id='not-delete-spot-button' onClick={closeModal}>{'No (Keep Spot)'}</button>
        </div>
    )
}

export default DeleteSpotModal