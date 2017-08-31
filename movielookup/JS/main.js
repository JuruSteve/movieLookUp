$(document).ready(()=>{
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })

})

function getMovies(searchText){
    axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=67df625&s='+searchText)
        .then((response)=>{
            console.log(response);
            let movies = response.data.Search;
            let movieId = response.data.Search.imdbID;
            console.log(movies);
            let output = '';
            $.each(movies, (index, movie)=>{
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${movie.Poster}">
                        
                        <h5>${movie.Title}</h5>
                        <a href="#" onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
                        </div>
                        </div>
                        `;
            });
            $('#movies').html(output);
        })
        .catch((err)=>{
            console.log(err);
        })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(id){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i='+movieId+'&apikey=67df625')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output =  `
                <div class="row">
                    <div class="col-md-4">
                        <img src=${movie.Poster}>
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writers:</strong> ${movie.Writers}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item well"><strong>Plot:</strong> ${movie.Plot}</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <a class="btn btn-primary" href="http://imdb.com/title/${movie.imdbID}" target="_blank">View IMDB</a>
                    <a class="btn btn-default" href="index.html" >Go Back to Search</a>
                </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}