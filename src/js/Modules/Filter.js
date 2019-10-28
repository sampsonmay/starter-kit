const Filter = ( responseCallback ) => {
    
    const filter = "[data-filter]";
    const filterElements = document.querySelectorAll(filter);

    if( !filterElements.length ) return;

    const filterSelected = document.querySelectorAll("[data-filter-selected]");
    const activeClass = "is-active";

    // Close
    const close = () => {
        filterElements.forEach(filter => {
            filter.classList.remove(activeClass)
        });
    };
    
    // Handle Toggle
    const handleToggle = (e) => {
        close();
        e.currentTarget.closest(filter).classList.toggle(activeClass);
    }

    const handleOption = (e) => {
        e.preventDefault();

        const target = e.currentTarget;
        let value = target.dataset.value;
        let uri = target.dataset.uri;

        target.closest(filter).querySelector("[data-filter-selected]").querySelector("span").innerHTML = target.innerHTML;

        close();

        responseCallback("filter", value, uri);

    }

    // EVENTS

    // Toggle Filter
    filterSelected.forEach(selected => {
        selected.addEventListener("click", handleToggle);
    });

    // Click filter options
    filterElements.forEach(filter => {
        let filterOptions = filter.querySelectorAll("a");
        
        filterOptions.forEach(option => {
            option.addEventListener("click", handleOption);
        });
    });
    
    // Close on escape
    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            close();
        }
    });

    // Close on click
    document.addEventListener("click", (e) => {
        if( !e.target.closest(filter) ) { 
            close();   
        }
    });
    
}

export default Filter;
