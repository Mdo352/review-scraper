// console.log(`js is linked \ntemplate literal example ${2 + 2} `);
// Grab the articles as a json
$.getJSON("/reviews", function(data) {
    // console.log(data);
    // For each one
    for (var i = 0; i < data.length; i++) {
        // console.log(`${data[i].product}`)
        $("#target").append(`<li class='collection-item'><div> <a href="${data[i].link}" target="_blank"> ${data[i].product}</a> <a href="#" class="secondary-content"><i class="material-icons">favorite_border</i></div></a></li>`);

    };
});