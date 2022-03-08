let Swiper;

export const Example = () => {
    const swipers = document.querySelectorAll("[data-swiper-example]");
    if(!swipers.length) return;
    swipers.forEach(x => {
        const swiper = new Swiper(x, {
            speed: 500,
            slidesPerView: 1,
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
                type: 'bullets',
                clickable: true
            }
        });
    });
}

const Carousels = () => {
    import(/* webpackExports: ["default", "Autoplay", "Navigation", "Pagination"] */ "swiper").then((module) => {
        
        Swiper = module.default;
        Swiper.use([module.Autoplay, module.Navigation, module.Pagination]);
        
        // List of Carousels
        Example();

    });
}
export default Carousels;