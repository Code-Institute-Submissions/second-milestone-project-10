/**
 * Created by Phugh on 26/01/2020.
 */

import {apiKey, baseUrl, imageBaseUrl, searchResultsImageSize} from './config.js';

const searchTerm = window.location.href.split('?').pop();
    if (searchTerm !== ""){

        const movieUrl = "".concat(baseUrl, "search/movie?api_key=", apiKey, '&query=', searchTerm);

        const movieData = getMovies(movieUrl);

        writeMovieList(movieData);
};

async function getMovies(url){
    const data = await fetch(url);
    return data.json();
};

function writeMovieList(data){
    data.then(data => {
        const results = data.results;
        const el = $('#movieList');
        const list = results.map(result => {
            const score = result.vote_average;
            var starClasses = [];
                if(score < 1){
                     starClasses = ['far', 'far', 'far', 'far', 'far'];
                } else if(score < 3){
                     starClasses = ['fas', 'far', 'far', 'far', 'far'];
                } else if(score < 5){
                     starClasses = ['fas', 'fas', 'far', 'far', 'far'];
                } else if(score < 7){
                    starClasses = ['fas', 'fas', 'fas', 'far', 'far'];
                } else if(score < 9){
                    starClasses = ['fas', 'fas', 'fas', 'fas', 'far'];
                } else {
                    starClasses = ['fas', 'fas', 'fas', 'fas', 'fas'];
                }
            const stars = starClasses.map(item => {
                return `<i class="${item} fa-star"></i>`
            });
            const rating = result.vote_count > 0 ? stars.join("") : `<span>Not rated yet</span>`;

                const year = result.release_date.slice(0,4);
                    return `<div class="col-sm-6 col-md-4 col-lg-3 search-item-wrapper">
                                <div class="search-item">
                                    <a href="${"movie-details.html".concat("?",result.id)}">
                                    <img src="${imageBaseUrl.concat(searchResultsImageSize, result.poster_path)}">
                                    </a>
                                <div class="search-item-details">
                                    <a href="${"movie-details.html".concat("?",result.id)}">
                                       ${result.title}
                                    </a>
                                    <span>(${year})</span>
                                </div>
                                <div class="rating">${rating}</div> 
                                </div>
                            </div>`;
                }
        )
        el.html(list);
    })
}