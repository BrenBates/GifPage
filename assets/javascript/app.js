
//Example Giphy URL
//https://api.giphy.com/v1/gifs/search?api_key=jKS8KF927EtiidzhKfsudaJ7tx8fyb0g&q=Arya Stark&limit=10&offset=0&rating=PG-13&lang=en


$(document).ready(function () {

let characterList = ['Jon Snow', 'Daenerys Targaryen', 'Arya Stark', 'Sandor Clegane', 'Tormund Giantsbane', 'Samwell Tarley'];
let stillGifs  = [];
let activeGifs = [];


function displayCharacterInfo() { 

    $('#gifSpace').empty();
        var char = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jKS8KF927EtiidzhKfsudaJ7tx8fyb0g&q=" + char + "&limit=10&offset=0&rating=PG-13&lang=en";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            console.log(response);
            console.log(queryURL);

            for(j=0;j<response.data.length;j++) {
                console.log(response.data[j].images.fixed_height_still.url);
                newGif = $('<img>');
                newGif.addClass('gif');
                newGif.attr('id',[j]);
                stillGifURL = response.data[j].images.fixed_height_still.url;
                newGif.attr('src', stillGifURL);
                $('#gifSpace').append(newGif);

                //push the still gif url to the still gifs array
                stillGifs.push(stillGifURL);

                //push the url for the moving gif to t he activeGifs array

                movingGifURL = response.data[j].images.fixed_height.url;
                activeGifs.push(movingGifURL);

            }
            console.log(stillGifs);
            console.log(activeGifs);
        });

      
}


function toggleStillness() {
    console.log(this);
}

function renderButtons() { 

    $("#buttonHeader").empty();
for(i=0;i<characterList.length;i++) {

    let newButton = $('<button>');
    newButton.addClass("char");
    newButton.attr("data-name",characterList[i]);
    newButton.text(characterList[i]);
    $('#buttonHeader').append(newButton);
    
    }
}

      // This function handles events where the add character button is clicked
      $("#add-char").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var character = $("#char-input").val().trim();

        // The movie from the textbox is then added to our array
        characterList.push(character);

        // Calling renderButtons which handles the processing of our character list array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".char", displayCharacterInfo);

      $(document).on("click", ".gif", toggleStillness);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


});