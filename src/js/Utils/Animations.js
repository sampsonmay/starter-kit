import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IO from './IntersectionObserver';

gsap.registerPlugin(ScrollTrigger);


export function CSSAnimations(el) {
    
    const elements = el ? el.querySelectorAll("[data-anim]") : document.querySelectorAll("[data-anim]");

    // Check to see if any of the onpage elements, need to fire immediataley regardless of IO state.
    elements.forEach(x => {
        if(x.dataset.anim == "init") {
            x.removeAttribute("data-anim");
        }
    });

    // Wait for the element to come in to view using IntersectionObserver
    const IOAnimator = new IO({
        elements: elements,
        callback: function(el) {
            el.removeAttribute("data-anim");
        }
    });
}


export function GSAPAnimations(el) {

    const batchTrigger = (els, opts) => {
        ScrollTrigger.batch(els, {
            once: true,
            onEnter: batch => gsap.from(batch, {
                autoAlpha: 0,
                opacity: 0,
                y: 70,
                stagger: 0.2,
                duration: 0.75,
                ...opts
            })
        });
    }

    // Batch Animations
    const x = el ? el.querySelectorAll(".x:not([style])") : document.querySelectorAll(".x");
    if(x.length) {
        batchTrigger(x)
    }

    // Standard stagged animations for text elements
    const reveal = el ? el.querySelectorAll("[data-reveal]") : document.querySelectorAll("[data-reveal]");

    if(reveal.length) {
        reveal.forEach(el => {

            const elements = el.querySelectorAll('[data-reveal-sub]');

            gsap.from(elements, {
                autoAlpha: 0,
                opacity: 0,
                y: 70,
                stagger: 0.2,
                duration: 0.75, 
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                },
                onComplete: function() {
                    el.removeAttribute("data-reveal");
                    this._targets.forEach(x => {
                        x.removeAttribute("data-reveal-sub")
                        x.removeAttribute("style")
                    });
                }
            });

        });
    }
}


export default function Animations() {

    // Check for reduced motion
    if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    // Watch for custom CSS animation
    CSSAnimations();

    // Watch for scroll triggers
    GSAPAnimations();

}
