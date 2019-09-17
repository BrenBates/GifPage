
//Example Giphy URL
//https://api.giphy.com/v1/gifs/search?api_key=jKS8KF927EtiidzhKfsudaJ7tx8fyb0g&q=Arya Stark&limit=10&offset=0&rating=PG-13&lang=en


$(document).ready(function () {

let characterList = ['Jon Snow', 'Daenerys Targaryen', 'Arya Stark', 'Sandor Clegane', 'Tormund Giantsbane', 'Samwell Tarley'];


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
                console.log(response.data[j].images.original.url);
                newGif = $('<img>');
                newGif.attr('src', response.data[j].images.original.url);
                $('#gifSpace').append(newGif);

            }
          
          // Creates a div to hold the movie
          // Retrieves the Rating Data
          // Creates an element to have the rating displayed
          // Displays the rating
          // Retrieves the release year
          // Creates an element to hold the release year
          // Displays the release year
          // Retrieves the plot
          // Creates an element to hold the plot
          // Appends the plot
          // Creates an element to hold the image
          // Appends the image
          // Puts the entire Movie above the previous movies.

        });

      
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

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


});