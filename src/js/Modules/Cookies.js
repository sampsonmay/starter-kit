const Cookies = () => {
    const el = document.querySelectorAll('.js-cookies-open');
    for( let i = 0; i < el.length; i++ ) {
        el[i].addEventListener("click", function(e) {
            e.preventDefault();
        });
    }
};

export default Cookies;