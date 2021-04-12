class Observer {
    
    constructor(...args) {
        let opts = args[0];
        
        this.elements = opts.elements || null;

        if( !this.elements.length > 0 || null == this.elements ) return;
                
        if (!('IntersectionObserver' in window)) {
            this.elements.forEach(opts.callback);
        } else {
            this.StartObserving(opts.callback);
        }
    }

    StartObserving(callback) {
        let observer = new IntersectionObserver(function(entries, self) {
            entries.forEach(function(entry) {
                if(entry.isIntersecting) {
                    
                    var el = entry.target;

                    // Do something with the element that is now being observed
                    callback(el);

                    // Once the element has been "intersected", then we unobserve it.
                    observer.unobserve(el);

                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px'
        });
        this.elements.forEach(function(el) {
            observer.observe(el);
        });
    }
}

export default Observer;