const searchBox = document.getElementById('searchbox');
const searchList = document.getElementById('searchList');
const recentMovies = ["tt9243804"]
const moviedets = [{"Title":"The Green Knight","Year":"2021","Rated":"R","Released":"30 Jul 2021","Runtime":"130 min","Genre":"Adventure, Drama, Fantasy","Director":"David Lowery","Writer":"David Lowery, The Gawain Poet","Actors":"Dev Patel, Alicia Vikander, Joel Edgerton","Plot":"A fantasy retelling of the medieval story of Sir Gawain and the Green Knight.","Language":"Latin, English","Country":"United States, Canada, Ireland","Awards":"22 wins & 121 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNTdiNWMtOWY0My00MjM4LTkwNzMtOGI0YThhN2Q4M2I4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"85/100"}],"Metascore":"85","imdbRating":"6.6","imdbVotes":"113,424","imdbID":"tt9243804","Type":"movie","DVD":"19 Aug 2021","BoxOffice":"$17,173,321","Production":"N/A","Website":"N/A","Response":"True"}]
const recentlist = document.getElementById('recentlist');
async function loadMovies(searchitem){
    const url = `https://www.omdbapi.com/?s=${searchitem}&page=1&apikey=851bf538`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    // console.log(data.Search)
    if(data.Response == "True"){
        DisplayMovieList(data.Search);
    }
}
function findMovies(){
    let searchitem = (searchBox.value).trim();
    if(searchitem.length>0){
        searchList.classList.remove("hiddenList");
        loadMovies(searchitem);
    }else{
        searchList.classList.add("hiddenList");

    }
    console.log(searchitem)
}

function  DisplayMovieList(movies){
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('searchListItem');
        if(movies[i].Poster !="N/A"){
            moviePoster = movies[i].Poster;
        }else{
            movieListItem.classList.add('NA');
            moviePoster = "./Images/image-not-found-icon.svg";
        }

        movieListItem.innerHTML = `<div class="movieImg">
        <img src="${moviePoster}" alt="" />
      </div>
      <div class="movieName" "><h1>${movies[i].Title}</h1></div>`;
      console.log(movieListItem);
        searchList.appendChild(movieListItem);
        
    }
    addtorecent();

}
function addtorecent(){
    const searchListmovies = searchList.querySelectorAll('.searchListItem');
    searchListmovies.forEach(movie=>{
        movie.addEventListener('click',async()=>{
            if(!recentMovies.includes(movie.dataset.id)){
                if(recentMovies.length>=10){
                    recentMovies.pop();
                }
                const res = await fetch(`https://omdbapi.com/?i=${movie.dataset.id}&apikey=851bf538`);
                const movres = await res.json();
                // console.log(movres);
                moviedets.unshift(movres)
                recentMovies.unshift(movie.dataset.id);
                // console.log(movie.dataset.id);
                // console.log(recentMovies)
                Showrecent();
            }
        })
    })
}
Showrecent();
function Showrecent(){
    recentlist.innerHTML="";
    moviedets.forEach(mov=>{
        let title = mov.Title;
        let mp;
        if(mov.Poster =="N/A"){
            mp = "./Images/image-not-found-icon.svg"
        }else{
            mp = mov.Poster;
        }
        console.log(mov.Poster);
        console.log(mov.Genre);

        let recentmovieitem = document.createElement('div');
        recentmovieitem.classList.add('movieCard');

        recentmovieitem.innerHTML=`<div class="movieCardimg">
        <img src= ${mp} alt="" />
      </div>
      <h2>${title}</h2>
      <h3><img src="./Images/1.svg" alt="" />${mov.Genre}</h3>
    </div>`;
    recentlist.appendChild(recentmovieitem);


    })
    // console.log("hello")
}
// loadMovies('spider');
