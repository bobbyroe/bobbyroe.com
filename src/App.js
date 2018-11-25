import React, { Component } from "react";
import "./App.css";

class App extends Component {

    render () {

        return (
            <div id="wrapper">
                <div id="header">
                    <h2>BOBBY ROE</h2>
                </div>
                <div id="nav">
                    <ul>
                        <li id="home"><a href="#">Selected Work</a></li>
                        <li><a href="http://github.com/bobbyroe">Github</a></li>
                        <li><a href="https://www.linkedin.com/in/bobbyroe">LinkedIn</a></li>
                        <li><a href="mailto:br@bobbyroe.com">email</a></li>
                    </ul>
                </div>
                <div id="leader">
                    Hi, I'm a software engineer, with a strong focus on interactivity and 3D. Based in Seattle.
                    <span id="stuff-tainer">I like <span id="stuff" className="disabled">WebGL</span>.</span>
                </div>
                <div id="content">
                </div>

                <div id="about" name="about">
                    <p id="foot">&copy;2018 Bobby Roe Industries</p>
                </div>

                <div id="footer">
                </div>
            </div>
        );
    }
}

export default hot(module)(App);