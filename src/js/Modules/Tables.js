const Tables = () => {
    
    const tables = document.querySelectorAll(".editor table");
    if( tables.length < 1 ) return;

    for( let i = 0; i < tables.length; i++ ) {
            
        let wrapper = document.createElement("div");
            wrapper.classList.add("table"); 

        tables[i].parentNode.insertBefore(wrapper,tables[i]);
        wrapper.appendChild(tables[i]);

    }
}

export default Tables;