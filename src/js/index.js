// CSS Import
import '../scss/style.scss';

// JavaScript Modules
import Example from './modules/Example';
import IO from './modules/IO';

// Polyfills
import PolyFills from './Utils/Polyfills';
PolyFills();

var SiteName = (function () {
    
    Example();
    
    window.addEventListener("load", function(event) {
        var Observer = new IO({
            elements: '[data-animate]'
        });
    });

})();