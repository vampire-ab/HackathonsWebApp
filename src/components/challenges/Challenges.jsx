import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./challenges.scss";
import { useNavigate } from "react-router";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import dayjs from "dayjs";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const status_list = ["All", "Active", "Upcoming", "Past"];
const level_list = ["Easy", "Medium", "Hard"];

export default function Challenges(props) {
  const [now, setNow] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600) % 24;
    var minutes = Math.floor(sec_num / 60) % 60;
    var days = Math.floor(sec_num / 86400);

    return (
      [days, hours, minutes]
        .map((v) => (v < 10 ? "0" + v : v))
        .join(" : ")
    );
  };
  let hacks_time = 0;
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const navigateChallenge = (hackathon) => {
    navigate(`/HackathonDetails/${hackathon.id}`, {
      state: {
        id: `${hackathon.id}`,
        title: `${hackathon.title}`,
        start: `${hackathon.start}`,
        end: `${hackathon.end}`,
        description: `${hackathon.description}`,
        img: `${hackathon.img}`,
        difficulty: `${hackathon.difficulty}`,
      },
    });
  };
  const onSearchChange = (event) => {
    props.setSearch(event.target.value);
  };
  const onFilterChange = (position) => {
    props.setCheckState(position);
  };
  return (
    <div className="challenges">
      <div className="search">
        <p>Explore Challenges</p>
        <div className="searchbar">
          <div
            className="input-group searchbox"
            onChange={onSearchChange}
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <span
              className="input-group-text"
              style={{
                backgroundColor: "white",
                paddingLeft: "25px",
                borderRadius: "10px",
                border: "0",
              }}
            >
              <SearchOutlinedIcon />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search"
              style={{ boxShadow: "none", borderRadius: "10px" }}
            />
          </div>
          <div>
            <p
              className={"filterbtn " + (filterOpen && "pclicked")}
              style={{ cursor: "pointer" }}
              onClick={() => setFilterOpen(!filterOpen)}
              data-bs-auto-close="outside"
            >
              Filter <KeyboardArrowDownOutlinedIcon />
            </p>
            <ul className={"options " + (filterOpen && "displayOptions")}>
              {/* <hr></hr> */}
              <li>Status</li>
              {status_list.map((name, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input
                          disabled={index !== 0 && props.checkedState[0]}
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          checked={props.checkedState[index]}
                          onChange={() => onFilterChange(index)}
                        />
                        <label
                          htmlFor={`custom-checkbox-${index}`}
                          style={{ marginLeft: "10px" }}
                        >
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
              <hr />
              <li>Level</li>
              {level_list.map((name, index) => {
                return (
                  <li key={index + 4}>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index + 4}`}
                          name={name}
                          value={name}
                          checked={props.checkedState[index + 4]}
                          onChange={() => onFilterChange(index + 4)}
                        />
                        <label
                          htmlFor={`custom-checkbox-${index + 4}`}
                          style={{ marginLeft: "10px" }}
                        >
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="hackathons">
        {props.searchedData ? (
          props.searchedData.map((hackathon) => {
            return (
              <div className="hackathon_card" key={hackathon.id}>
                <p style={{ display: "none" }}>
                  {
                    (hacks_time =
                      now.unix() - dayjs(hackathon.start).unix() < 0
                        ? 1
                        : now.unix() - dayjs(hackathon.end).unix() < 0
                        ? 0
                        : -1)
                  }
                </p>
                <div className="card_image">
                  <img src={require(`${hackathon.img}`)} alt="" />
                </div>
                <div className="timeline">
                  <p
                    className={
                      "when active " + (hacks_time !== 0 ? "none" : "")
                    }
                  >
                    Active
                  </p>
                  <p
                    className={
                      "when upcoming " + (hacks_time !== 1 ? "none" : "")
                    }
                  >
                    Upcoming
                  </p>
                  <p
                    className={"when past " + (hacks_time !== -1 ? "none" : "")}
                  >
                    Past
                  </p>
                  <p></p>
                </div>

                <div className="hackathon_title">{hackathon.title}</div>
                <div className="timeline">
                  <p className="when date_time">
                    {hacks_time === 0
                      ? "Ends in"
                      : hacks_time === 1
                      ? "Starts in"
                      : "Ended On"}
                  </p>
                </div>
                <div className="timeline">
                  <p className="when show">
                    {hacks_time === 0
                      ? toHHMMSS(dayjs(hackathon.end).unix() - now.unix())
                      : hacks_time === 1
                      ? toHHMMSS(dayjs(hackathon.start).unix() - now.unix())
                      : hackathon.end}
                  </p>
                </div>
                <div
                  className={hacks_time === -1 ? "none" : ""}
                  style={{ fontSize: "10px", textAlign: "center" }}
                >
                  Days {"  "} Hours {"  "} Mins
                </div>
                <button
                  className="participate_btn"
                  onClick={() => navigateChallenge(hackathon)}
                >
                  <span style={{ marginRight: "2px" }}>
                    <TaskAltOutlinedIcon />{" "}
                  </span>
                  Participate Now
                </button>
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: "40px", color: "white" }}>No Matches Found</p>
        )}
      </div>
    </div>
  );
}
