import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import RecommendIcon from '@mui/icons-material/Recommend';
import "./home";
import axios from "axios";

const Carousel = ({ listOfEvents, setListOfEvents, likedEvents, setLikedEvents, displayCount, type }) => {
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
        const newIndex = currentIndex === 0 ? listOfEvents.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = currentIndex === listOfEvents.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Render items based on currentIndex and displayCount
    const renderItems = () => {
        let itemsToShow = [];
        if(listOfEvents.length === 0){
            return "";
        }
        else if (listOfEvents.length < displayCount){
            displayCount = listOfEvents.length;
        }

        for (let i = 0; i < displayCount; i++) {
            let index = (currentIndex + i) % listOfEvents.length; // Wrap around if index exceeds items length
            let item = listOfEvents[index];
            itemsToShow.push(
                <div key={index} className="event">
                    <div className="title">{item.title}</div>
                    <div className="footer">@{item.username}
                        <div className="likeButton">
                            <RecommendIcon onClick={() => {
                                likeEvent(item.id);
                            }} 
                                className={likedEvents.includes(item.id) ? "unlike" : "like"}
                            />
                            <label> {item.Likes.length} </label>
                        </div>
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
