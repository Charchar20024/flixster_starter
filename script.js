const movieSectionElement = document.querySelector(".movie-section");
const formElement = document.querySelector("form");
const searchBoxElement = document.querySelector("#searchBox");
const searchElement = document.querySelector("#searchButton");
const moreButton = document.querySelector("#button-1");

const apiKey = "8bce4cc25207a6c3b4ad6cdee8ca3c1d";


var pageNum = 1;


let url ="https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey+"&language=en-US&page="+pageNum;
    console.log(url);

    getMovie(url);
 

async function getMovie(url){
    
    
    let reponse = await fetch(url);
    let reponseData = await reponse.json();

    let movies = reponseData.results.map(result => ({
        id: result.id,
        title: result.title,
        posterPath: result.poster_path,
        voteAvg: result.vote_average,
    }))

    console.log(reponseData);
    //console.log(movies);
movieSectionElement.innerHTML= ` <div>
    <div>`;

    displayMovies(movies);
    pageNum++;
    console.log(pageNum); 
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

formElement.addEventListener("click",getSearch);

async function getSearch(evt){
    
   const searchTerm = searchBoxElement.value;
let searchUrl = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&query="+searchTerm;
    evt.preventDefault(); 
console.log(searchUrl);
    getMovie(searchUrl)
   
 
    
}
 moreButton.addEventListener("click", getMovie);