import React from "react"

let random_stuff_index = -1;
let current_thing = null;
const stuff = [{
        link: "http://bobbyroe.com/about-webgl",
        name: "WebGL"
    }, {
        link: "http://bobbyroe.com/github/aikido-techniques/",
        name: "Data Viz"
    }, {
        link: "http://bobbyroe.com/github/Quadtree/",
        name: "JavaScript"
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

function randomizeILikeStuff (component) {

    random_stuff_index = Math.floor(Math.random() * component.stuff.length);
    current_thing = component.stuff[random_stuff_index];
}

function scrollILike (component) {

    randomizeILikeStuff(component);
    component.el.current.setAttribute("style", `width: ${current_thing.width}px`);
    component.el.current.goalScrollLeft = current_thing.left - component.stuff[0].left;
    component.el.current.cur_scroll_left = component.el.current.scrollLeft;
    likesAnimLoop();
}

function likesAnimLoop() {

    if (Math.abs(component.el.current.scrollLeft - component.el.current.goalScrollLeft) < 1.0) {
        component.el.current.scrollLeft = component.el.current.goalScrollLeft;
    } else {
        component.el.current.cur_scroll_left -= (component.el.current.cur_scroll_left -
            component.el.current.goalScrollLeft) * 0.1;
        component.el.current.scrollLeft = component.el.current.cur_scroll_left;
        requestAnimationFrame(likesAnimLoop);
    }
}

class Stuff extends React.Component {

    constructor (props) {

        super(props);
        this.el = React.createRef();
        this.timeout = null;
        this.stuff = [];
    }

    componentDidMount () {

        this.stuff = stuff.slice();
        this.stuff.forEach( (thing, i) => {

            let cur_thing = this.el.current.children[i];
            let rect = cur_thing.getBoundingClientRect();
            thing.left = rect.left;
            thing.width = rect.width;
        });

        this.timeout = setTimeout(scrollILike, 1000, this);
    }

    render () {

        return (
            <span id="stuff" className="disabled" ref={ this.el }>
                {stuff.map((thing, i) => <a className="thing" key={i} i={i} href={ thing.link }>
                    {thing.name.replace(/\s/g, "\u00a0") }
                    </a>)}
            </span>
        );
    }
}

function AboutMe (props) {

    return (
        <div id="leader">
            Hi, I'm a software engineer, with a strong focus on interactivity and 3D. Based in Seattle.
                <span id="stuff-tainer"> I like <Stuff />.</span>
        </div>
    );
}

export default AboutMe