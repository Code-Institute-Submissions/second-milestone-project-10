/**
 * Created by Phugh on 29/01/2020.
 */
import {apiKey, baseUrl} from './config.js';

const guestSessionUrl = baseUrl.concat("/authentication/guest_session/new?api_key=", apiKey);
const movieId = window.location.href.split('?').pop();

$(document).ready(function() {
     $("i").click(function(){
         $("i").removeClass("selected");
         $(this).addClass("selected");
        });

     $("button").click(function(){
         submitRating();
      });
});

async function submitRating(){
    const rating = $(".selected").attr("value");
   /* const ratingResponse = await postRating(rating, sessionId());*/
    const id = await sessionId();
    const postRatingUrl = baseUrl.concat("movie/", movieId, "/rating?api_key=", apiKey, "&guest_session_id=", id );
    const ratingResponse = await fetch(postRatingUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"value" : rating})
    });
    writeRatingResponse(ratingResponse);
}

async function writeRatingResponse(response){
    const responseBody = await response.json();
    if(responseBody.status_code === 12){
       $("#rate").html("<p>You've already rated this movie</p>>")
    }else if (responseBody.status_code === 1){
       $("#rate").html("<p>Your rating has been submitted</p>>")
    }
};

async function sessionId(){
    var sessionId = localStorage.getItem("guest_session_id");
    if(sessionId === null){
        await getSessionIdData().then(data => {
            sessionId = data.guest_session_id;
            localStorage.setItem("guest_session_id",sessionId );
        });
    }
    return sessionId;
}

async function getSessionIdData(){
    const sessionIdData = await fetch(guestSessionUrl);
    return sessionIdData.json();
};
