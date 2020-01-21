let currentTerm = "";

function fetchVideos(term, token = "") {
    let url = "";
    if (token === "") {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${term}&key=AIzaSyDxk8D7UvK5M76vNg5n2p-t7hsxW5h7yBA`;
    } else {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${term}&key=AIzaSyDxk8D7UvK5M76vNg5n2p-t7hsxW5h7yBA&pageToken=${token}`;
    }

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            console.log(responseJSON);
            displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    let videos = responseJSON.items;
    let nextPageToken = responseJSON.nextPageToken;
    let prevPageToken = responseJSON.prevPageToken;

    $('#jsResult').html("");
    
    videos.forEach((video) => {
        $('#jsResult').append(`
            <div class="video">
                <a target="_blank" href="https://www.youtube.com/watch?v=${video.id.videoId}">
                    <h2>${video.snippet.title}</h2>
                    <img class="thumbnail" src="${video.snippet.thumbnails.high.url}">
                </a>
            </div>
            <div class="divider"></div>
        `);
    });

    $('#buttons').html("");

    if (prevPageToken != null) {
        $('#buttons').append(
            `<button class="btn btn-primary" id="prevButton" value="${prevPageToken}">Previous</button>`
        );
    } 
    if (nextPageToken != null) {
        $('#buttons').append(
            `<button class="btn btn-primary" id="nextButton" value="${nextPageToken}">Next</button>`
        );
    } 
}

function watchButtons() {
    $('#buttons').on('click', '#nextButton', function(event) {
        fetchVideos(currentTerm, $(this).val());
        scroll(0,0);
    });

    $('#buttons').on('click', '#prevButton', function(event) {
        fetchVideos(currentTerm, $(this).val());
        scroll(0,0);
    });
}

function watchForm() {
    $('#form').on('submit', function(event) {
        event.preventDefault();
        let term = $('#term').val();
        currentTerm = term;

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
    watchButtons();
}

init();