// import { response } from "express"
let currTeam 
$('#submit').click(function(){
     let teamName = $('input').val()
     $.get(`/teams/${teamName}`,function(response){
        renderer(response)
        currTeam = response
     })
})

$('#dream').click(function(){
    $.get('/dreamTeam',function(response){
        renderer(response)
        currTeam = response
    })
})


//const addDreamPlayer = function(player){
    $('#container').on('click','.add-dream',function(){
        const id = $(this).closest('div').data().id
       addDreamPlayer(currTeam.find(p => p.id === id))
    })


    const addDreamPlayer = function(player){
        $.post('/roster',player)
    }
    





const renderer = function(players){
    $('#container').empty()
    const source = $("#player-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({players: players})
    $('#container').append(newHTML)
}