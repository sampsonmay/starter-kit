// CSS Import
import '../scss/style.scss';

// JavaScript Modules
import Carousels from './Modules/Carousels';
import Cookies from './Modules/Cookies';
import IO from './Modules/IO';
import Response from './Modules/Response';
import Tables from './Modules/Tables';
import Video from './Modules/Video';

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
