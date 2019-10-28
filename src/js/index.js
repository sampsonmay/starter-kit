// CSS Import
import '../scss/style.scss';

// JavaScript Modules
import Carousels from './modules/Carousels';
import Cookies from './Modules/Cookies';
import Response from './modules/Response';
import Tables from './Modules/Tables';
import Video from './modules/Video';

// Polyfills
import PolyFills from './Utils/Polyfills';
PolyFills();

var SiteName = (function () {

    console.log("Project Started...");

    Cookies();  
    Carousels();
    Response();
    Tables();
    Video();

    window.addEventListener("load", function(event) {
        var Observer = new IO({
            elements: '[data-animate]'
        });
    });

})();
