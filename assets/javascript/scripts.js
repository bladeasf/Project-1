var seatgeekapikey = 'MzgyNjQzMjl8MTY5OTkyMTI0MC4wMjk5NDU';
var artistbutton = document.querySelector('#redirect');
// 
function addToSearchHistory(query) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.unshift(query);
    searchHistory.splice(5);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory(){
    var searchHistoryContainer = document.getElementById('search-history');
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistoryContainer.innerHTML = '';

    if (searchHistory.length > 0) {
        var heading = document.createElement('p');
        heading.textContent = 'search History:';
        searchHistoryContainer.appendChild(heading);

        var list = document.createElement('ul');

        searchHistory.foreach(query => {
            var listItem = document.createElement('li');
            listItem.textContent = query;
            listItem.addEventListener('click', function (){
                document.getElementById('searchBox').value = query;
                searchConcerts();
            });
            list.appendChild(listItem);
        });

        searchHistoryContainer.appendChild(list);
    } else {
        var noSearchHistory = document.createElement('p');
        noSearchHistory.textContent = 'No Recently Viewed Artists';
        searchHistoryContainer.appendChild(noSearchHistory);
    }
}

displaySearchHistory();
// 
artistbutton.addEventListener("click", function () {
    var artist = artistbutton.dataset.name;
    var input = encodeURIComponent(artist);
    var url = 'https://shazam.p.rapidapi.com/search?term='+input+'&locale=en-US&offset=0';
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd895bfd894msh4060f91589112cap1de30fjsn0d438392944d',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    
fetch(url,options)
.then(response => response.json())
.then(data => {
    var songs = data.tracks.hits.map(track => track.track.title);
    console.log(songs)
    })
    populateSongList()
})

   



function populateSongList(){
    var songcontainer = document.getElementById("songcontainer");
    var ol = document.createElement('ol');
    songcontainer.append(ol);
    for (var i = 0; i < songs.length; i++){
        var songname = document.createElement('li');
        songname.textContent = i+'. '+song[i];
        ol.append(songname);
    }
    
}






function getSongList(){
    var query = document.getElementById('searchBox').value;
    var input= encodeURIComponent(query);
    var url = 'https://shazam.p.rapidapi.com/search?term='+input+'&locale=en-US&offset=0';
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd895bfd894msh4060f91589112cap1de30fjsn0d438392944d',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    
fetch(url,options)
.then(response => response.json())
.then(data => {
    var songs = data.tracks.hits.map(track => track.track.title);
    console.log(songs)
    })
}



function searchConcerts() {
    var query = document.getElementById('searchBox').value;
    var input= encodeURIComponent(query);
    var url = 'https://api.seatgeek.com/2/events?client_id='+seatgeekapikey+'&q='+input+'&taxonomies.name=concert';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
            getSongList();
            addToSearchHistory(query);
        })
        .catch(error => console.error('Error:', error));

        
}

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (data.events && data.events.length > 0) {
        data.events.forEach(event => {
            var div = document.createElement('div');
            div.innerHTML = `Name: ${event.title}, Venue: ${event.venue.name}, Date: ${event.datetime_local}`;
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.innerHTML = 'No concerts found';
    }
}




var darkthemebutton = document.getElementById("theme-toggle");

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

darkthemebutton.addEventListener("click", function () {
    toggleDarkMode();
})
    