// CSS Import
import '../scss/main.scss';

// Polyfills
import PolyFills from './Utils/Polyfills';

// Vendors
import objectFitImages from 'object-fit-images';

(function () {

    objectFitImages();
    PolyFills();

})();
