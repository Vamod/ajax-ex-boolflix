$(document).ready(function(){
    $('#myButton').click(function(){
        var movie = $('#myInput').val();



        $.ajax(
          {
            url: 'https://api.themoviedb.org/3/search/movie?api_key=bb992b815f7bd546c69001e27b586501&query=' + movie,
            method: 'GET',
            success: function(risposta){
                console.log(risposta.results);
                var source = $("#entry-template").html();
                var template = Handlebars.compile(source);

                for(var i = 0; i < risposta.results.length; i++){
                    var html = template(risposta.results[i]);
                    $('.container').append(html);;

                }


            },
            error: function(){
              alert('errore!');
            }
          }
        );

    })
});
