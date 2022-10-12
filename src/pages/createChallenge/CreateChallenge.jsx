import React, { useState, useEffect } from "react";
import "./createchallenge.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/Navbar";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateChallenge() {
  const loc = useLocation();

  const [hackathons_list, setHackathons_list] = useState(null);

  // console.log("Here", hackathons_list)
  const id = loc.state.id;
  const [title, setTitle] = useState(loc.state.title);
  const [start, setStart] = useState(loc.state.start);
  const [end, setEnd] = useState(loc.state.end);
  const [isPending, setisPending] = useState(true);
  const [description, setDesc] = useState(loc.state.description);
  const [img, setImg] = useState(loc.state.img);
  const [difficulty, setDifficulty] = useState(loc.state.difficulty);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/hackathons_list/${loc.state.id}`)
      .then(() => {
        console.log("Ok");
        const hackathon = {
          id,
          title,
          start,
          end,
          description,
          img,
          difficulty,
        };
        fetch("http://localhost:8000/hackathons_list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hackathon),
        }).then(() => {
          console.log("New Hackathon Added!");
          setisPending(false);
          navigate(`/HackathonDetails/${hackathon.id}`, {
            state: {
              title: `${hackathon.title}`,
              start: `${hackathon.start}`,
              end: `${hackathon.end}`,
              description: `${hackathon.description}`,
              img: `${hackathon.img}`,
              difficulty: `${hackathon.difficulty}`,
            },
          });
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Navbar />
      <div className="header">Challenge Details</div>
      <div className="createchallenge">
        <div>
          <p>Challenge Name</p>
          <label htmlFor="Challenge_Name"></label>
          <input
            type="text"
            id="Challenge_Name"
            className="input"
            size="51"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p>Start Date</p>

          <div className="calendarbar">
            <label htmlFor="Start_Date" id="Start_Date"></label>
            <input
              type="date-time"
              className="inputbar"
              placeholder="DD/MM/YYYY"
              size="40"
              id="Start_Date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              style={{
                border: "0px",
                padding: "5px",
                marginLeft: "2px",
                outline: "none",
              }}
            />
            <span
              id="basic-addon2"
              style={{ padding: "5px", marginRight: "15px" }}
            >
              <CalendarTodayOutlinedIcon color="disabled" />
            </span>
          </div>
          <p>End Date</p>
          <div className="calendarbar">
            <label htmlFor="End_Date"></label>
            <input
              type="date-time"
              className="inputbar"
              placeholder="DD/MM/YYYY"
              size="40"
              id="End_Date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              style={{
                outline: "none",
                border: "0px",
                padding: "5px",
                marginLeft: "2px",
              }}
            />
            <span
              id="basic-addon2"
              style={{ padding: "5px", marginRight: "15px" }}
            >
              <CalendarTodayOutlinedIcon color="disabled" />
            </span>
          </div>
          <p>Description</p>
          <textarea
            type="text"
            className="desc_box"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
          <p>Image</p>
          {img ? <img src={require(`${img}`)} alt="" /> : <img></img>}

          <div className="upload_btn">
            <input
              type="file"
              id="actual-btn"
              hidden
              onChange={(e) => {
                // setImg(e.target.files[0].name);
                console.log("img : ", img);
              }}
            />
            <label htmlFor="actual-btn">
              Upload {"  "}
              <CloudUploadIcon color="disabled" />
            </label>
          </div>
          <select
            name="difficulty"
            id="difficulty"
            className="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy" className="options">
              Easy
            </option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button className="create_challenge" onClick={handleSubmit}>
            {" "}
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
