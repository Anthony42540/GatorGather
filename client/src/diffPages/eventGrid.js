import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendIcon from '@mui/icons-material/Recommend';
import "./home";

const EventGrid = ({ listOfEvents, setListOfEvents, likedEvents, setLikedEvents, type }) => {

    let navigate = useNavigate();

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
    const maxNum = 9999999999999;
    const compFunc = (eventA, eventB) => {
        return (eventA.dateTime ? new Date(eventA.dateTime) : maxNum) - (eventB.dateTime ? new Date(eventB.dateTime) : maxNum);
    }
    const filteredEvents = listOfEvents.sort(compFunc).filter(event => event.categoryTag?.includes(type) || type === "all");

    if (filteredEvents.length === 0) {
        return (
            <div className="empty-grid">oops, no upcoming events match your search!</div>
        );
    }

    return (
    <div className="events-grid">{filteredEvents.map((value, index) => {
        return (
            <div className="grid-event">
                <div className="title">{value.title}</div>
                <div className="footer">
                    <div className="dateTime">{value.dateTime ? new Date(value.dateTime).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", hour:"numeric", minute:"numeric"}) : ""}</div>
                    <div className="username">@{value.username}</div>
                        <div className="likeButton">
                            <RecommendIcon onClick={() => {
                                likeEvent(value.id);
                            }} 
                             className={likedEvents.includes(value.id) ? "unlike" : "like"}
                            />
                            <label> {value.Likes.length} </label>
                        </div>
                </div>
                <div className="body" onClick={() => {navigate(`/event/${value.id}`)}}>{value.eventDescription}</div>
            </div>
        )})}
    </div>
    );
};

export default EventGrid;
