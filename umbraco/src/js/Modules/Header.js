import Headroom from "headroom.js";

const Header = () => {
    const headroom = new Headroom(document.querySelector("[data-header]"), {
        tolerance: {
            up: 15,
            down: 0
        }
    });
    headroom.init();
}

export default Header;