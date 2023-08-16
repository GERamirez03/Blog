import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import PostForm from "./PostForm";
import BlogPost from "./BlogPost";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/new">
                <PostForm />
            </Route>
            <Route path="/:postId">
                <BlogPost />
            </Route>
        </Switch>
    );
}

export default Routes;