/**
 * Created by Phugh on 26/01/2020.
 */

import {
    apiKey,
    baseUrl,
    imageBaseUrl,
    carouselImageSize,
    nowPlayingParams,
    comingSoonParams
} from "./config.js";
import {
    getApi,
    getRating
} from "./shared-functions.js";

const nowPlayingUrl = baseUrl.concat("movie/now_playing?api_key=", apiKey);
const comingSoonUrl = baseUrl.concat("movie/upcoming?api_key=", apiKey, "&language=en-US&page=1&region=GB");

initCarousels();

async function initCarousels() {
    const nowPlayingBody = await getApi(nowPlayingUrl);
    const comingSoonBody = await getApi(comingSoonUrl);
    writeCarousel(nowPlayingBody, nowPlayingParams);
    writeCarousel(comingSoonBody, comingSoonParams);
}

function writeCarousel(data, params) {
    const results = data.results;
    const el = params.el;

    const items = results.map(result => {
            const rating = getRating(result.vote_average, result.vote_count);

            if (result.poster_path != null) {
                const poster = imageBaseUrl.concat(carouselImageSize, result.poster_path);
                return `<div class=${params.className}>
                            <div class="carousel-link-wrapper">
                                <a class="carousel-item-link" href="${"movie-details.html".concat("?query=",result.id)}">
                                    <img src=${poster}>
                                    <div class="rating">${rating}</div>
                                </a>
                            </div>
                        </div>`;
            }
        }
    );
    el.append(items);
    $(document).ready(function () {
        el.slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 3,
            nextArrow: params.nextArrow,
            prevArrow: params.prevArrow,
            responsive: [{
                breakpoint: 1540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
                {
                    breakpoint: 1180,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 875,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 620,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
}