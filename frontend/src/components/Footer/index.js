import React from "react";
import '../Footer/Footer.css'

export const Footer = () => {
    const creator = { name: "Colin Sung", github: "https://github.com/colinsung0714", linkedin: "https://www.linkedin.com/in/colin-sung-187a57103" }
    return (
        <>
        <div id="empty-space" style={{height:"100px"}}></div>
        <div id="footer-body">
            <span id="technologies-left">
                <div className='footer-h3-title-div'>
                    Technologies
                </div>
                <div id="technology-icons">
                    <i className="fab fa-google"></i>
                    <i className="fab fa-aws fa-xs"></i>
                    <i className="fab fa-js-square fa-xs"></i>
                    <i className="fab fa-react fa-xs"></i>
                    <i className="fab fa-html5 fa-xs"></i>
                    <i className="fab fa-css3 fa-xs"></i>
                    <i className="fab fa-python fa-xs"></i>
                </div>
            </span>
            <span id="creators-right">
                <div className='footer-h3-title-div'>
                    Developer
                </div>
                <div id='profile-items-container'>
                    <a href={creator.github} id='creator-item' target="_blank" rel="noreferrer">
                        <i id="github-icon" className="fab fa-github"></i>
                        <p id='creator-name'>{creator.name}</p>
                    </a>
                    <a href={creator.linkedin} id='creator-item' target="_blank" rel="noreferrer">
                        <i class="fab fa-linkedin"></i>
                        <p id='creator-name'>{creator.name}</p>
                    </a>
                </div>
            </span>
        </div>
        </>
    )
}