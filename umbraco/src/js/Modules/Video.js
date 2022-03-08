import { OffCanvas, removeOcClasses } from "../Components/OffCanvas";
import Player from '@vimeo/player';

const Video = () => {
    
    const videos = document.querySelectorAll("[data-video]");
    const videoPlayer = document.querySelector("[data-video-player]");
    const el = videoPlayer.closest(".video");
    if(videos.length < 1) return;
    
    const close = document.querySelector("[data-close-video]");
    const videoClass = "oc-video";

    const closeVideo = () => {
        videoPlayer.innerHTML = "";
    }

    videos.forEach(video => {
        video.addEventListener("click", e => {
            e.preventDefault();

            const target = e.currentTarget;
            const url = target.dataset.video;
            let title = target.dataset.videoTitle;
            let playerHost = (url.indexOf("vimeo") != -1) ? "vimeo" : "youtube";
            let playerId = "player_" + Math.floor((Math.random() * 100) + 1);

            // Title
            if(title != undefined) { el.querySelector("[data-video-mainTitle]").innerHTML = title }

            // Add the iframe to the player
            videoPlayer.innerHTML = '<iframe sandbox="allow-scripts allow-same-origin" id="'+playerId+'" class="media__item" src="' + url + '&playsinline=0" frameborder="0" allow="autoplay; fullscreen" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            
            // Vimeo
            if(playerHost == "vimeo") {
                let player = new Player(videoPlayer.querySelector("iframe"));
                let title = "";

                window.dataLayer = window.dataLayer || [];

                player.getVideoTitle().then(function(t) {
                    title = t;
                }).catch(function(error) {
                    title = url
                })
                const percentages = [25,50,75,100];
                const percentagesReached = [];

                player.on('play', function(data) {
                    if(data == undefined) return;
                    window.dataLayer.push({
                        'event': 'videoUpdate', 
                        'videoAction': "Start playing",
                        'videoName': title
                    });
                });

                player.on('timeupdate', function(data) {
                    let currentPercent = Math.ceil(data.percent * 100);
                    for (var i = 0; i < percentages.length; i++) {
                        if(currentPercent == percentages[i] && !percentagesReached.includes(percentages[i])) {
                            percentagesReached.push(percentages[i]);
                            
                            window.dataLayer.push({
                                'event': 'videoUpdate',
                                'videoAction': currentPercent == 100 ? "Reached the end" : "Reached " + currentPercent + "%",
                                'videoName': title
                            });

                        }
                    }
                });

            } else {

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'videoYouTubeInit'
                });

            }
            
            // Show the canvas
            OffCanvas(videoClass, null, closeVideo);

        })
    });
    
    close.addEventListener("click", () => {
        removeOcClasses();
        closeVideo();
    });
}



export default Video;