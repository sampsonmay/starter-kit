import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
Swiper.use([Autoplay, Navigation, Pagination]);

import 'swiper/css';

export const Example = () => {
    const swipers = document.querySelectorAll("[data-swiper-example]");
    if(!swipers.length) return;
    swipers.forEach(x => {
        const swiper = new Swiper(x, {
            speed: 500,
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchOverflow: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3
                }
            },
            navigation: {
                nextEl: x.querySelector('.swiper-button-next'),
                prevEl: x.querySelector('.swiper-button-prev')
            },
            pagination: {
                el: x.querySelector('.swiper-pagination'),
                clickable: true
            }
        });
    });
}


const Carousels = () => {

    Example();
    
}
export default Carousels;