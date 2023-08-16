import { /** CREATE, UPDATE, DELETE, */ LOAD_TITLES, LOAD_POST_DETAILS, ADD_NEW_POST, DELETE_POST, UPDATE_POST, ADD_NEW_COMMENT, DELETE_COMMENT, VOTE } from "./actionTypes";
// import { v4 } from 'uuid';
import axios from 'axios';

const BASE_API_URL = "http://localhost:5000";

/** Pre-Thunk Action Creators */

// export function createPost(post) {
//     post.comments = [];
//     return {
//         type: CREATE,
//         postId: v4(),
//         post
//     };
// }

// export function updatePost(updateId, updateContents) {
//     return {
//         type: UPDATE,
//         updateId,
//         updateContents
//     };
// }

// export function deletePost(deleteId) {
//     return {
//         type: DELETE,
//         deleteId
//     };
// }

/** Thunk Action Creators */

// Pair of functions which fetch basic information about all posts from API

export function getTitlesFromAPI() {
    return async function(dispatch) {
        let res = await axios.get(`${BASE_API_URL}/api/posts`);
        dispatch(gotTitles(res.data));
    };
}

function gotTitles(titles) {
    return { type: LOAD_TITLES, titles };
}

// Pair of functions which fetch a specific post's detailed information from API

export function getPostDetailsFromAPI(id) {
    return async function(dispatch) {
        let res = await axios.get(`${BASE_API_URL}/api/posts/${id}`);
        console.log(res.data);
        dispatch(gotPostDetails(res.data));
    };
}

function gotPostDetails(post) {
    return { type: LOAD_POST_DETAILS, /** loadId: v4(), */ post };
}

// Pair of functions which post a new blogpost to the API

export function sendNewPostToAPI(newPost) {
    return async function(dispatch) {
        let res = await axios.post(`${BASE_API_URL}/api/posts`, newPost);
        dispatch(sentNewPost(res.data));
    };
}

function sentNewPost(post) {
    post.comments = [];
    return { type: ADD_NEW_POST, post };
}

// Pair of functions which delete a specific post from the API

export function deletePostFromAPI(id) {
    return async function(dispatch) {
        let res = await axios.delete(`${BASE_API_URL}/api/posts/${id}`);
        dispatch(deletedPost(id, res.data));
    };
}

function deletedPost(id, data) {
    console.log(id, data);
    return { type: DELETE_POST, id };
}

// Pair of functions which update a specific post's contents in API

export function updatePostInAPI(id, postData) {
    return async function(dispatch) {
        let res = await axios.put(`${BASE_API_URL}/api/posts/${id}`, postData);
        dispatch(updatedPost(id, res.data));
    };
}

function updatedPost(id, post) {
    return { type: UPDATE_POST, id, post };
}

// Pair of functions which post a new comment to the API

export function sendNewCommentToAPI(postId, commentData) {
    return async function(dispatch) {
        let res = await axios.post(`${BASE_API_URL}/api/posts/${postId}/comments`, commentData); // CHECK ON COMMENTDATA WIRING!
        dispatch(sentNewComment(postId, res.data));
    };
}

function sentNewComment(postId, comment) {
    return { type: ADD_NEW_COMMENT, postId, comment };
}

// Pair of functions which delete a comment from the API

export function deleteCommentFromAPI(postId, commentId) {
    return async function(dispatch) {
        let res = await axios.delete(`${BASE_API_URL}/api/posts/${postId}/comments/${commentId}`);
        dispatch(deletedComment(postId, commentId, res.data));
    }
}

function deletedComment(postId, commentId, resData) {
    console.log({ postId, commentId, resData });
    return { type: DELETE_COMMENT, postId, commentId };
}

// Pair of functions which send an upvote or downvote to the API

export function sendVoteToAPI(postId, direction) {
    return async function(dispatch) {
        let res = await axios.post(`${BASE_API_URL}/api/posts/${postId}/vote/${direction}`);
        dispatch(sentVote(postId, direction, res.data));
    };
}

function sentVote(postId, direction, resData) {
    console.log({ postId, direction, resData });
    return { type: VOTE, postId, direction };
}