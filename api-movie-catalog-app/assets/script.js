const apiKey = '205830488de7a0671ff5564faca04af7';

const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchMovies(searchInput.value);
  }
});

function searchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      moviesContainer.innerHTML = '';
      data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <span>${movie.vote_average} / 10</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${movie.overview}
          </div>
        `;
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch(error => console.log(error));
}