import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetAllSpots } from '../../store/spots'
import SpotContainer from './SpotContainer'

import './LandingPage.css'
const LandingPage = () => {
    const spots = Object.values(useSelector(state => state.spots.allSpots))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchgetAllSpots())
    }, [])
    if (!spots) return null
    return (
        <>
        <div className="space-saver"></div>
        <div className="all-spots-container">
            {spots.map(spot => {
                if (spot.id) {
                    return <SpotContainer key={spot.id} spot={spot} />
                } else {
                    return null
                }
            }
            )}
        </div>
        </>
    )
}

export default LandingPage