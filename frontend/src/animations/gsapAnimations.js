import gsap from "gsap";

export const fadeIn = (target, options = {}) =>
  gsap.fromTo(target, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", ...options });

export const slideUp = (target, options = {}) =>
  gsap.fromTo(target, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", ...options });

export const staggerChildren = (targets, options = {}) =>
  gsap.fromTo(targets, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55, ease: "power2.out", ...options });