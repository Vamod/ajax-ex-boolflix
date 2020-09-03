$(document).ready(function(){
    //genero la lista dei film con l'enter
    $('#myInput').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            var movie = $('#myInput').val();
            //per svuotare la ricerca precedente
            $('.movie-list').empty();
            insertMovie(movie);
        }
    });

    //genero la lista dei film al click del button
    $('#myButton').click(function(){
        var movie = $('#myInput').val();
        $('.movie-list').empty();
        insertMovie(movie);

    });
});


//funzioni

function insertMovie(data){
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data:{
            api_key: 'bb992b815f7bd546c69001e27b586501',
            language: 'it-IT',
            query: data
        },
        success: function(risposta){
        //     // console.log(risposta.results);
            if(risposta.total_results > 0){
                print(risposta.results);
            } else {
                noResult();
            }


        },
        error: function(){
          alert('errore!');
        }
      }
    );
}


function print(data){
    //il template lo metto fuori perchè non c'è bisogno di generarlo più volte nel ciclo
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for(var i = 0; i < data.length; i++){
        var context = {
            title: data[i].title,
            original_title: data[i].original_title,
            original_language: data[i].original_language,
            vote_average: stars(data[i].vote_average)
        };

        var html = template(context);
        $('.movie-list').append(html);
    }
    //per pulire campo di input
    $('#myInput').val(' ');
}

function noResult(){
    var source = $("#no-result-template").html();
    var template = Handlebars.compile(source);
    var context = {
        noResult: 'Non ci sono risultati'
    }
    var html = template(context);
    $('.movie-list').append(html);
}

function stars(num){
    var num = Math.round(num / 2);
    var star = '';
    if(num > 0){
    for(var i = 0; i < num; i++){
        star = star + '<i class="fas fa-star"></i>';

    }
    } else {
        star = 0 ;
}
    return star;
}
