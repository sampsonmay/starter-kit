import _ from "lodash";

const b = document.body;

let activeCloseCallback = null;
let activeOpenCallback = null;

const removeOcClasses = () => {
    var offCanvasClasses = b.className.split(" ").filter( x => x.lastIndexOf("oc-", 0) !== 0 ); 
    b.className = offCanvasClasses.join(" ").trim();
}

const OffCanvas = (id, openCallback = null, closeCallback = null, closeIfOpen = true) => {
    
    const b = document.body;

    // Set an active callback
    activeOpenCallback = openCallback;
    activeCloseCallback = closeCallback;

    // If the body contains the class already, remove it.
    if(closeIfOpen) {
        if(b.classList.contains(id)) {
            b.classList.remove(id);

            // Run the close callback
            if(typeof(activeCloseCallback) == 'function') {
                activeCloseCallback(); 
            }

            return;
        }
    }

    // Remove all other off canvas classes, and apply selected
    removeOcClasses();
    b.classList.add(id);

    // Run the open callback
    if(typeof(activeOpenCallback) == 'function') {
        activeOpenCallback();
    }
}

const OffCanvasKeyBindings = (() => {
    
    window.addEventListener("keydown", function() {
        if (event.keyCode === 27) {
            removeOcClasses();
            
            // Add a callback for doing other tasks to the 
            if(typeof(activeCloseCallback) == 'function') {
                activeCloseCallback();
            }
        }
    });

    window.addEventListener("click", e => {
        const classesToCheck = ["popup__inner", "mask"];
        for( var i = 0; i < classesToCheck.length; i++) {
            if(e.target.classList.contains(classesToCheck[i])) {
                
                // Add a callback for doing other tasks to the 
                if(typeof(activeCloseCallback) == 'function') {
                    activeCloseCallback();
                }

                removeOcClasses();
                break;    
            }    
        }

    });
    
})();


export { OffCanvas, removeOcClasses };