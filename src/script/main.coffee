d = document
links = []
stuff = []
random_stuff_index = -1
current_thing = null
stuff_el = d.querySelector '#stuff'

getProjectsJSON = ->
    $.ajax
        type: "GET"
        url: "projects.json"
        dataType: "json"
        success: init

parseJSON = (data) ->

    # stoke projects

    for item, i in data.projects
        links.push item.link
        pCat = "<h4>#{item.category}</h4>"
        pTitle = "<h2>#{item.title}</h2>"
        pImage = "<img src='#{item.image}'/>"
        pBlurb = "<p>#{item.blurb}</p>"
        pLink = "<a href='#{item.link}' target='_blank'>"

        projectHtml = "<div class='project' id='#{i}'> #{pTitle} #{pCat} #{pBlurb}</div>"
        $("#content").append projectHtml

    # and stuff I like

    box = null
    stuff_el.innerHTML = ''
    for thing, i in data.stuff

        stuff.push thing
        thing_el = d.createElement 'a'
        thing_el.className = 'thing'
        thing_el.innerHTML = thing.name.replace /\s/g, '&nbsp;'
        thing_el.id = i
        stuff_el.appendChild thing_el
        box = thing_el.getBoundingClientRect()
        thing.left = box.left
        thing.width = box.width
    stuff_el.setAttribute 'style', "width: #{stuff[0].width}px"

randomizeILikeStuff = ->
    random_stuff_index = Math.floor(Math.random() * stuff.length)
    current_thing = stuff[random_stuff_index]
    console.log current_thing

scrollILike = ->
    randomizeILikeStuff()
    stuff_el.setAttribute 'style', "width: #{current_thing.width}px"
    stuff_el.goalScrollLeft = current_thing.left - stuff[0].left
    stuff_el.cur_scroll_left = stuff_el.scrollLeft
    likesAnimLoop()

likesAnimLoop = ->
    if Math.abs(stuff_el.scrollLeft - stuff_el.goalScrollLeft) < 1.1
        stuff_el.scrollLeft = stuff_el.goalScrollLeft 
    else
        stuff_el.cur_scroll_left -= (stuff_el.cur_scroll_left - stuff_el.goalScrollLeft) * 0.08
        stuff_el.scrollLeft = stuff_el.cur_scroll_left
        requestAnimationFrame likesAnimLoop

init = (data) ->
    parseJSON data
    setTimeout (-> window.scrollTo(0, 1)), 100

    setTimeout (-> scrollILike()), 1000
    setTimeout (-> scrollILike()), 4000
    setTimeout (-> scrollILike()), 8000
    setTimeout (-> scrollILike()), 12000

onMouseOver = (evt) ->
    if evt.target.classList.contains 'project'
        evt.target.classList.add 'hot'

onMouseOut = (evt) ->
    if evt.target.classList.contains 'project'
        evt.target.classList.remove 'hot'

onClick = (evt) ->
    if evt.target.classList.contains 'project'
        window.location = links[+evt.target.id]

    if evt.target.classList.contains 'thing'
        window.location = stuff[+evt.target.id].link

$(d).ready getProjectsJSON()
d.body.addEventListener 'mouseover', onMouseOver
d.body.addEventListener 'mouseout', onMouseOut
d.body.addEventListener 'click', onClick
