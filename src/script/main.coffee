getWorksXML = ->

    $.ajax
        type: "GET"
        url: "works.xml"
        dataType: "xml"
        success: parseXml

parseXml = (data) ->

    $(data).find("project").each ->
        pCat = "<h4>#{$(this).find("category").text()}</h4>"
        pTitle = "<h2>#{$(this).find("title").text()}</h2>"
        pImage = "<img src='#{$(this).find("image").text()}'/>"
        pBlurb = "<p>#{$(this).find("blurb").text()}</p>"
        pLink = "<a href='#{$(this).find("link").text()}' target='_blank'>"

        projectHtml = "<div class='project'>" + pCat + pTitle + pBlurb + pLink + pImage + "</a></div>"
        $("#content").append projectHtml

randomizeAboutPic = ->

    randomNumber = Math.floor(Math.random() * 4) + 1
    $("#about").css('background-image', "url(images/BobbyHead#{randomNumber}.png)")

randomizeHeaderPic = ->
    randomNumber = Math.floor(Math.random() * 4) + 1
    $("#header").css('background-image', "url(images/bg-head#{randomNumber}.png)")

init = ->
    setTimeout (-> window.scrollTo(0, 1); return), 100
    getWorksXML()
    randomizeAboutPic()
    randomizeHeaderPic()

$(document).ready init()
