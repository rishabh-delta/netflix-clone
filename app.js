//consts
const api_key ="c4d6dcdc6e4f9c0f5ff2b0008690a879";
const endPoint= "https://api.themoviedb.org/3";
const imgPath="https://image.tmdb.org/t/p/original";
const apiPaths={
    fetchAllCategories:`${endPoint}/genre/movie/list?api_key=${api_key}`,
    fetchAllMovies:(id)=>`${endPoint}/discover/movie?api_key=${api_key}&with_genres=${id}`
};
//boots up the app

window.addEventListener("load",async function(){
     const res=axios.get(apiPaths.fetchAllCategories);
     res.then(response=>{const categories=response.data.genres;
    if (Array.isArray(categories)&&categories.length){
        categories.forEach(category=>{
           
             fetchAndbuildMovieSection(apiPaths.fetchAllMovies(category.id),category);   

        })
        
    }
    // console.table(categories);
    })
     .catch(err=>this.alert(`the page is not functioning with ${err}`));
});
async function fetchAndbuildMovieSection(fetchUrl,category){
    // console.log(fetchUrl,category);
    let result=axios.get(fetchUrl);
    result.then(res=>{
    const movies=res.data.results;
    console.log(movies);

    if(Array.isArray(movies)&&movies.length){
         buildMoviesSection(movies,category.name);
    }
})
    .catch((err)=>console.log(err));
}
//    function buildMoviesSection(list, categoryName){    
//     list.forEach((movie)=>{
//         const image=document.createElement("img");
//         image.src=`${imgPath}${movie.backdrop_path}`;
//         image.classList.add("movie-item");
//         const moviesSection=document.querySelector(".movies-row");
//         moviesSection.append(image);
//     });

//         const heading2=document.createElement('h2');
//         heading2.innerText=categoryName;
//         let heading=document.querySelector(".movies-section-heading");
//         heading.append(heading2);   
// }
    function buildMoviesSection(list,categoryName){
        console.log(list,categoryName);   
        const moviesCont=document.getElementById("movies-cont"); 
        const moviesListHtml=list.map(item=>{
            return `<img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">`;
        }).join();
    const moviesSectionHtml=`
            <h2 class="movies-section-heading">${categoryName} <span class="explore">Explore All</span></h2>
            <div class="movies-row">
                ${moviesListHtml}
            </div> `;

        console.log(moviesSectionHtml);

        const div=document.createElement("div");
        div.className="movies-section";
        div.innerHTML=moviesSectionHtml;

        // append Html into movies container
        moviesCont.append(div);
    }