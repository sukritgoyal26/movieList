const searchBox = document.getElementById('searchbox');
const searchList = document.getElementById('searchList');

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
            moviePoster = "./Images/Movie Cover.svg";
        }

        movieListItem.innerHTML = `<div class="movieImg">
        <img src="${moviePoster}" alt="" />
      </div>
      <div class="movieName"><h1>${movies[i].Title}</h1></div>`;
      console.log(movieListItem);
        searchList.appendChild(movieListItem);
        
    }
}
// loadMovies('spider');
