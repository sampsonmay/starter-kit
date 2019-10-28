const Cookies = () => {
    
    const cookieOpeners = document.querySelectorAll('.js-cookies-open');
    if ( cookieOpeners.length < 1 ) return;
    
    for( let i = 0; i < cookieOpeners.length; i++ ) {
        cookieOpeners[i].addEventListener("click", function(e) {
            e.preventDefault();
        });
    }
};

export default Cookies;