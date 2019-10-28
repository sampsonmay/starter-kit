const Pagination = ( responseCallback ) => {

    const pagination = document.querySelector("[data-pagination]");
    if( !pagination )
        return;

    const pages = pagination.querySelectorAll("a");
    
    const handleClick = (e) => {

        e.preventDefault();

        let target = e.currentTarget;
        let page = target.dataset.page;
                        
        responseCallback("pagination", null, null, page);
        
    }


    // Bind
    pages.forEach(page => {
        page.addEventListener("click", handleClick)
    });

};

export default Pagination;
