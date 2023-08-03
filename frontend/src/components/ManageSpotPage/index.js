import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetAllSpots } from "../../store/spots";
import SpotContainer from "../LandingPage/SpotContainer";
import { useHistory } from "react-router-dom";

const ManageSpotPage = () => {
    const currentUser = Object.values(useSelector(state=>state.session))
    const history = useHistory()
    const spots = Object.values(useSelector(state => state.spots.allSpots))
   
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(fetchgetAllSpots())
    },[dispatch])

  
    if(!currentUser.length) return null
    // if (!spots.length) return null
    let ownSpots =spots.filter(spot=>spot.ownerId === currentUser[0].id)
  
    // if(!ownSpots.length) return null
  
    return (
        <>
        <div className="space-saver"></div>
        <div className="manage-spot-header">
        <div>Manage Your Spots</div>
        { !ownSpots.length && <button onClick={()=>history.push('/spots/new')} id='manage-spot-create-button' >Create a New Spot</button>}
        </div>
        <div className="all-spots-container">
             
            { ownSpots.map(spot => {
                if (spot.id) {
                    return <SpotContainer key={spot.id} spot={spot} formType={'owner'} />
                } else {
                    return null
                }
            }
            )}
        </div>
        </>
    )
}

export default ManageSpotPage