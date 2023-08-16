import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sendNewPostToAPI, updatePostInAPI } from "./actionCreators";
import { useDispatch } from "react-redux";

function PostForm({ postEdit }) {

    const dispatch = useDispatch();

    const INITIAL_STATE = postEdit
        ? { ...postEdit.targetBlogPost }
        : {
            title: "",
            description: "",
            body: ""
          };
          
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(sendNewPostToAPI(formData));
        setFormData(INITIAL_STATE);
        history.push("/");
    };

    const handleEdit = evt => {
        evt.preventDefault();
        const { postId, saveEdit, } = postEdit;
        dispatch(updatePostInAPI(postId, formData));
        setFormData(INITIAL_STATE);
        saveEdit();
    }

    return (
    <>
        <h2>
            New Post
        </h2>      
        <form onSubmit={postEdit ? handleEdit : handleSubmit}>
            <p>
                <label htmlFor="title">
                    Title:
                </label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </p>           
            <p>
                <label htmlFor="description">
                    Description:
                </label>
                <input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </p>
            <p>
                <label htmlFor="body">
                    Body:
                </label>
                <input
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                />
            </p>
            <button type="submit">
                Save
            </button>
            <button onClick={() => history.push("/")}>
                Cancel
            </button>
        </form>      
    </>
    );
};

export default PostForm;
