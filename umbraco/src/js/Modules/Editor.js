const Editor = () => {

    /**
     * Tables
     * Wrap all tables inside of a table class
     */
    const tables = document.querySelectorAll(".editor table");
    if(tables.length) {
        for( let i = 0; i < tables.length; i++ ) {
            let wrapper = document.createElement("div");
                wrapper.classList.add("table"); 
                tables[i].parentNode.insertBefore(wrapper,tables[i]);
            wrapper.appendChild(tables[i]);
        }
    }


    /**
     * Figures + Captions
     * Take the width of the image and apply it to the
     * <figure> element
     */
    let figures = editor.querySelectorAll("figure");
    if(figures) {
        figures.forEach(x => {
            let img = x.querySelector("img");
            let w = img.width;

            x.style.width = w + 'px';
            
        });
    }

}

export default Editor;