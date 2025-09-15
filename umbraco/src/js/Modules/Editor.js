const Editor = () => {
    
    const editors = document.querySelectorAll(".editor");

    editors.forEach(editor => {

        
        
        /**
         * Tables
         * Wrap all tables inside of a table class
         */
        const tables = editor.querySelectorAll(".editor table");
        if(tables.length) {
            for( let i = 0; i < tables.length; i++ ) {
                let wrapper = document.createElement("div");
                    wrapper.classList.add("table"); 
                    tables[i].parentNode.insertBefore(wrapper,tables[i]);
                wrapper.appendChild(tables[i]);
            }
        }
    });

}

export default Editor;