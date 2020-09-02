$(document).ready(function(){
    $('#myButton').click(function(){
        var movie = $('#myInput').val();

        $.ajax(
          {
            url: 'https://api.themoviedb.org/3/search/movie?api_key=bb992b815f7bd546c69001e27b586501&query=' + movie,
            method: 'GET',
            success: function(risposta){

                console.log(risposta);
            },
            error: function(){
              alert('errore!');
            }
          }
        );

    })
});
