// CSS Import
import '../scss/modules.scss';

(function () {

    const modules = {
        '.editor':      () => import('./Modules/Editor')
    };

    function importModule(importFunc) {
        importFunc().then(({ default: init }) => init());
    }

    Object.entries(modules).forEach(([selector, getImportFunc]) => {
        if (document.querySelector(selector)) {
            importModule(getImportFunc);
        }
    });

    
    
    // Animations
    window.addEventListener("load", () => {
        import('./Utils/Animations').then(({ default: init }) => init());
    })
    
})();