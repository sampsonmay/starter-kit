// CSS Import
import '../scss/style.scss';

// JavaScript Modules
import Example from './modules/Example';
import IntersectionObserver from './modules/IntersectionObserver';

var SiteName = (function () {
    
    Example();
    
    window.addEventListener("load", function(event) {
        var Observer = new IntersectionObserver({
            elements: '[data-animate]'
        });
    });

})();