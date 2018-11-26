import React from "react"

var stuff = [];
var random_stuff_index = -1;
var current_thing = null;
// var stuff_el = d.querySelector('#stuff');

function randomizeILikeStuff() {
    random_stuff_index = Math.floor(Math.random() * stuff.length);
    current_thing = stuff[random_stuff_index];
}

function scrollILike() {
    randomizeILikeStuff();
    stuff_el.setAttribute('style', "width: " + current_thing.width + "px");
    stuff_el.goalScrollLeft = current_thing.left - stuff[0].left;
    stuff_el.cur_scroll_left = stuff_el.scrollLeft;
    likesAnimLoop();
}

function likesAnimLoop() {
    if (Math.abs(stuff_el.scrollLeft - stuff_el.goalScrollLeft) < 1.0) {
        stuff_el.scrollLeft = stuff_el.goalScrollLeft;
    } else {
        stuff_el.cur_scroll_left -= (stuff_el.cur_scroll_left -
            stuff_el.goalScrollLeft) * 0.1;
        stuff_el.scrollLeft = stuff_el.cur_scroll_left;
        requestAnimationFrame(likesAnimLoop);
    }
}

const stuff = [{
        link: "http://bobbyroe.com/about-webgl",
        name: "WebGL"
    }, {
        link: "http://bobbyroe.com/github/aikido-techniques/",
        name: "Data Viz"
    }, {
        link: "http://bobbyroe.com/github/Quadtree/",
        name: "Javascript"
    }, {
        link: "http://bobbyroe.com/github/aikido-techniques/",
        name: "Aikido"
    }, {
        link: "http://bobbyroe.com/tapsynth",
        name: "Synthesizers"
    }, {
        link: "http://bobbyroe.com/github/Three-Experiments/xmas/",
        name: "Three.js"
    }, {
        link: "http://bobbyroe.com/github/brerzerk/",
        name: "Games"
}];

function AboutMe (props) {

    // // and stuff I like
    // var box, thing, thing_el;

    // stuff_el.innerHTML = '';
    // data.stuff.forEach(function (thing, i) {
    //     stuff.push(thing);
    //     thing_el = d.createElement('a');
    //     thing_el.className = 'thing';
    //     thing_el.innerHTML = thing.name.replace(/\s/g, '&nbsp;');
    //     thing_el.id = i;
    //     stuff_el.appendChild(thing_el);
    //     box = thing_el.getBoundingClientRect();
    //     thing.left = box.left;
    //     thing.width = box.width;
    // });
    // stuff_el.setAttribute('style', "width: " + stuff[0].width + "px");

    return (
        <div id="leader">
            Hi, I'm a software engineer, with a strong focus on interactivity and 3D. Based in Seattle.
                <span id="stuff-tainer"> I like <span id="stuff" className="disabled">WebGL</span>.</span>
        </div>
    );
}

export default AboutMe