import { /** CREATE, UPDATE, DELETE, */ LOAD_TITLES, LOAD_POST_DETAILS, ADD_NEW_POST, DELETE_POST, UPDATE_POST, ADD_NEW_COMMENT, DELETE_COMMENT, VOTE } from "./actionTypes";
import { cloneDeep } from 'lodash';

const INITIAL_STATE = { posts: {}, titles: [] };

// posts = { postId: { id, title, description, body, comments, votes }, ...}
// titles = [ { id, title, description, votes }, ...]

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        /** Pre-Thunk Reducer Cases */
        // case CREATE:
        //     const { postId, post } = action;
        //     return { ...state, posts: { ...state.posts, [postId]: post }};
        // case UPDATE:
        //     const { updateId, updateContents } = action;
        //     return { ...state, posts: { ...state.posts, [updateId]: updateContents }};
        // case DELETE:
        //     const { deleteId } = action;
        //     let clone = { ...state.posts };
        //     delete clone[deleteId];
        //     return { ...state, posts: clone };

        /** Redux-Thunk Reducer Cases */
        case LOAD_TITLES:
            return { ...state, titles: [ ...action.titles ]};
        case LOAD_POST_DETAILS:
            return { ...state, posts: { ...state.posts, [action.post.id]: action.post }};
        case ADD_NEW_POST:
            let { id, title, description, votes } = action.post;
            return { ...state, posts: { ...state.posts, [id]: action.post },
                    titles: [ ...state.titles, { id, title, description, votes }]};
        case DELETE_POST:
            let filteredTitles = state.titles.filter(post => post.id !== action.id);
            let filteredPosts = { ...state.posts };
            delete filteredPosts[action.id];
            return { ...state, posts: filteredPosts, titles: filteredTitles };
        case UPDATE_POST:

            // lodash cloneDeep utility function helps create deep copies of state

            let updatedTitles = cloneDeep(state.titles);
            let updatedPosts = cloneDeep(state.posts);

            // update the post specified in titles array in state

            updatedTitles.forEach(post => {
                // if this is the post that was updated in the api, then update the title, description, and body in state
                if (post.id === action.id) {
                    post.title = action.post.title;
                    post.description = action.post.decription;
                    post.body = action.post.body;
                }
                // else leave the post info unchanged
            });

            // also update the post specified in posts object in state
            updatedPosts[action.id].title = action.post.title;
            updatedPosts[action.id].description = action.post.description;
            updatedPosts[action.id].body = action.post.body;

            return { ...state, posts: updatedPosts, titles: updatedTitles };
        case ADD_NEW_COMMENT:
            let updatedPost = cloneDeep(state.posts[action.postId]);
            updatedPost.comments.push(action.comment);
            return { ...state, posts: { ...state.posts, [action.postId]: updatedPost }};
        case DELETE_COMMENT:
            let targetPost = cloneDeep(state.posts[action.postId]);
            let updatedComments = targetPost.comments.filter(comment => comment.id !== action.commentId);
            targetPost.comments = updatedComments;
            return { ...state, posts: { ...state.posts, [action.postId]: targetPost }};
        case VOTE:
            let delta = (action.direction === "up") ? +1 : -1;
            let votedTitles = cloneDeep(state.titles);
            votedTitles.forEach(post => {
                if (post.id === action.postId) {
                    post.votes = post.votes + delta;
                }
            });
            return { ...state, posts: { ...state.posts, [action.postId]: { ...state.posts[action.postId], votes: state.posts[action.postId].votes + delta }},
                        titles: votedTitles };
        default:
            return state;
    }
}

export default rootReducer;