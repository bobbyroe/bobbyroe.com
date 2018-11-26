import React from "react";

const projects = [{
        category: "JavaScript",
        title: "Brerzerk",
        link: "http://bobbyroe.com/github/brerzerk/",
        keywords: "Games, JavaScript",
        blurb: "The 1980 arcade classic remade with Pixi.js"
    }, {
        category: "WebGL",
        title: "About WebGL",
        link: "http://bobbyroe.com/about-webgl",
        keywords: "webgl, presentation",
        blurb: "Here is an introductory presentation I gave on WebGL (without using any libraries!) see the video at vimeo.com/69136718"
    },
    {
        category: "WebGL",
        title: "Quadtree Visualization",
        link: "http://bobbyroe.com/github/Quadtree/",
        keywords: "data_viz",
        blurb: "An experiment with an optimisation system for a bunch of moving things (particles)"
    },
    {
        category: "iOS Development",
        title: "TapSynth",
        link: "http://bobbyroe.com/tapsynth",
        keywords: "mobile",
        blurb: " I built an iOS App from concept to App store in 2 months. TapSynth puts an exclamation mark on a year and a half of Objective-C study. Site design by Danielle Primiceri."
    }, {
        category: "Front End Development",
        title: "Introduction to Backbone.js",
        link: "http://www.slideshare.net/bobbyroe/backbonejs-an-introduction-14284042",
        keywords: "backbone, presentation",
        blurb: "A presentation at UPenn; showing off the power of Backbone.js"
    }, {
        category: "Visual Effects",
        title: "CG Effects Reel",
        link: "http://vimeo.com/15575038",
        keywords: "3D",
        blurb: "My visual effects reel, including personal and commercial works from the past 8 years. Software skills include Maya, After Effects and Real Flow."
    }, {
        category: "Animation",
        title: "Pasta Sauce for Cats",
        link: "http://youtu.be/XPNz_FB7rM8",
        keywords: "3D",
        blurb: "I wrote, designed and animated this piece. Lovingly dedicated to Squeegee. Made with Maya, Shake &amp; Photoshop."
}];

function WorkItem (props) {

    const { title, category, blurb } = props.project;

    return (
    // item.link
        <div className='project' id={props.i}>
            <h2>{ title }</h2>
            <h4>{ category }</h4>
            <p>{ blurb }</p>
        </div>
    );
}

function MyWork (props) {

    return (
        <div id="content">
            {projects.map((proj, i) => <WorkItem project={proj} key={i} i={i} /> )}
        </div>
    );
}

export default MyWork;