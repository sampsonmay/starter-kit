const Video = () => {
    
    const videoElements = document.querySelectorAll('[data-video]');
    if( !videoElements.length ) return;
    
    // Handle Video
    const handleVideo = (e) => {
        e.preventDefault();
        
        let target = e.currentTarget;
        let url = target.dataset.video;

        let videoHolder = target.querySelector('[data-video-holder]');
        
        videoHolder.innerHTML = '<iframe class="media__item" src="' + url + '" frameborder="0" allow="autoplay; fullscreen" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

        target.classList.add("is-active");
    };


    // BIND EVENTS
    videoElements.forEach(el => {
        el.addEventListener("click", handleVideo);
    });

};

export default Video;