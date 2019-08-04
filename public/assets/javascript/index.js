$( document ).ready(function() {
    // Grab the articles as a json
    $.getJSON("/reviews", function(data) {
    // console.log(data);
    // For each one
    for (var i = 0; i < data.length; i++) {
        // console.log(`${data[i].product}`)
        $("#target").append(`<li class='collection-item'><div> <a href="${data[i].link}" target="_blank"> ${data[i].product}</a> <a href="#" class="secondary-content"><i data-id="${data[i]._id}" class="material-icons">favorite_border</i></div></a></li>`);

    };
    });

    $(document).on("click", "#scrapeBtn",function() {
        // console.log("scrape btn");

        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .then(function(data) {
            location.reload();
            console.log(data);
        });
    });

    $(document).on("click", "i",function() {

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "PUT",
            url: `/reviews/${thisId}`
          })
            // With that done
            .then(function(data) {
              // Log the response
              console.log(data);
        });
    });
});

