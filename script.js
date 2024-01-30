const searchBox = document.getElementById('searchbox');
const searchList = document.getElementById('searchList');
const recentMovies = ["tt9243804"]
const moviedets = [{"Title":"The Green Knight","Year":"2021","Rated":"R","Released":"30 Jul 2021","Runtime":"130 min","Genre":"Adventure, Drama, Fantasy","Director":"David Lowery","Writer":"David Lowery, The Gawain Poet","Actors":"Dev Patel, Alicia Vikander, Joel Edgerton","Plot":"A fantasy retelling of the medieval story of Sir Gawain and the Green Knight.","Language":"Latin, English","Country":"United States, Canada, Ireland","Awards":"22 wins & 121 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNTdiNWMtOWY0My00MjM4LTkwNzMtOGI0YThhN2Q4M2I4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"85/100"}],"Metascore":"85","imdbRating":"6.6","imdbVotes":"113,424","imdbID":"tt9243804","Type":"movie","DVD":"19 Aug 2021","BoxOffice":"$17,173,321","Production":"N/A","Website":"N/A","Response":"True"}]
const recentlist = document.getElementById('recentlist');
const mn = document.getElementById("createMovieNightid");
const movienightdata = [`<div class="movieNightCard"><div class="movieNightCardimg"><img src="./Images/Event Cover.svg" alt="" />

</div><h1>The Batman and Friends</h1><p><b>10:00 PM</b> Hi there! Me and Lex watching “The Batman”
  tonight. Join us it will be totely fun))</p>
<div class="movienightuser">
  <img src="./Images/32.svg" alt="" />
  <p>Elon Mask</p>
</div>
<button id="join" class="joinbtn marked">Yep, I'm in</button>
</div>`,`<div class="movieNightCard"><div class="movieNightCardimg"><img src="./Images/Event Cover.svg" alt="" />

</div><h1>The Batman and Friends</h1><p><b>10:00 PM</b> Hi there! Me and Lex watching “The Batman”
  tonight. Join us it will be totely fun))</p>
<div class="movienightuser">
  <img src="./Images/32.svg" alt="" />
  <p>Elon Mask</p>
</div>
<button id="join" class="joinbtn marked">Yep, I'm in</button>
</div>`
];
const movienightfiller = document.getElementById("movieNight");

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
    // console.log(searchitem)
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
                    moviedets.pop();
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
        // console.log(mov.Poster);
        // console.log(mov.Genre);

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
    makemovienight();

    console.log("hello")
}

function makemovienight() {
    const recentMovies = recentlist.querySelectorAll('.movieCard');
    recentMovies.forEach(e=>{
        console.log(e);
        e.addEventListener('click',async()=>{
            mn.innerHTML='';
            const cmnc = document.createElement('div');
            cmnc.classList.add("createMovienightContent")
            cmnc.innerHTML=`<h2 id="toaddmovieid">${e.childNodes[2].textContent}</h2>
            <div class="createMovieNightimg">
              <img src="${e.firstChild.childNodes[1].src}" alt="" />
            </div>
            <input id="desc" class="desc" type="text" placeholder="Add Desc" />
            <input id="time" class="time" type="time" />
            <div class="btns">
              <button onclick="addMovie()">ADD</button>
              <button onclick="hideaddMN()">CANCEL</button>
            </div>`
            mn.append(cmnc)
            mn.classList.remove("inactiveMovieNight");
            console.log(e);
            console.log(e.firstChild.childNodes[1].src);
            console.log(e.childNodes[2])
            if(e.firstChild.firstChild.tagName==="img"){
                console.log("e.src");
            }
        })
    })
}
function addMovie(){
    let movname = document.getElementById('toaddmovieid').textContent;
    console.log(moviedets.Title);
    moviedets.forEach(movie=>{
        if(movie.Title===movname){
            console.log("hello i found it");
            // if(movienightdata.includes(''))
            if(document.getElementById("desc").value.length ==0){
                alert("Failed! please add Description");

            }else if(document.getElementById("time").value==0){
                alert("Failed! please add Time");

            }
            else{
                movienightdata.push(`<div class="movieNightCard"><div class="movieNightCardimg"><img src=${movie.Poster!="N/A"?movie.Poster:"./Images/image-not-found-icon.svg"} alt="" />
                </div><h1>${movie.Title}</h1><p><b>${document.getElementById("time").value}</b>${document.getElementById("desc").value}</p>
                <div class="movienightuser">
                  <img src="./Images/32.svg" alt="" />
                  <p>Elon Mask</p>
                </div>
                <button id="join" class="joinbtn marked">Yep, I'm in</button>
                </div>`)
                movienight();

            }

        }


    })
    console.log(moviedets.indexOf(Title=movname));
    console.log(document.getElementById('toaddmovieid').textContent)

    const amn = document.getElementById("createMovieNightid");
    // const description = document.getElementById("desc").value;
    // const movietime = document.getElementById("time").value;
    // console.log(description);
    // console.log(movietime);

    console.log(amn);
    mn.classList.add("inactiveMovieNight");
    
}
function hideaddMN(){
    mn.classList.add("inactiveMovieNight");
}
movienight();

function movienight() {
    movienightfiller.innerHTML="";
    movienightdata.forEach(m=>{
        console.log(m);
        movienightfiller.innerHTML+=m;
    })
}