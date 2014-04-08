function getWorksXML() {

    $.ajax({
        type: "GET",
        url: "works.xml",
        dataType: "xml",
        success: parseXml
    });
}

function parseXml(data) {

    $(data).find("project").each(function() {

        var pCat = "<h4>" + $(this).find("category").text() + "</h4>";
        var pTitle = "<h2>" + $(this).find("title").text() + "</h2>";
        var pImage = "<img src='" + $(this).find("image").text() + "'/>";
        var pBlurb = "<p>" + $(this).find("blurb").text() + "</p>";
        var pLink = "<a href='" + $(this).find("link").text() + "' target='_blank'>";

        var projectHtml = "<div class='project'>" + pCat + pTitle + pBlurb + pLink + pImage + "</a>" + "</div>";
        $("#content").append(projectHtml);
  });
}

function randomizeAboutPic() {

    var randomNumber = Math.floor(Math.random()*4) + 1;
    $("#about").css('background-image', 'url(images/BobbyHead' + randomNumber + '.png)');
}
function randomizeHeaderPic() {
    var randomNumber = Math.floor(Math.random()*4) + 1;
    $("#header").css('background-image', 'url(images/bg-head' + randomNumber + '.png)');
}
$(document).ready(function(){
    init();
 });
 
function init() {   
    setTimeout(function() { window.scrollTo(0,1); }, 100);
    getWorksXML();
    randomizeAboutPic();
    randomizeHeaderPic();
}




