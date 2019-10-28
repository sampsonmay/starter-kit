import 'whatwg-fetch';
import Tabs from './Tabs';
import Filter from './Filter'; 
import Pagination from './Pagination';

const Response = () => {
    
    const domParser = new DOMParser();
    const response = "[data-response]";
    const responseEl = document.querySelector(response);

    if( !responseEl )
        return;

    const isLoadingClass = "is-loading";

    let options = {
        filter: {},
        tab: {}
    };

    let query = "?";
    
    // Fetch Rsults
    const fetchResponse = (type, value, uri, page) => {
        
        // Loading
        responseEl.classList.add(isLoadingClass)

        // Create object
        options[type] = {
            uri,
            value
        };

        // Reset query
        query = "?request";

        // Reset query
        query = "?request";

        if( page ) {
            query += "&page="+page
        }
        else 
        {
            options[type][uri] = value;
        }
        
        // Loop through object to buildup query string
        for (var option in options) {
            if( options.hasOwnProperty(option) ) {
                let objOption = options[option];
                if( objOption.uri && objOption.value ) {
                    query += '&' + objOption.uri + '=' + objOption.value;
                }
            }
        }

        // Make HTTP Request
        fetch(query, {
            method: "get"
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            var results = domParser.parseFromString(text, "text/html");
                results = results.querySelector("[data-response]");

            if( results.querySelectorAll("div").length > 0 ) {

                responseEl.innerHTML = results.innerHTML;
                Pagination(fetchResponse);

            } else {
                
                responseEl.innerHTML = "No results";

            }

            // Scroll to the top of the response
            responseEl.scrollIntoView({
                behavior: 'smooth'
            });

            // Remove loading
            responseEl.classList.remove(isLoadingClass);

        });
        
    };

    Tabs(fetchResponse);    
    Filter(fetchResponse);
    Pagination(fetchResponse);

};

export default Response;