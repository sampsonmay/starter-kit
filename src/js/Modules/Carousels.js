import Swiper from 'swiper';

const Carousels = () => {
    
    var Carousel = new Swiper("[data-swiper-carousel]", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination'
        }
    });

}
export default Carousels;