import React from "react";

function Nav (props) {

    return (
        <div id="nav">
            <ul>
                <li id="home"><a href="#">Selected Work</a></li>
                <li><a href="http://github.com/bobbyroe">Github</a></li>
                <li><a href="https://www.linkedin.com/in/bobbyroe">LinkedIn</a></li>
                <li><a href="mailto:br@bobbyroe.com">email</a></li>
            </ul>
        </div>
    );
}

export default Nav;