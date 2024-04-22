import React from "react";
import axios from "axios";
import Select from 'react-select';
import { useEffect, useState } from "react";
import Carousel from "./carousel";
import EventGrid from "./eventGrid";
import { categoryTagOptions } from "./categoryTags";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [likedEvents, setLikedEvents] = useState([]);
    const [type, setType] = useState("all");
    const [displayCount, setDisplayCount] = useState();

    useEffect(() => {
      axios.get("http://localhost:5000/events", { 
        headers: {accessToken: localStorage.getItem("token")},
        })
        .then((response) => {
          setListOfEvents(response.data.listOfEvents);
          setLikedEvents(response.data.likedEvents.map((like) => {
            return like.EventId;
          }))
        });
      }, []);

    useEffect(() => {
      
      const calcDisplayCount = () => {
        const eventWidth = 300;
        const screenWidth = window.innerWidth;
        return Math.floor((screenWidth - 100) / eventWidth);
      };

      const initialDisplayCount = calcDisplayCount();
      setDisplayCount(initialDisplayCount);

      const handleResize = () => {
          const newDisplayCount = calcDisplayCount();
          setDisplayCount(newDisplayCount);
      };
    
      window.addEventListener("resize", handleResize);

      return () => {
          window.removeEventListener("resize", handleResize);
      };
    }, []);

    const handleTypeChange = (filter) => {
      if (filter === null) {
          setType("all");
      } else {
          setType(filter.label);
      }
    };

    return (
      <div>
          <Carousel listOfEvents={listOfEvents} displayCount={displayCount}  className="carousel" setListOfEvents={setListOfEvents} likedEvents={likedEvents} setLikedEvents={setLikedEvents}/>
          <div className="grid-area">
            <div className="filterbar">
                <span className="prompt">I'm looking for</span>
                <Select
                  name="type"
                  className="filterDropDown"
                  onChange={handleTypeChange}
                  options={categoryTagOptions}
                  isClearable={true}
                  value={categoryTagOptions.find(option => option.label === type)}
                >
                </Select>
            </div>
            <div >
              <EventGrid listOfEvents={listOfEvents} setListOfEvents={setListOfEvents} likedEvents={likedEvents} setLikedEvents={setLikedEvents} type={type}/>
            </div>
          </div>
          
  
      </div>
    )
}

export default Home