import React from "react";
import { NavLink } from "react-router-dom";

function SiteHeader() {
  return (
    <div className="SiteHeader">
        <h1>
            Microblog
        </h1>
        <h3>
            Get in the Rithm of blogging!
        </h3>
        <p>
            <NavLink to="/">
                View Blog
            </NavLink>
            <b> or </b>
            <NavLink to="/new">
                Add a new post
            </NavLink>
        </p> 
    </div>
  );
}
export default SiteHeader;
