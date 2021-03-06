$(document).ready(function(){
    initWithoutSearch();
    $('#open-search').click(function(){
        $('#my-input').toggleClass('active', 1000);
        $('#my-input').focus();
        init();
    })
    //genero la lista dei film con l'enter
    $('#my-input').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            $('#my-input').toggleClass('active', 1000);
            init();         
        }
    });

    $('#home').click(function(){
        $('.movie-list').show();
        $('.tv-series-list').show();
        $('.tv-series-list').css('padding-top', '0px');
    })

    $('#filtro-serie').click(function(){
        $('.movie-list').hide();
        $('.tv-series-list').css('padding-top', '100px');
        if($('.tv-series-list').hide()){
            $('.tv-series-list').show()
        }
    })

    $('#filtro-film').click(function(){
        $('.tv-series-list').hide();
        if($('.movie-list').hide()){
             $('.movie-list').show();
        }
    })
});


//funzioni

function init(){
    var inputQuery = $('#my-input').val();
    //controllo per evitare errore query
    if (inputQuery != '') {
        reset();
        insertSearch(inputQuery, 'film', 'movie');
        insertSearch(inputQuery, 'tv', 'tv');
    }
}

function initWithoutSearch(){
    insertSearch('dark', 'film', 'movie');
    insertSearch('dark', 'tv', 'tv');
}

function insertSearch(data, type, url){
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/' + url,
        method: 'GET',
        data:{
            api_key: 'bb992b815f7bd546c69001e27b586501',
            language: 'it-IT',
            query: data,
        },
        success: function(risposta){
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
            var tipo = 'movie';

        } else if(genere == 'tv'){
            var title = data[i].name;
            var original_title = data[i].original_name;
            var tipo = 'tv';
        }

        var id = data[i].id;
        // console.log(id);

        var context = {
            genere: genere,
            title: 'Titolo' + ': ' + title,
            poster_path: findImage(data[i].poster_path),
            original_language: 'Lingua' + ': ' + flag(data[i].original_language),
            vote_average: 'Voto' + ': ' +  stars(data[i].vote_average),
            overview: 'Overview' + ': ' +  data[i].overview.substring(0, 250)+ '[...]',
            id: id
        };

        //per togliere il titolo originale se coincide col titolo
        if(title != original_title){
            context.original_title = 'Titolo originale' + ': ' + original_title;
        }

        var html = template(context);
        if(genere == 'film'){
            $('.movie-list').append(html);
        } else if (genere == 'tv') {
            $('.tv-series-list').append(html);
        }
        getDetails(tipo, id);
    }
}
//funzione nel caso in cui non ci fossero risultati
function noResult(genere){
    var source = $("#no-result-template").html();
    var template = Handlebars.compile(source);
    var context = {
        noResult: `Non ci sono risultati ${genere}`
    }
    var html = template(context);
    if (genere == 'tv') {
        $('.tv-series-list').append(html);
    }else if(genere == 'film'){
        $('.movie-list').append(html);
    }

}

//funzione che trasforma il voto in stelle ranking
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


function flag(lingua){
    var language = ['en', 'it'];
    if(language.includes(lingua)){
        return '<img src="img/' + lingua +'.png">';
    }
    return lingua;
}

function findImage(data){
    var root = 'https://image.tmdb.org/t/p/w342';
    var image = root + data;
    if(data != null){
    return image;
    }
    return 'https://www.officinezambrano.it/s/cc_images/teaserbox_72447489.jpg?t=1548731397';
}

function getDetails(type, id){
    var url = 'https://api.themoviedb.org/3/' + type + '/' + id;
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            api_key: 'bb992b815f7bd546c69001e27b586501',
            language: 'it-IT',
            append_to_response: 'credits'
        },
        success: function(risposta){
            var genere = risposta.genres;
            var attori = risposta.credits.cast;
            // console.log(attori);
            printDetails(id, genere, attori);
        },
        error: function(){
          alert('errore!');
        }
    });
}

function printDetails(filmId, genres, cast){
    var castList ='';
    var len = cast.length;
    if(len > 5){
        len = 5;
    }

    for(var i = 0; i < len; i++){
        var nameActor = cast[i].name;
        castList += nameActor;
        //se non sono all'ultimo aggiungo la virgola
        if(i !== len - 1){
            castList += ', ';
        }
    }
    // console.log(castList);

    var generiList = '';
    for (var i = 0; i < genres.length; i++) {
        var genere = genres[i].name;
        generiList += genere;
        if(i !== genres.length - 1){
            generiList += ', ';
        }
    }
    var source = $("#entry-template-details").html();
    var template = Handlebars.compile(source);
    var context = {
        actors:'Attori: ' + castList,
        genres:'Genere: ' + generiList
    };

    var html = template(context);
    $('.entry[data-id="' + filmId + '"]').find('.dettagli').append(html);


}

function reset(){
    $('.movie-list').empty();
    $('.tv-series-list').empty();
    $('#my-input').val('');
}
