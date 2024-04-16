import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Event() {
    let{ id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")

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
          accessToken: sessionStorage.getItem("token")
        }}
      ).then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }
        else{
          const commentToAdd = {commentBody: newComment};
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
    }

    return (
        <div className='eventPage'>
          <div className='left'>
            <div className='eventInfo' id="individual">
              <div className="title">{eventObject.title}</div>
              <div className="footer">@{eventObject.author} </div>
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
                return <div key={key} className="comment"> {comment.commentBody} </div>
              })}
            </div>
          </div>
        </div>
    )
}

export default Event;