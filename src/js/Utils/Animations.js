import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GSAPAnimations(el) {

    // Batch trigger function for items that that need to animate in a staggered formation as they come into view
    const batchTrigger = (batch, opts) => {
        gsap.set(batch.children, opts);
        ScrollTrigger.batch(batch.children, {
            once: true,
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                stagger: 0.2,
                duration: 0.75
            }),
            start: 'top 80%'
        });
    }
    
    // Batch
    const batch = gsap.utils.toArray("[data-batch]");
    if(batch.length) {
        batch.forEach(x => {
            batchTrigger(x, {
                autoAlpha: 0
            });
        });
    }
}

export default function Animations() {

    // Check for reduced motion
    if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    // Watch for scroll triggers
    GSAPAnimations();

}
