import React, { useState, useEffect } from "react";
import '../PhotoTrack/PhotoTrack.css'
export const PhotoTrack = ({index, i}) => {
    const [active , setActive] = useState( index === i ? true : false)
    useEffect(()=>{
        if(index === i) setActive(true)
        else setActive(false)
    },[i, index])
    
    return (
        <i id="photo-tracker" className={ active ? "fas fa-circle active" : "fas fa-circle"}></i>
    )
}