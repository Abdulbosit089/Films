function newElement(film){
    return `
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="The Shawshank Redemption">

   <div class="movie-info">
       <h3>${film.original_title}</h3>
       <span class="orange">6.9</span>
    </div>
    <span class="date">2021-09-21</span>`
}