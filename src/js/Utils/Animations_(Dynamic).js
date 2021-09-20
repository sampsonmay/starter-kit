let gsap, ScrollTrigger;

const batchEnter = (els, opts) => {
    ScrollTrigger.batch(els, {
        once: true,
        start: 'top 80%',
        onEnter: batch => gsap.from(batch, {
            autoAlpha: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ...opts
        })
    });
}

export const initAnimations = () => {
    
    const batch = gsap.utils.toArray("[data-batch]");
    if(batch.length) {
        batch.forEach(x => {
            batchEnter(x.children, {
                y: 100
            });
        });
    }

    const blocks = gsap.utils.toArray('[data-block]');
    blocks.forEach(x => {
        gsap.timeline({
            scrollTrigger: {
                trigger: x,
                start: 'top 80%',
            }
        }).from(x.children, {autoAlpha: 0, y: 75, duration: 1, stagger: 0.1})
    });

}

export const callbackAnimations = (el) => {
    
    const items = el ? el.querySelectorAll(".item:not([style])") : document.querySelectorAll(".item");
    if(items.length) {
        batchEnter(items, {
            x: 100
        })
    }

}

export default function Animations() {

    // Check for reduced motion
    if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    
    Promise.all([
        import(/* webpackExports: ["default"] */ "gsap"),
        import(/* webpackExports: ["ScrollTrigger"] */ "gsap/scrollTrigger")
    ]).then(([d, s]) => {

        gsap = d.default;
        ScrollTrigger = s.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Animations that are set and won't be set again (Not included in callbacks)
        initAnimations();

        // Watch for scroll triggers
        callbackAnimations();

    });
    
}
