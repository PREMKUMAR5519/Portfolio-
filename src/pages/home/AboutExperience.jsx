import React from 'react'
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";

function AboutExperience() {
    return (
        <div className="myexperience">
            <h3 className="myexperience-heading">My Experience</h3>

            <div className="myexperience-item">
                <div className="myexperience-left">
                    <div className="myexperience-round"></div>
                </div>
                <div className="myexperience-right">
                    <h4>
                        <span><HiOutlineBuildingOffice /></span>
                        SMVEC, Pondicherry
                    </h4>
                    <h5>Website Developer</h5>
                    <h6>
                        <span><CiCalendar /></span>
                        2025 - Present
                    </h6>
                    <p>
                        Worked as a Full Stack developer at Dragon Sino Group, a Chinese company
                        operating in the United Kingdom. Created fully functional MERN Stack Web
                        Applications with responsive behavior, smooth touch UI, and API Integration.
                    </p>
                </div>
            </div>

            <div className="myexperience-item">
                <div className="myexperience-left">
                    <div className="myexperience-round"></div>
                </div>
                <div className="myexperience-right">
                    <h4>
                        <span><HiOutlineBuildingOffice /></span>
                        Heyram Infrastructure, Chennai
                    </h4>
                    <h5>Full Stack Developer</h5>
                    <h6>
                        <span><CiCalendar /></span>
                        Apr 2024 - Dec 2024
                    </h6>
                    <p>
                        Worked as a Full Stack developer at Dragon Sino Group, a Chinese company
                        operating in the United Kingdom. Created fully functional MERN Stack Web
                        Applications with responsive behavior, smooth touch UI, and API Integration.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutExperience
