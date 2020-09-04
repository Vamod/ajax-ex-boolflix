$(document).ready(function(){

    //genero la lista dei film con l'enter
    $('#myInput').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            var inputQuery = $('#myInput').val();
            //per svuotare la ricerca precedente
            reset();
            insertSearch(inputQuery, 'film', 'movie');
            insertSearch(inputQuery, 'tv', 'tv');
        }
    });

    //genero la lista dei film al click del button
    $('#myButton').click(function(){
        var inputQuery = $('#myInput').val();
        reset();
        insertSearch(inputQuery, 'film', 'movie');
        insertSearch(inputQuery, 'tv', 'tv');

    });
});


//funzioni

function insertSearch(data, type, url){
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/' + url,
        method: 'GET',
        data:{
            api_key: 'bb992b815f7bd546c69001e27b586501',
            language: 'it-IT',
            query: data
        },
        success: function(risposta){
        //     // console.log(risposta.results);
            if(risposta.total_results > 0){
                print(risposta.results, type);
            } else {
                noResult(type);
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

    for(var i = 0; i < data.length; i++){
        if(genere == 'film'){
            var title = data[i].title;
            var original_title = data[i].original_title;
        } else if(genere == 'tv'){
            var title = data[i].name;
            var original_title = data[i].original_name;
        }
            var context = {
                genere: genere,
                title: title,
                original_title: original_title,
                original_language: flag(data[i].original_language),
                vote_average: stars(data[i].vote_average)

        };

        var html = template(context);
        if(genere == 'film'){
            $('.movie-list').append(html);
        } else if (genere == 'tv') {
            $('.tv-series-list').append(html);
        }
    }
    //per pulire campo di input

}

function noResult(genere){
    var source = $("#no-result-template").html();
    var template = Handlebars.compile(source);
    var context = {
        noResult: 'Non ci sono risultati'
    }
    var html = template(context);
    if (genere == 'tv') {
        $('.tv-series-list').append(html);
    }else if(genere == 'film'){
        $('.movie-list').append(html);
    }

}

function stars(num){
    var resto = num % 2;
    num = Math.floor(num / 2);
    var star = '';
    var starEmpty = '';
    for(var i = 0; i < 5; i++){
        if( i < num){
            star = star + '<i class="fas fa-star"></i>';
        }else if(resto != 0){
            star = star + '<i class="fas fa-star-half-alt"></i>';
            resto = 0;
        }else {
            star = star + '<i class="far fa-star"></i>';
        }
    }
    return star;
}

// function flag(stringa){
//     if(stringa == 'it'){
//         stringa = '<img src="img/it.png" alt="">';
//     } else if(stringa == 'en'){
//         stringa = '<img src="img/en.png" alt="">';
//     }
//     return stringa
// }

//soluzione Cristina
//più veloce per aggiungere altre bandiere nel array
function flag(lingua){
    var language = ['en', 'it'];
    if(language.includes(lingua)){
        return '<img src="img/' + lingua +'.png">';
    }
    return lingua;
}

function reset(){
    $('.movie-list').empty();
    $('.tv-series-list').empty();
    $('#myInput').val('');
}
