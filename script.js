const movieSectionElement = document.querySelector(".movie-section");
const formElement = document.querySelector("form");
const searchBoxElement = document.querySelector("#searchBox");
const searchElement = document.querySelector("#searchButton");
const showMeMoreBtn = document.getElementById('show-me-more-btn');

const apiKey = "8bce4cc25207a6c3b4ad6cdee8ca3c1d";

var currentApiPage = 1;


let url ="https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey+"&language=en-US&page=";
    console.log(url);

    getMovie(url);
 

async function getMovie(url){
    
    
    let reponse = await fetch(url+currentApiPage);

    let reponseData = await reponse.json();

    let movies = reponseData.results.map(result => ({
        id: result.id,
        title: result.title,
        posterPath: result.poster_path,
        voteAvg: result.vote_average,
    }))

    console.log(reponseData);
    //console.log(movies);
// movieSectionElement.innerHTML= ` <div>
//     <div>`;

    displayMovies(movies);
    currentApiPage++;
}



function displayMovies(apiData){
    for(let i = 0; i<apiData.length;i++){

       movieSectionElement.innerHTML +=`
       <div>
        <img id = "image" src="${"https://image.tmdb.org/t/p/w500" + apiData[i].posterPath}" alt="Movie Poster Image"/>
        <p id = "rate"><img id = "star" src="/images/star.png"> ${apiData[i].voteAvg}</p>
        <p id = "title">${apiData[i].title}</p>

        </div>
        `
     
    }

}



async function getSearch(evt){
    movieSectionElement.innerHTML= ` <div>
//     <div>`;
    
    const searchTerm = searchBoxElement.value;
    let searchUrl = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&query="+searchTerm;
    evt.preventDefault(); 
    console.log(searchUrl);
    const results = await getMovie(searchUrl);
    displayMovies(results);
   
 
    
}
formElement.addEventListener("click",getSearch);

async function handleShowMeMoreClick(evt) {
    
    const results = await getMovie(url);
    displayMovies(results);
    currentApiPage++;
    console.log(currentApiPage)
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);