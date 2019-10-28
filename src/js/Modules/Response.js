import Tabs from './Tabs';
import Filter from './Filter';
import Pagination from './Pagination';
import IO from "./IO";

const Response = () => {
    
    const response = "[data-response]";
    const responseEl = document.querySelector(response);

    // The page must contain a response container ("[data-response]") for this module to run
    if(!responseEl) return;

    // Define additional variabes once we know the response container exists
    const domParser = new DOMParser();
    const isLoadingClass = "is-loading";
    let query = "?";

    // Create the default objects for all elements that can have an effect on the response
    let options = {
        filter: {},
        tab: {},
        page: {}
    };

    /**
     * Fetch Results Callback
     * 
     * @param {string} type 
     * @param {string} value 
     * @param {string} uri 
     * @param {int} page
     */
    const fetchResponse = (type, value, uri) => {

        // Apply a loading class to the response container
        responseEl.classList.add(isLoadingClass)

        // Reset query
        query = "?request";

        // Update the object with the selection and value
        options[type][uri] = value;

        // Loop through object to build query string
        for (var option in options) {
            if( options.hasOwnProperty(option) ) {
                let objOption = options[option];
                for (var o in objOption) {
                    if( o && objOption[o] ) {
                        query += '&' + o + '=' + objOption[o];
                    }
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

            if( results.querySelectorAll("div:not([data-animate])").length > 0 ) {

                responseEl.innerHTML = results.innerHTML;

                Pagination(fetchResponse);
                
                var Observer = new IO({
                    elements: '[data-animate]'
                });

            } else {
                
                responseEl.innerHTML = "<p class=\"standfirst\">There doesn't seem to be any results that match your filter(s)</p>";

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

}

export default Response;