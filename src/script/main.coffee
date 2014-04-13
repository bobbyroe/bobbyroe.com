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

        projectHtml = "<div class='project'> #{pCat} #{pTitle} #{pBlurb} #{pLink} #{pImage}</a></div>"
        $("#content").append projectHtml

randomizeAboutPic = ->

    random_number = Math.floor(Math.random() * 5)
    $("#about").css('background-image', "url(images/BobbyHead#{random_number}.png)")

randomizeHeaderPic = ->
    random_number = Math.floor(Math.random() * 5)
    $("#header").css('background-image', "url(images/bg-head#{random_number}.png)")

randomizeAboutQuote = ->
    quotes = ["He also enjoys Aikido, Jaco Pastorius & trips to Iceland.",
              "He also enjoys biking, Igor Stravinsky & travel to Thailand.",
              "He also enjoys bass guitar, kale salads & exploring Bermuda.",
              "He also enjoys jazz harmonies, mojitos & trips to Hawaii.",
              "He also enjoys Paul Klee, Matrix Math & touring the Czech Republic."]
    random_number = Math.floor(Math.random() * 5)
    $(".quote").text(quotes[random_number])

init = ->
    setTimeout (-> window.scrollTo(0, 1); return), 100
    getWorksXML()
    randomizeAboutPic()
    randomizeHeaderPic()
    randomizeAboutQuote()

$(document).ready init()
