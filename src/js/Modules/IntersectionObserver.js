class Observer {
    constructor() {
        this.items = document.querySelectorAll("[data-animate]");
        
        if( !this.items.length > 0 ) return;

        if (!('IntersectionObserver' in window)) {
            this.DoObservered();
        } else {
            this.StartObserving();
        }
    }

    DoObservered() {

        // Fallback for the browsers that don't support IntersectionObserver

    }

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
        this.items.forEach(function(item) {
            observer.observe(item);
        });
    }
}

export default Observer;