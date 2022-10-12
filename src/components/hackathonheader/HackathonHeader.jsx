import React from "react";
import { useLocation } from "react-router";
import "./hackathonheader.scss";

export default function HackathonHeader() {
  const loc = useLocation();
  return (
    
    <div className="hackathonheader">
      <div className="timedetails">
        <p> Starts On {loc.state.start} (Indian Standarad Time)</p>
      </div>
      <div className="hackathontitle">
        {loc.state.title}
      </div>
      <div className="hackathontask">
       {loc.state.description}
      </div>
      <div className="hackathondifficulty">
        <p>
          <span className="skill-level">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.875 16.875H12.375V2.25H16.875V16.875ZM13.5 15.75H15.75V3.375H13.5V15.75ZM11.25 16.875H6.75V6.75H11.25V16.875ZM7.875 15.75H10.125V7.875H7.875V15.75ZM5.625 16.875H1.125V10.125H5.625V16.875Z"
                fill="#003145"
              />
            </svg>
          </span>
          {loc.state.difficulty}
        </p>
      </div>
    </div>
  );
}
