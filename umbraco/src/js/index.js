import { debounce } from 'lodash';

// CSS Import
import '../scss/main.scss';

// Modules
import Header from './Modules/Header';
import Navigation from './Modules/Navigation';
import Search from './Modules/Search';

(function () {

    Header();
    Navigation();
    Search();

    // Keep track of the viewport height, fo elements that need to be 100% on mobile.
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener("resize", debounce(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 200));

})();
