// CSS Import
import '../scss/style.scss';

// Utils
import Animations from './Utils/Animations';

// JavaScript Modules
import Carousels from './Modules/Carousels';
import Cookies from './Modules/Cookies';
import Tables from './Modules/Tables';

// Polyfills
import PolyFills from './Utils/Polyfills';
import objectFitImages from 'object-fit-images';

PolyFills();
objectFitImages(); 

var ProjectName = (function () {

    Carousels();
    Tables();
    
    Animations();

    Cookies();

})();
