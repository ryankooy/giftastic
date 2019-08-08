// create buttons from an array
// pushing new buttons into the array using user input values
// show gif ratings
// start/stop gifs with click
// limit image # to 10

$(document).ready(function() {

    bArray = ['tom', 'jerry', 'ren', 'stimpy', 'catdog', 'beavis', 'butthead', 'phineas', 'ferb', 'toejam', 'earl', 'pinky', 'brain', 'rocky', 'bullwinkle'];

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

                    pic.attr('src', r[j].images['480w_still'].url);
                    pic.attr('data-still', r[j].images['480w_still'].url);
                    pic.attr('data-animate', r[j].images.fixed_height.url);
                    pic.attr('data-state', 'still');
                    pic.addClass('pic');

                    gif.append(p);
                    gif.append(pic);

                    $('#gifs').prepend(gif);

                }

            }

            $('.pic').on('click', function() {
                var s = $(this).attr('data-state');
                if (s === 'still') {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                }
            });

        });

    });

    $('.btn').on('click', function() {

        thing = $('input').val().trim();
        $(thing).push(bArray);

        if (thing !== '') {

            b = $('<button>');
            b.addClass('oldB');

            $('.buttons').append(b);
            $(b).append(thing);

        }

        $('input').val('');

    });

    $('#b').keyup(function(e) {

        if (e.keyCode === 13) {
            $('.btn').click();
        }

    });

    makeButtons();
    
});