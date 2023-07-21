function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

const FetchAPI = (url, method, data, success, error) => {
    fetch(url, {
        method: method,
        body: data || null
    })
    .then(handleErrors)
    .then(function(response) {
        return (response.headers.get("content-type").indexOf("application/json")) !== -1 ? response.json() : response.text();
    })
    .then(function(data) {

        if(typeof success === "function")
            success(data, url);

    })
    .catch(function(e) {
        if(typeof error === "function")
            error();
        
    });
}

export default FetchAPI;