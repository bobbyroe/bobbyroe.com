d = document
links = []
stuff = []
random_stuff_index = -1
first_thing_index = -1
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
        stuff.push  name: item.stuff, left: -1, width: -1
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
    for thing, i in stuff when thing.name isnt ''
        thing_el = d.createElement 'a'
        thing_el.className = 'thing'
        thing_el.innerHTML = thing.name.replace /\s/g, '&nbsp;'
        stuff_el.appendChild thing_el
        box = thing_el.getBoundingClientRect()
        thing.left = box.left
        thing.width = box.width
        if first_thing_index is -1 then first_thing_index = i
    stuff_el.setAttribute 'style', "width: #{first_thing_index.width}px"

randomizeILikeStuff = ->
    random_stuff_index = Math.floor(Math.random() * stuff.length)
    current_thing = stuff[random_stuff_index]

scrollILike = ->
    randomizeILikeStuff()
    if current_thing.name isnt ''
        stuff_el.setAttribute 'style', "width: #{current_thing.width}px"
        stuff_el.goalScrollLeft = current_thing.left - stuff[first_thing_index].left
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
    console.log evt.target.classList
    if evt.target.classList.contains 'project'
        window.location = links[+evt.target.id]

    if evt.target.classList.contains 'thing' then window.location = links[random_stuff_index]

$(d).ready getProjectsJSON()
d.body.addEventListener 'mouseover', onMouseOver
d.body.addEventListener 'mouseout', onMouseOut
d.body.addEventListener 'click', onClick
