$( document ).ready(function() {
    $(".modal").modal();

    $.getJSON("/saved-reviews", function(data) {
        // console.log(data);
        
        for (var i = 0; i < data.length; i++) {
            // console.log(`${data[i].product}`)
            // <li class="collection-item"><div>Product 2<a href="#!" class="secondary-content"> <i class="material-icons deleteIcon">delete</i><i class="material-icons editIcon">edit</i></a></div></li>
            $("#target").append(`<li class='collection-item'><div> <a href="${data[i].link}" target="_blank"> ${data[i].product}</a> <a href="#" class="secondary-content"><i data-id="${data[i]._id}" class="material-icons deleteIcon">delete</i>     <i data-id="${data[i]._id}" class="material-icons modal-trigger editIcon" href="#noteModal">edit</i> </div></a></li>`);
        };
    });

    $(document).on("click", ".deleteIcon",function() {
        // console.log(`delete ${$(this).attr()}`);
        console.log(`delete icon`);
    });
    
    $(document).on("click", ".editIcon",function() {
        // console.log(thisId);
        
        // $("#notes").empty();
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
        method: "POST",
        url: `/notes/${thisId}`
        })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data);
            // // The title of the article
            // $("#notes").append("<h2>" + data.title + "</h2>");
            // // An input to enter a new title
            // $("#notes").append("<input id='titleinput' name='title' >");
            // // A textarea to add a new note body
            // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // // If there's a note in the article
            // if (data.note) {
            //     // Place the title of the note in the title input
            //     $("#titleinput").val(data.note.title);
            //     // Place the body of the note in the body textarea
            //     $("#bodyinput").val(data.note.body);
            // };
        });
    });
});