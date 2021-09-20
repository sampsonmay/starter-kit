// CSS Import
import '../scss/style.scss';

// Polyfills
import PolyFills from './Utils/Polyfills';

// Vendors
import objectFitImages from 'object-fit-images';

(function () {

    objectFitImages();
    PolyFills();

    if(document.querySelector(".swiper-container")) {
        import(/* webpackExports: ["default"] */ "./Modules/Carousels").then(module => module.default());
    }
    
})();
