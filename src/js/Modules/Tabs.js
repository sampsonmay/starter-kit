const Tabs = (callback) => {
    
    const tabs = "[data-tabs]";
    const tabsEl = document.querySelector(tabs);

    if( !tabsEl )
        return;

    const tabOptions = tabsEl.querySelectorAll("a");
    const activeClass = "is-active";

    
    // Handle Tab
    const handleTab = (e) => {
        e.preventDefault();

        const target = e.currentTarget;
        let value = target.dataset.value;
        let uri = target.dataset.uri;

        if( target.classList.contains(activeClass) ) return;

        tabOptions.forEach(tab => {
            tab.classList.remove(activeClass);
        });
        target.classList.add(activeClass);

        callback("tab", value, uri);

    };


    // Bind
    tabOptions.forEach(tab => {
        tab.addEventListener("click", handleTab);
    });
    
};

export default Tabs;
