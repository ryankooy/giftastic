// create buttons from an array
// pushing new buttons into the array using user input values
// show gif ratings
// start/stop gifs with click
// limit image # to 10

$(document).ready(function() {

    bArray = ['bats', 'cats', 'gnats', 'hats', 'mats', 'pats', 'rats', 'tats', 'vats'];

    var b = '';
    var thing = '';

    function makeButtons() {

        for (var i = 0; i < bArray.length; i++) {

            b = $('<button>');
            b.addClass('oldB');
            b.attr(bArray[i]);
            b.text(bArray[i]);
            $('.buttons').append(b);

        }

    }

    $('.buttons').on('click', '.oldB', function() {

        $('#gifs').empty();

        thing = $(this).text();

        console.log(thing);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=8QgkvoLZ85mVtpm3jbBqQIEXBObzEPnh&limit=10";

        $.ajax({

            url: queryURL,
            method: 'GET'

        }).then(function(resp) {

            var r = resp.data;

            for (var j = 0; j < r.length; j++) {

                var gif = $('<div>');

                var rating = r[j].rating;

                if (rating !== 'r' && rating !== 'pg-13') {

                    var p = $('<p>').text("Rating: " + rating);

                    var pic = $('<img>');

                    pic.attr('src', r[j].images.fixed_height.url);
                    pic.addClass('pic');

                    gif.append(p);
                    gif.append(pic);

                    $('#gifs').prepend(gif);

                }

            }


            
        });



    });

    $('.btn').on('click', function() {

        thing = $('input').val().trim();
        $(thing).push(bArray);

        b = $('<button>');
        b.addClass('oldB');

        $('.buttons').append(b);
        $(b).append(thing);

        // if ($('input').val() === "") {
            
        // }

        $('input').val('');

    });

    $('#b').keyup(function(e) {

        if (e.keyCode === 13) {
            $('.btn').click();
        }

    });

    makeButtons();
    
});