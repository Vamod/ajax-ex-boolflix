$(document).ready(function(){

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
                console.log(risposta.results);

                var source = $("#entry-template").html();
                var template = Handlebars.compile(source);

                for(var i = 0; i < risposta.results.length; i++){
                    var context = {
                        title: risposta.results[i].title,
                        original_title: risposta.results[i].original_language,
                        original_language: risposta.results[i].vote_average
                    }
                    var html = template(context);
                    $('.movie-list').append(html);;
                }

                //per pulire campo di input
                $('#myInput').val(' ');

            },
            error: function(){
              alert('errore!');
            }
          }
        );

    })
});
