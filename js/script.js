$(document).ready(function(){
    //genero la lista dei film con l'enter
    $('#myInput').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            var movie = $('#myInput').val();
            //per svuotare la ricerca precedente
            $('.movie-list').empty();


            $.ajax(
              {
                url: 'https://api.themoviedb.org/3/search/movie',
                method: 'GET',
                data:{
                    api_key: 'bb992b815f7bd546c69001e27b586501',
                    language: 'it-IT',
                    query: movie
                },
                success: function(risposta){
                //     // console.log(risposta.results);

                    print(risposta.results);

                },
                error: function(){
                  alert('errore!');
                }
              }
            );
        }
    });

    //genero la lista dei film al click del button
    $('#myButton').click(function(){
        var movie = $('#myInput').val();
        $('.movie-list').empty();


        $.ajax(
          {
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data:{
                api_key: 'bb992b815f7bd546c69001e27b586501',
                language: 'it-IT',
                query: movie
            },
            success: function(risposta){
            //     // console.log(risposta.results);

                print(risposta.results);

            },
            error: function(){
              alert('errore!');
            }
          }
        );

    });
});


//funzioni

function print(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for(var i = 0; i < data.length; i++){
        var context = {
            title: data[i].title,
            original_title: data[i].original_title,
            original_language: data[i].original_language,
            vote_average: data[i].vote_average
        }
        var html = template(context);
        $('.movie-list').append(html);
    }
    //per pulire campo di input
    $('#myInput').val(' ');
}
