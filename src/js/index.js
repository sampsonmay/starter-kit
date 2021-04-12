// CSS Import
import '../scss/style.scss';

// JavaScript Modules
import Carousels from './Modules/Carousels';
import Cookies from './Modules/Cookies';
import IO from './Modules/IO';
import Tables from './Modules/Tables';

// Polyfills
import PolyFills from './Utils/Polyfills';
PolyFills();

var SiteName = (function () {

    console.log("Project Started...");

    Cookies();  
    Carousels();
    Tables();

})();
