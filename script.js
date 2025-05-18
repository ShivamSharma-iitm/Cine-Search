function fetchMovie() {
    const movieName = document.getElementById('searchInput').value.trim();
    const apiKey = '6ec20fbb';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById('movieContainer').innerHTML = "<p>No movies found!</p>";
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function fetchMovieDetails(imdbID) {
    const apiKey = '6ec20fbb';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovie(data);
            } else {
                document.getElementById('movieContainer').innerHTML = "<p>Movie details not found!</p>";
            }
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function displayMovies(movies) {
    const container = document.getElementById('movieContainer');
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-gray-800', 'p-4', 'rounded', 'w-64', 'flex', 'flex-col', 'items-center', 'text-center');
        movieCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/250x350"}" alt="Poster of ${movie.Title}" class="w-full h-64 object-cover mb-2 rounded">
            <p class="mb-2"><strong>Type:</strong> ${movie.Type}</p>
            <button onclick="fetchMovieDetails('${movie.imdbID}')" class="p-2 bg-red-600 rounded text-white">View Details</button>
        `;
        container.appendChild(movieCard);
    });
}

function displayMovie(data) {
    document.getElementById('movieContainer').classList.add('hidden');
    document.getElementById('movieDetailsContainer').classList.remove('hidden');

    document.getElementById('moviePoster').src = data.Poster !== "N/A" ? data.Poster : "https://placehold.co/600x800";
    document.getElementById('movieTitle').innerText = `${data.Title} (${data.Year})`;
    document.getElementById('movieYear').innerHTML = `<strong>Year:</strong> ${data.Year}`;
    document.getElementById('movieGenre').innerHTML = `<strong>Genre:</strong> ${data.Genre}`;
    document.getElementById('movieDirector').innerHTML = `<strong>Director:</strong> ${data.Director}`;
    document.getElementById('movieCast').innerHTML = `<strong>Cast:</strong> ${data.Actors}`;
    document.getElementById('moviePlot').innerHTML = `<strong>Plot:</strong> ${data.Plot}`;
    document.getElementById('movieRating').innerHTML = `<strong>IMDb Rating:</strong> ${data.imdbRating}`;
}

function backToSearchResults() {
    document.getElementById('movieContainer').classList.remove('hidden');
    document.getElementById('movieDetailsContainer').classList.add('hidden');
}
