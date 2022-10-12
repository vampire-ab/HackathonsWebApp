import React from "react";
import Navbar from "../../components/navbar/Navbar";
import HackathonHeader from "../../components/hackathonheader/HackathonHeader";
import ".//hackathondetails.scss";
import { useLocation, useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function HackathonDetails() {
  const loc = useLocation();
  const navigate = useNavigate();
  const deleteHackathon = () => {
    axios
      .delete(`http://localhost:8000/hackathons_list/${loc.state.id}`)
      .then(() => {
        console.log("Ok");
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="hackathondetails">
      <Navbar />
      <HackathonHeader        
        title={loc.state.title}
        start={loc.state.start}
        end={loc.state.end}
        description={loc.state.description}        
        difficulty={loc.state.difficulty}
      />
      <div className="details">
        <div className="overview">
          Overview<p></p>
        </div>
        <div
          className="btn btn-success edit"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/CreateChallenge/${loc.state.id}`, {
              state: {
                id: loc.state.id,
                title: loc.state.title,
                start: loc.state.start,
                end: loc.state.end,
                description: loc.state.description,
                img: loc.state.img,
                difficulty: loc.state.difficulty,
              },
            });
          }}
        >
          Edit
        </div>
        <div
          className="btn btn-outline-danger delete"
          onClick={deleteHackathon}
        >
          Delete
        </div>
      </div>
      <div className="abouthackathon">
        {loc.state.description.split("\n").map((desc, i) => (
          <p className="aboutparagraph" key={i}>
            {desc}
          </p>
        ))}
      </div>
    </div>
  );
}
