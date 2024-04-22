import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendIcon from '@mui/icons-material/Recommend';
import "./home";

const EventGrid = ({ listOfEvents, setListOfEvents, type}) => {

    let navigate = useNavigate();

const likePost = (eventId) => {
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
};

    return (
    <div className="events-grid">{listOfEvents.filter(event=>event.categoryTag?.includes(type) || type==="all").map((value, index) => {
        return (
            <div className="grid-event">
                <div className="title">{value.title}</div>
                <div className="body" onClick={() => {navigate(`/event/${value.id}`)}}>{value.eventDescription}</div>
                <div className="footer">
                    <div className="username">posted by: {value.username}</div>
                        <div className="likeButton">
                            <RecommendIcon onClick={() => {
                                likePost(value.id);
                            }} 
                            // className={}
                            />
                            <label> {value.Likes.length} </label>
                        </div>
                </div>
            </div>
        )})}
    </div>
    );
};

export default EventGrid;
