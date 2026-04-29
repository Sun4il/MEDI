import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { createIntroCapsuleScene } from "../../animations/introCapsuleScene";

const collectTargets = (selector) =>
  typeof document === "undefined" ? [] : Array.from(document.querySelectorAll(selector));

const IntroSequence = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const canvasHostRef = useRef(null);
  const liquidRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressValueRef = useRef(null);
  const statusRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const sceneController = createIntroCapsuleScene(canvasHostRef.current);
    const sceneState = sceneController?.state ?? { split: 0 };
    const progressState = { value: 0 };

    const revealGroups = {
      navbar: collectTargets(".navbar--home"),
      hero: collectTargets(".home-hero__content > *"),
      stats: collectTargets(".home-stats .home-stat"),
      sectionHeaders: collectTargets(".home-section__header"),
      featureCards: collectTargets(".home-featureCard"),
      steps: collectTargets(".home-step"),
      ownerCard: collectTargets(".home-ownerCard"),
      testimonials: collectTargets(".home-testimonialCard"),
      finalCta: collectTargets(".home-finalCta"),
      footer: collectTargets(".footer--home"),
    };

    const hiddenTargets = Object.values(revealGroups).flat();

    if (hiddenTargets.length > 0) {
      gsap.set(hiddenTargets, { autoAlpha: 0, y: 24, willChange: "opacity, transform" });
      gsap.set(revealGroups.navbar, { y: -18 });
      gsap.set(revealGroups.footer, { y: 18 });
    }

    gsap.set(liquidRef.current, { autoAlpha: 0, scale: 0.1, transformOrigin: "50% 52%", willChange: "transform, opacity" });
    gsap.set(statusRef.current, { autoAlpha: 0, y: 16 });
    gsap.set(progressFillRef.current, { scaleX: 0.02, transformOrigin: "0% 50%" });

    const syncProgress = () => {
      const progress = Math.max(0, Math.min(progressState.value, 100));

      if (progressValueRef.current) {
        progressValueRef.current.textContent = `${Math.round(progress)}%`;
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${Math.max(progress / 100, 0.02)})`;
      }
    };

    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        onCompleteRef.current?.();
      },
    });

    timeline.to(statusRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.05);
    timeline.to(progressState, { value: 100, duration: 4, ease: "none", onUpdate: syncProgress }, 0.08);
    timeline.to(sceneState, { split: 1, duration: 0.88, ease: "power3.inOut" }, 2.02);
    timeline.to(liquidRef.current, { autoAlpha: 1, scale: 0.9, duration: 0.32, ease: "power3.out" }, 2.12);
    timeline.to(liquidRef.current, { scale: 15.5, duration: 1.16, ease: "power4.inOut" }, 2.34);
    timeline.to(revealGroups.navbar, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 2.34);
    timeline.to(revealGroups.hero, { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.07 }, 2.46);
    timeline.to(revealGroups.stats, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.05 }, 2.66);
    timeline.to(revealGroups.sectionHeaders, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.08 }, 2.84);
    timeline.to(revealGroups.featureCards, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, 2.92);
    timeline.to(revealGroups.steps, { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.06 }, 3.02);
    timeline.to(revealGroups.ownerCard, { autoAlpha: 1, y: 0, duration: 0.58 }, 3.12);
    timeline.to(revealGroups.testimonials, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, 3.2);
    timeline.to(revealGroups.finalCta, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.32);
    timeline.to(revealGroups.footer, { autoAlpha: 1, y: 0, duration: 0.46 }, 3.4);
    timeline.to(statusRef.current, { autoAlpha: 0, y: -10, duration: 0.3 }, 3.52);
    timeline.to(liquidRef.current, { opacity: 0.1, duration: 0.42 }, 3.6);
    timeline.to(overlayRef.current, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, 3.76);

    return () => {
      timeline.kill();
      sceneController?.dispose();

      if (hiddenTargets.length > 0) {
        gsap.set(hiddenTargets, { clearProps: "all" });
      }
    };
  }, []);

  return (
    <div ref={overlayRef} className="intro-loader" aria-busy="true" aria-live="polite" role="status">
      <div className="intro-loader__backdrop" aria-hidden="true" />
      <div className="intro-loader__grain" aria-hidden="true" />

      <div className="intro-loader__scene">
        <div className="intro-loader__halo intro-loader__halo--left" aria-hidden="true" />
        <div className="intro-loader__halo intro-loader__halo--right" aria-hidden="true" />
        <div ref={canvasHostRef} className="intro-loader__canvas" aria-hidden="true" />

        <div ref={liquidRef} className="intro-loader__liquid" aria-hidden="true">
          <span className="intro-loader__liquidBlob intro-loader__liquidBlob--one" />
          <span className="intro-loader__liquidBlob intro-loader__liquidBlob--two" />
          <span className="intro-loader__liquidBlob intro-loader__liquidBlob--three" />
          <span className="intro-loader__liquidCore" />
        </div>

        <div ref={statusRef} className="intro-loader__status">
          <span className="intro-loader__eyebrow">Booting website</span>
          <div className="intro-loader__title">Smart Medicine Finder</div>
          <div className="intro-loader__progress" aria-hidden="true">
            <span ref={progressFillRef} className="intro-loader__progressFill" />
          </div>
          <div className="intro-loader__meta">
            <span>Loading secure medicine search</span>
            <span ref={progressValueRef}>0%</span>
          </div>
        </div>
      </div>

      <svg className="intro-loader__filters" aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <filter id="intro-liquid-filter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
            <feColorMatrix
              in="blur"
              result="goo"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            />
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="goo" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default IntroSequence;