import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import RecommendIcon from '@mui/icons-material/Recommend';
import "./home";
import axios from "axios";

const Carousel = ({ listOfEvents, setListOfEvents, likedEvents, setLikedEvents, displayCount, type }) => {
    const [topEventsList, setTopEventsList] = useState([]);
    
    useEffect(() => {
        const sortEvents = listOfEvents.toSorted((a, b) => b.Likes.length - a.Likes.length);
        const top10Events = sortEvents.slice(0, Math.min(10, sortEvents.length));
        setTopEventsList(top10Events);
    }, [listOfEvents]);

    const likeEvent = (eventId) => {
        axios.post("http://localhost:5000/likes", 
            { EventId: eventId }, 
            { headers: {accessToken: localStorage.getItem("token")}}
            ).then((response) => {
            setListOfEvents(listOfEvents.map((event) => {
                if (event.id === eventId) {
                    if (response.data.liked) {
                        return {...event, Likes: [...event.Likes, 0]};
                    }
                    else {
                        const likeArr = event.Likes;
                        likeArr.pop();
                        return {...event, Likes: likeArr};
                    }
                }
                else {
                    return event;
                }
            }))
        });
    
        if (likedEvents.includes(eventId)) {
            setLikedEvents(likedEvents.filter((id) => {
                return id !== eventId;
            }))
        }
        else {
            setLikedEvents([...likedEvents, eventId]);
        }
    };
    
    const [currentIndex, setCurrentIndex] = useState(0);
    let navigate = useNavigate();

    const goToPrevSlide = () => {
        const newIndex = currentIndex === 0 ? topEventsList.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = currentIndex === topEventsList.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const renderItems = () => {
        let itemsToShow = [];
        if(topEventsList.length === 0){
            return "";
        }
        else if (topEventsList.length < displayCount){
            displayCount = topEventsList.length;
        }

        for (let i = 0; i < displayCount; i++) {
            let index = (currentIndex + i) % topEventsList.length; // Wrap around if index exceeds items length
            let item = topEventsList[index];
            itemsToShow.push(
                <div key={index} className="event">
                    <div className="title">{item.title}</div>
                    <div className="dateTime">{item.dateTime ? new Date(item.dateTime).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", hour:"numeric", minute:"numeric"}) : ""}</div>
                    <div className="footer">@{item.username}</div>
                    <div className="likeButton">
                        <RecommendIcon onClick={() => {
                            likeEvent(item.id);
                        }} 
                            className={likedEvents.includes(item.id) ? "unlike" : "like"}
                        />
                        <label> {item.Likes.length} </label>
                    </div>
                    <div className="body" onClick={() => {navigate(`/event/${item.id}`)}}>{item.eventDescription}</div>
                </div>
            );
        }
        return itemsToShow;
    };

    return (
        <div>
            <div className="carouselButtons">
                <h1>popular events</h1>
                <button onClick={goToPrevSlide}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <button onClick={goToNextSlide}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>
            <div className="carousel">
                {renderItems()}
            </div>
        </div>
    );
};

export default Carousel;
