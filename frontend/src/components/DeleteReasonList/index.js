import React, {useState} from "react";
import '../DeleteReasonList/DeleteReasonList.css'

export const DeleteReasonList = ({handleClick, opt }) => {
    const [active, setActive] = useState(false)
    return (
        <input style={active ? {backgroundColor:"lightgray", color:"white"}:null} id="option-input-list" onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)} onClick={handleClick} value={opt} readOnly />
    )
}