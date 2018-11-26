import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Nav from "./Nav";
import AboutMe from "./AboutMe";
import MyWork from "./MyWork";
import "./App.css";

class App extends Component {

    render () {

        return (
            <div id="wrapper">
                <div id="header">
                    <h2>BOBBY ROE</h2>
                </div>

                <Nav />
                <AboutMe />
                <MyWork />

                <div id="about" name="about">
                    <p id="foot">&copy;2018 Bobby Roe Industries</p>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);