import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './SpotContainer.css'
import '../ManageSpotPage/ManageSpotPage.css'
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from '../DeleteSpotModal'

const SpotContainer = ({ spot, formType}) => {
    const [tooltip, setTooltip] = useState(false)
    
    const history = useHistory()
    const ref = useRef()
    const clickImg = () => {
        history.push(`/spots/${spot.id}`)
    }

    

    const gotoUpdate = () => {
      
        const dataInfo = { formType:'update', spotId:spot.id}
        history.push({
            pathname: '/spots/new',
            state: dataInfo,
          });
    }
    if(!Object.values(spot).length) return null;
  
    return (
        
        <div className="spot-container">
            <div className="spot-image">
                <img ref={ref} onMouseEnter={()=>setTooltip(true)} onMouseLeave={()=>setTooltip(false)} onClick={clickImg} id='spot-img' src={`${spot.previewImage}`}  alt={spot.previewImage}/>
                {tooltip && <div ref={ref} onMouseEnter={()=>setTooltip(true)} className="tooltip">{spot.name}</div>}
            </div>
            <div className="spot-info-container">
                <div className="city-state-star-container">
                    <div className="city-state">{spot.city}, {spot.state}</div>
                    <div className="star"><i className="fa-solid fa-star"></i> {isNaN(Number.parseFloat(spot.avgRating).toFixed(1))? 'New' : Number.parseFloat(spot.avgRating).toFixed(1)}</div>
                </div>
                <div className="price-container">
                    {spot.price ? `$${spot.price} night` : 'New'}
                </div>
            
            </div>
            {formType === 'owner' ? <div className="update-delete-spot-button-container">
                    <button onClick={gotoUpdate} className="owner-update-button">Update</button>
                    <OpenModalButton className="owner-delete-button" buttonText="Delete" 
                modalComponent={<DeleteSpotModal spot={spot} />} />
                </div> :<></>}
        </div>
        
    )
}

export default SpotContainer