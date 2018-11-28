
var d = document;
var links = [];


function getProjectsJSON () {
    $.ajax({
        type: "GET",
        url: "_src/projects.json",
        dataType: "json",
        success: init
    });
}

function parseJSON (data) {
    var pBlurb, pCat, pImage, pLink, pTitle, projectHtml;

    // stoke projects
    // *TODO* create a template for this
    data.projects.forEach( function (item, i) {
        links.push(item.link);
        pCat = "<h4>" + item.category + "</h4>";
        pTitle = "<h2>" + item.title + "</h2>";
        pImage = "<img src='" + item.image + "'/>";
        pBlurb = "<p>" + item.blurb + "</p>";
        pLink = "<a href='" + item.link + "' target='_blank'>";
        projectHtml = "<div class='project' id='" + i + "'> " +
            pTitle + " " + pCat + " " + pBlurb + "</div>";
        $("#content").append(projectHtml);
    });
}

function init (data) {
    parseJSON(data);
    setTimeout( function () { window.scrollTo(0, 1); }, 100);
    setTimeout( scrollILike, 1000);
    setTimeout( scrollILike, 4000);
    setTimeout( scrollILike, 8000);
    setTimeout( scrollILike, 12000);
}

function onMouseOver (evt) {
    if (evt.target.classList.contains('project')) {
        evt.target.classList.add('hot');
    }
}

function onMouseOut (evt) {
    if (evt.target.classList.contains('project')) {
        evt.target.classList.remove('hot');
    }
}

function onClick (evt) {
    if (evt.target.classList.contains('project')) {
        window.location = links[+evt.target.id];
    }
    if (evt.target.classList.contains('thing')) {
        window.location = stuff[+evt.target.id].link;
    }
}

$(d).ready(getProjectsJSON());

d.body.addEventListener('mouseover', onMouseOver);

d.body.addEventListener('mouseout', onMouseOut);

d.body.addEventListener('click', onClick);

