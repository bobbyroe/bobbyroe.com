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

class Stuff extends React.Component {

    constructor (props) {
        super(props);
        this.el = React.createRef();
        this.timeout = null;
        this.stuff = [];

        // bind class methods
        this.scrollILike = this.scrollILike.bind(this);
        this.randomizeILikeStuff = this.randomizeILikeStuff.bind(this);
        this.likesAnimLoop = this.likesAnimLoop.bind(this);
    }

    componentDidMount () {
        this.stuff = stuff.slice();
        this.stuff.forEach( (thing, i) => {
            let cur_thing = this.el.current.children[i];
            let rect = cur_thing.getBoundingClientRect();
            thing.left = rect.left;
            thing.width = rect.width;
        });

        this.timeout = setTimeout(this.scrollILike, 1000);
        this.timeout = setTimeout(this.scrollILike, 4000);
        this.timeout = setTimeout(this.scrollILike, 8000);
        this.timeout = setTimeout(this.scrollILike, 12000);
    }

    scrollILike () {
        this.randomizeILikeStuff();
        this.el.current.setAttribute("style", `width: ${current_thing.width}px`);
        this.el.current.goalScrollLeft = current_thing.left - this.stuff[0].left;
        this.el.current.cur_scroll_left = this.el.current.scrollLeft;
        this.likesAnimLoop();
    }

    randomizeILikeStuff () {
        random_stuff_index = Math.floor(Math.random() * this.stuff.length);
        current_thing = this.stuff[random_stuff_index];
    }

    likesAnimLoop () {
        if (Math.abs(this.el.current.scrollLeft - this.el.current.goalScrollLeft) < 1.0) {
            this.el.current.scrollLeft = this.el.current.goalScrollLeft;
        } else {
            this.el.current.cur_scroll_left -= (this.el.current.cur_scroll_left -
                this.el.current.goalScrollLeft) * 0.1;
            this.el.current.scrollLeft = this.el.current.cur_scroll_left;
            requestAnimationFrame(this.likesAnimLoop);
        }
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