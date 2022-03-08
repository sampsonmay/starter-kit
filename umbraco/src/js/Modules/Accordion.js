const Accordion = () => {

    const groups = document.querySelectorAll("[data-accordion-group]");
    if(groups.length < 1) return;

    const activeClass = "is-active";

    // Open/Close accodtions within the accordion group
    const handleAccordion = (el, group) => {
        let target = el;
        let accordion = target.closest("[data-accordion]");
        let body = accordion.querySelector("[data-accordion-body]");
        let height = body.querySelector("[data-accordion-height]").clientHeight;

        // If the accordion is already open, close it
        if(accordion.classList.contains(activeClass)) {
            accordion.classList.remove(activeClass);
            body.removeAttribute("style");
            return;
        }

        // Loop through the other accordions, and close them, then open the selected one
        group.querySelectorAll("[data-accordion]").forEach(x => {
            x.classList.remove(activeClass);
            x.querySelector("[data-accordion-body]").removeAttribute("style");
        });
        body.style.maxHeight = height + "px";
        accordion.classList.add(activeClass);
    }
 
    // Loop all accordion groups
    groups.forEach(group => {
        const toggles = group.querySelectorAll("[data-accordion-toggle]");
        if(toggles.length) {
            toggles.forEach(toggle => {
                toggle.addEventListener("click", (e) => {
                    e.preventDefault();
                    handleAccordion(e.currentTarget, group);
                });
            });
        }
    });

    // Open accordion on load if hash tag is there
    const accordionHash = window.location.hash.split("#")[1];
    if(accordionHash != null && accordionHash != "") {
        const accordionToOpen = document.querySelector('[data-accordion="'+accordionHash+'"]');
        if(accordionToOpen && !accordionToOpen.classList.contains(activeClass)) {
            accordionToOpen.classList.add(activeClass);
            
            setTimeout(() => {
                accordionToOpen.scrollIntoView();
            }, 4000);

        }
    }

}

export default Accordion;