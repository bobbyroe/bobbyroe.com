links = []
getProjectsJSON = ->
    $.ajax
        type: "GET"
        url: "projects.json"
        dataType: "json"
        success: parseJSON

parseJSON = (data) ->
    for item, i in data.projects
        # console.log item, i
        links.push item.link
        pCat = "<h4>#{item.category}</h4>"
        pTitle = "<h2>#{item.title}</h2>"
        pImage = "<img src='#{item.image}'/>"
        pBlurb = "<p>#{item.blurb}</p>"
        pLink = "<a href='#{item.link}' target='_blank'>"

        projectHtml = "<div class='project' id='#{i}'> #{pTitle} #{pCat} #{pBlurb}</div>"
        $("#content").append projectHtml

randomizeAboutPic = ->
    random_number = Math.floor(Math.random() * 3) + 2
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
    getProjectsJSON()
    randomizeAboutPic()
    # randomizeHeaderPic()
    randomizeAboutQuote()

onMouseOver = (evt) ->
    if evt.target.classList.contains 'project'
        evt.target.classList.add 'hot'

onMouseOut = (evt) ->
    if evt.target.classList.contains 'project'
        evt.target.classList.remove 'hot'

onClick = (evt) ->
    if evt.target.classList.contains 'project'
        window.location = links[+evt.target.id]

$(document).ready init()
document.body.addEventListener 'mouseover', onMouseOver
document.body.addEventListener 'mouseout', onMouseOut
document.body.addEventListener 'click', onClick
