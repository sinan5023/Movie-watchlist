const buttonContainer = document.querySelector(".button-container");
const buttons = document.querySelectorAll("*");
const searchContainer = document.getElementById("searchContainer");
const searchValue = document.getElementById("searchBox");
const movieContainer = document.querySelector(".movie-container");
const watchlistContainer = document.querySelector(".watchlist-container");
const watchlistBox = document.getElementById("watchlist-box")
const apiKey = "5bf6dde2";
const base_URL = `http://www.omdbapi.com/?apikey=${apiKey}`;

let watchlist = JSON.parse(localStorage.getItem("watchlist"));

buttonContainer.addEventListener("click", (e) => {
  if (e.target.id == "search") {
    buttons.forEach((button) => {
      button.classList.remove("selected");
      e.target.classList.add("selected");
      searchContainer.style.display = "block";
      watchlistBox.style.display = "none"
    });
  } else if (e.target.id == "watchlist") {
    buttons.forEach((button) => {
      button.classList.remove("selected");
      e.target.classList.add("selected");
      searchContainer.style.display = "none";
      watchlistBox.style.display = "block"
      renderWatchlist();
    });
  }
});

search = async () => {
  movieContainer.innerHTML = "";
  if (searchValue.value == "" || searchValue.value == null) {
    movieContainer.innerHTML = `<h1 class="empty-text"> Please Enter A Movie Name To Search </h1>`;
  } else {
    const response = await fetch(`${base_URL}&s=${searchValue.value}`);
    const data = await response.json();
    console.log(data);

    data.Search.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" />
        <div class="card-content">
          <div class="card-title">${movie.Title}</div>
          <div class="card-details">
            <span>${movie.Year}</span>
          </div>
          <button class="card-button">Add</button>
        </div>
      `;
      const addBtn = card.querySelector(".card-button");
      addBtn.addEventListener("click", () => {
        if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
          watchlist.push(movie);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert(`${movie.Title} added to watchlist!`);
        } else {
          alert(`${movie.Title} is already in watchlist.`);
        }
      });

      movieContainer.append(card);
    });
  }
};
function renderWatchlist() {
  watchlistContainer.innerHTML = "";
  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `<h1 class="empty-text"> No movies in Watchlist </h1>`;
  } else {
    watchlist.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" />
        <div class="card-content">
          <div class="card-title">${movie.Title}</div>
          <div class="card-details">
            <span>${movie.Year}</span>
          </div>
          <button class="card-button remove-btn">Remove</button>
        </div>
      `;
      const removeBtn = card.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        watchlist = watchlist.filter((m) => m.imdbID !== movie.imdbID);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        renderWatchlist();
      });

      watchlistContainer.append(card);
    });
  }
}
