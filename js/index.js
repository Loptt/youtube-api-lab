function fetchVideos(term) {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${term}&key=AIzaSyDxk8D7UvK5M76vNg5n2p-t7hsxW5h7yBA`;

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            console.log(responseJSON);
            //displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    let articles = responseJSON.articles;

    $('#jsResult').html("");
    
    articles.forEach((article) => {
        $('#jsResult').append(`
            <div class="article">
                <h1>${article.title}</h1>
                <img src="${article.urlToImage}">
                <h4>By: ${article.author}</h4>
                <p>${article.description}</p>
            </div>
        `);
    });
}

function watchForm() {
    $('#form').on('submit', function(event) {
        event.preventDefault();
        let term = $('#term').val();

        if (term == "") {
            console.log("Empty term");
            return;
        }

        fetchVideos(term);
        $('#term').val("");
    });

}

function init() {
    watchForm();
}

init();