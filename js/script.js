$(document).ready(function(){

    //genero la lista dei film con l'enter
    $('#myInput').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            var movie = $('#myInput').val();
            //per svuotare la ricerca precedente
            $('.movie-list').empty();
            insertMovie(movie);
            insertTvSeries(movie);
        }
    });

    //genero la lista dei film al click del button
    $('#myButton').click(function(){
        var movie = $('#myInput').val();
        $('.movie-list').empty();
        insertMovie(movie);
        insertTvSeries(movie);

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
            var film;
            if(risposta.total_results > 0){
                print(risposta.results, film);
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


function insertTvSeries(data){
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/tv',
        method: 'GET',
        data:{
            api_key: 'e99307154c6dfb0b4750f6603256716d',
            language: 'it-IT',
            query: data
        },
        success: function(risposta){
            console.log(risposta.results);
            var tv;
            if(risposta.total_results > 0){
                print(risposta.results, tv);
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



function print(data, genere){
    //il template lo metto fuori perchè non c'è bisogno di generarlo più volte nel ciclo
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var film;
    var tv;

    for(var i = 0; i < data.length; i++){
        if(genere == film){
            var context = {
                title: data[i].title,
                original_title: data[i].original_title,
                original_language: flag(data[i].original_language),
                vote_average: stars(data[i].vote_average)

            };
        } else if(genere == tv){
            context = {
                title: data[i].name,
                original_title: data[i].original_name,
                original_language: flag(data[i].original_language),
                vote_average: stars(data[i].vote_average)

        };

    }
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
    var starEmpty = '';
    for(var i = 0; i < 5; i++){
        if( i <= num){
            star = star + '<i class="fas fa-star"></i>';
        } else {
            star = star + '<i class="far fa-star"></i>';
        }
    }
    return star;
}

function flag(stringa){
    if(stringa == 'it'){
        stringa = '<img src="img/it.png" alt="">';
    } else if(stringa == 'en'){
        stringa = '<img src="img/en.png" alt="">';
    }
    return stringa
}
