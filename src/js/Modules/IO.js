class Observer {
    
    constructor(...args) {
        let opts = args[0];

        this.elements = document.querySelectorAll(opts.elements) || null;
        if( !this.elements.length > 0 || null == this.elements ) return;
                
        if (!('IntersectionObserver' in window)) {
            this.DoObservered();
        } else {
            this.StartObserving();
        }
    }


    /**
     * @method DoObserver
     * @description Complete the animations on page load without the IntersectionObserver (Not supported)
     */
    DoObservered() {

        // Fallback for the browsers that don't support IntersectionObserver

    }


    /**
     * @method StartObserving
     * @description 
     */
    StartObserving() {
        let observer = new IntersectionObserver(function(entries, self) {
            entries.forEach(function(entry) {
                if(entry.isIntersecting) {
                    
                    var el = entry.target;

                    // Do something with the element that is now being observed
                    console.log("Element:", el);

                    // Once the element has been "intersected", then we unobserve it.
                    self.unobserve(el);

                }
            });
        });
        this.elements.forEach(function(el) {
            observer.observe(el);
        });
    }
}

export default Observer;