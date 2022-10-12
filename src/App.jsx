import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import Main from "./components/main/Main";
import WhyAI from "./components/WhyAI/Whyai";
import Challenges from "./components/challenges/Challenges";
import "bootstrap/dist/css/bootstrap.min.css";
import HackathonDetails from "./pages/hackathonDetails/HackathonDetails";
import CreateChallenge from "./pages/createChallenge/CreateChallenge";
import dayjs from "dayjs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// npx json-server --watch data/hackathons_list.json --port 8000
function App() {  
  const [hackathons_list, setHackathons_list] = useState(null);
  const [filterSearch, setFilterSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  let listing = hackathons_list;
  const fetcher = () => {
    fetch("http://localhost:8000/hackathons_list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {        
        setHackathons_list(data);
        setSearchedData(data);
      });
  };
  fetcher();
  useEffect(() => {
    listing =
      listing &&
      listing.filter((filterlist) => {
        return (
          filterlist.title.substring(0, filterSearch.length).toLowerCase() ===
          filterSearch.toLowerCase()
        );
      });
    setSearchedData(listing);
  }, [filterSearch]);
  useEffect(() => {
    const list_checkbox = [
      "All",
      "Active",
      "Upcoming",
      "Past",
      "Easy",
      "Medium",
      "Hard",
    ];
    const checker_list = [];
    const checker_list2 = [];
    checkedState.map((ok, index) => {
      if (index < 4 && ok) checker_list.push(list_checkbox[index]);
      if (index > 3 && ok) checker_list2.push(list_checkbox[index]);
      return null;
    });

    if (checker_list2.length === 0) {
      if (checker_list.length === 0 || checker_list.includes("All")) {
        listing =
          hackathons_list > 0 &&
          hackathons_list.filter((filterlist) => {
            return (
              filterlist.title
                .substring(0, filterSearch.length)
                .toLowerCase() === filterSearch.toLowerCase()
            );
          });
      } else {
        listing =
          hackathons_list &&
          hackathons_list.filter((filterlist) => {
            return (
              filterlist.title
                .substring(0, filterSearch.length)
                .toLowerCase() === filterSearch.toLowerCase() &&
              checker_list.includes(
                dayjs().unix() - dayjs(filterlist.start).unix() < 0
                  ? "Upcoming"
                  : dayjs().unix() - dayjs(filterlist.end).unix() < 0
                  ? "Active"
                  : "Past"
              )
            );
          });
      }
    } else {
      if (checker_list.length === 0 || checker_list.includes("All")) {
        listing =
          hackathons_list &&
          hackathons_list.filter((filterlist) => {
            return (
              filterlist.title
                .substring(0, filterSearch.length)
                .toLowerCase() === filterSearch.toLowerCase() &&
              checker_list2.includes(filterlist.difficulty)
            );
          });
      } else {
        listing =
          hackathons_list &&
          hackathons_list.filter((filterlist) => {
            return (
              filterlist.title
                .substring(0, filterSearch.length)
                .toLowerCase() === filterSearch.toLowerCase() &&
              checker_list2.includes(filterlist.difficulty) &&
              checker_list.includes(
                dayjs().unix() - dayjs(filterlist.start).unix() < 0
                  ? "Upcoming"
                  : dayjs().unix() - dayjs(filterlist.end).unix() < 0
                  ? "Active"
                  : "Past"
              )
            );
          });
      }
    }
    setSearchedData(listing);
  }, [checkedState]);

  const setSearch = (searchedValue) => {
    setFilterSearch(searchedValue);
  };

  const setCheckState = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };  
  return (
    <Router>
      <div className="base">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Navbar /> <Main /> <WhyAI />{" "}
                <Challenges
                  setSearch={setSearch}
                  searchedData={searchedData}
                  setCheckState={setCheckState}
                  checkedState={checkedState}
                />
              </>
            }
          />
          <Route path="/Createchallenge:id" element={<CreateChallenge />} />
          <Route
            path="/Createchallenge/:id"
            element={<CreateChallenge/>}
          />
          <Route
            path="/HackathonDetails/:id"
            element={<HackathonDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
