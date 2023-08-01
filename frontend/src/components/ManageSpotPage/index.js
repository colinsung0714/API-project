import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetAllSpots } from "../../store/spots";
import SpotContainer from "../LandingPage/SpotContainer";

const ManageSpotPage = () => {
    const currentUser = Object.values(useSelector(state=>state.session))
    
    const spots = Object.values(useSelector(state => state.spots.allSpots))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchgetAllSpots())
    }, [dispatch])
    if(!currentUser.length) return null
    if (!spots) return null
    const ownSpots =spots.filter(spot=>spot.ownerId === currentUser[0].id)
    
    return (
        <div className="all-spots-container">
            {ownSpots.map(spot => {
                if (spot.id) {
                    return <SpotContainer key={spot.id} spot={spot} formType={'owner'} />
                } else {
                    return null
                }
            }
            )}
        </div>
    )
}

export default ManageSpotPage