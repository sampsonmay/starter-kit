// CSS Import
import '../scss/modules.scss';

// Utils
import Animations from './Utils/Animations';

(function () {

    if(document.querySelector(".swiper-container")) {
        import(/* webpackExports: ["default"] */ "./Modules/Carousels").then(module => module.default());
    }
    
    if(document.querySelector(".editor")) {
        import(/* webpackExports: ["default"] */ "./Modules/Editor").then(module => module.default());
    }

    if(document.querySelector("[data-video]")) {
        import(/* webpackExports: ["default"] */ "./Modules/Video").then(module => module.default());
    }

    if(document.querySelector("[data-accordion]")) {
        import(/* webpackExports: ["default"] */ "./Modules/Accordion").then(module => module.default());
    }

    // Animations
    Animations();
    
})();