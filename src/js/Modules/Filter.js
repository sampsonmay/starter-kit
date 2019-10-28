const Filter = (callback) => {
    
    const filter = "[data-filter]";
    const filterEl = document.querySelector(filter);
    if( !filterEl )
        return;

    const filterSelected = filterEl.querySelector("[data-filter-selected]");
    const filterOptions = filterEl.querySelectorAll("a");
    const activeClass = "is-active";

    // Close
    const close = () => filterEl.classList.remove(activeClass);
    
    // Handle Toggle
    const handleToggle = (e) => { filterEl.classList.toggle(activeClass) };

    const handleOption = (e) => {
        e.preventDefault();

        const target = e.currentTarget;
        let value = target.dataset.value;
        let uri = target.dataset.uri;

        if( target.classList.contains(activeClass) ) return;

        filterSelected.querySelector("span").innerHTML = value;

        close();

        callback("filter", value, uri);

    };

    // Binding
    filterSelected.addEventListener("click", handleToggle);

    filterOptions.forEach(option => {
        option.addEventListener("click", handleOption);
    });

};

export default Filter;
