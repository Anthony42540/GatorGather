import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { context } from "../assists/context";

function Event() {
    let{ id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")
    const { authState } = useContext(context);
    const navigate = useNavigate();

    //fetch data based on ID using axios
    useEffect(() => {
      axios.get(`http://localhost:5000/events/byId/${id}`).then((response) => {
        setEventObject(response.data);
      });

      axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
        setComments(response.data);
      });
    }, []);

    const addComment = () => {
      axios.post("http://localhost:5000/comments/", 
        {commentBody: newComment, EventId: id,},
        {headers: {
          accessToken: localStorage.getItem("token")
        }}
      ).then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }
        else{
          const commentToAdd = {commentBody: newComment, username: response.data.username};
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
    }

    const deleteEvent = (id) => {
      axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then(() => {
        navigate('/');
      });
    }
    return (
        <div className='eventPage'>
          <div className='left'>
            <div className='eventInfo' id="individual">
              <div className="title">{eventObject.title}</div>
                <div className="footer">{eventObject.dateTime ? new Date(eventObject.dateTime).toLocaleDateString('en-us', { weekday:"long", day:"numeric", /*year:"numeric",*/ month:"short", hour:"numeric", minute:"numeric"}).replace(',','') : ""}</div>

                <div className="footer">@{eventObject.username} </div>
              <div class="flex-box-2">
                {authState.username === eventObject.username && <button onClick={() => {deleteEvent(eventObject.id)}}>Delete Event</button>}
              </div>
              <div className="body">{eventObject.eventDescription}</div>
            </div>
          </div>
          <div className='right'>
            <div className="addCommentContainer"> 
              <textarea type="text" placeholder="Type your comment here..." autoComplete="off" value={newComment} onChange={(event) => {setNewComment(event.target.value)}} />
              <button onClick={addComment}> <span class="arrowColor">&#8640;</span> </button>
            </div>
            <div className="commentsList">
              {comments.map((comment, key) => {
                return (
                  <div key={key} className="comment"> 
                    <label style={{color: 'blue'}}>
                      @{comment.username}:
                    </label>
                    <div> </div>
                    {comment.commentBody}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    )
}

export default Event;