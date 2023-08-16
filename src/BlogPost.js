import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PostForm from "./PostForm";
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetailsFromAPI, deletePostFromAPI, sendNewCommentToAPI, deleteCommentFromAPI, sendVoteToAPI } from "./actionCreators";


function BlogPost() {

  const dispatch = useDispatch();
  const history = useHistory();

  const INITIAL_STATE = { text: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const postId = Number(useParams().postId);
  const post = useSelector(store => store.posts[postId]);

  useEffect(function loadPostWhenPostOrIdChanges() {
    async function getPost() {
      dispatch(getPostDetailsFromAPI(postId));
    }
    if (!post) {
      getPost();
    }    
  }, [dispatch, postId, post]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
        ...fData,
        [name]: value
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(sendNewCommentToAPI(postId, formData));
    setFormData(INITIAL_STATE);
  };

  const [isEdit, setIsEdit] = useState(false);
  
  const saveEdit = () => setIsEdit(false);

  const removeComment = commentId => {
    dispatch(deleteCommentFromAPI(postId, commentId));
    setFormData(INITIAL_STATE);
  }

  const removePost = id => {
    dispatch(deletePostFromAPI(id));
    history.push("/");
  };

  if (!post) return <p>Loading</p>;
  const { id, title, description, body, votes, comments } = post;

  const upVote = () => dispatch(sendVoteToAPI(postId, "up"));
  const downVote = () => dispatch(sendVoteToAPI(postId, "down"));

  return (
    isEdit
    ? <PostForm postEdit={{ postId, targetBlogPost: post, saveEdit }} />
    : <section>
        <h2>{ title }</h2>
        <i>{ description }</i>
        <small>{ votes } votes</small><button onClick={ upVote }> + </button><button onClick={ downVote }> - </button>
        <p>{ body }</p>
        <button onClick={() => setIsEdit(true)}>Edit</button>
        <button onClick={() => removePost(id)}>Delete</button>
        <div>
          <h4>Comments</h4>
          <ul>
            {comments.map(comment => {
                let { id, text } = comment;
                return (
                <>
                  <li key={id}>{ text }</li>
                  <button onClick={() => removeComment(id)}> X </button>
                </>
                );
            })}
          </ul>
          <form onSubmit={handleSubmit}>
            <p>
                <input
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="New Comment..."
                />
            </p>           
            <button type="submit">
                Add
            </button>
          </form>
        </div>
      </section>
  );
}

export default BlogPost;
