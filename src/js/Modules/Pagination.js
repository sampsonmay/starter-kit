const Pagination = ( responseCallback ) => {

    const pagination = document.querySelector("[data-pagination]");
    if( !pagination )
        return;

    const pages = pagination.querySelectorAll("a");
    
    const handleClick = (e) => {

        e.preventDefault();

        let target = e.currentTarget;
        let value = target.dataset.value;
        let uri = target.dataset.uri;
                        
        responseCallback("page", value, uri);
        
    }


    // EVENTS
    pages.forEach(page => {
        page.addEventListener("click", handleClick)
    });

};

export default Pagination;
