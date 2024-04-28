import barba from '@barba/core';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  const panels = gsap.utils.toArray('.panel');
  const observer = ScrollTrigger.normalizeScroll(true);
  let scrollTween: gsap.core.Tween | null;
  // on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
  document.addEventListener(
    'touchstart',
    (e) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    { capture: true, passive: false }
  );
  function goToSection(i: number) {
    scrollTween = gsap.to(window, {
      scrollTo: { y: i * innerHeight, autoKill: false },
      onStart: () => {
        observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
        observer.enable();
      },
      duration: 0.5,
      // eslint-disable-next-line no-return-assign
      onComplete: () => (scrollTween = null),
      overwrite: true,
    });
  }
  panels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: 'top bottom',
      end: '+=199%',
      onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
    });
  });
  // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    snap: 1 / (panels.length - 1),
  });
  barba.hooks.enter(() => {
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
    document.dispatchEvent(new Event('readystatechange'));

    function createScriptTag(url: string) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('async', '');
      scriptElement.setAttribute('src', url);
      document.head.appendChild(scriptElement);
    }

    createScriptTag('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsslider@1/cmsslider.js');

    if (window.location.pathname === '/quiz') {
      barba.force((window.location.pathname = '/quiz'));
    }

    if (window.location.pathname === '/') {
      barba.force((window.location.pathname = '/'));
    }

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [
      {
        name: 'left',
        from: { namespace: ['home', 'right'] },
        to: { namespace: ['left', 'home'] },
        sync: true,
        leave(data) {
          gsap.from(data.current.container, {
            x: '0%',
            duration: 0.5,
          });
          gsap.to(data.current.container, {
            x: '100%',
            duration: 0.5,
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            x: '-100%',
            duration: 0.5,
          });
          gsap.to(data.next.container, {
            x: '0%',
            duration: 0.5,
          });
        },
      },
      {
        name: 'right',
        from: { namespace: ['home', 'left'] },
        to: { namespace: ['right', 'home'] },
        sync: true,
        leave(data) {
          gsap.from(data.current.container, {
            x: '0%',
            y: '0%',
          });
          gsap.to(data.current.container, {
            x: '-100%',
            duration: 0.5,
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            x: '100%',
            duration: 0.5,
          });
          gsap.to(data.next.container, {
            x: '0%',
            duration: 0.5,
          });
        },
      },
      {
        name: 'down',
        from: { namespace: 'home' },
        to: { namespace: 'down' },
        sync: true,
        leave(data) {
          gsap.from(data.current.container, {
            y: '0%',
            duration: 0.5,
          });
          gsap.to(data.current.container, {
            y: '-100%',
            duration: 0.5,
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            y: '100%',
            duration: 0.5,
          });
          gsap.to(data.next.container, {
            y: '0%',
            duration: 0.5,
          });
        },
      },
      {
        name: 'up',
        from: { namespace: 'down' },
        to: { namespace: 'home' },
        sync: true,
        leave(data) {
          gsap.from(data.current.container, {
            y: '0%',
            duration: 0.5,
          });
          gsap.to(data.current.container, {
            y: '100%',
            duration: 0.5,
          });
        },
        enter(data) {
          gsap.from(data.next.container, {
            y: '-100%',
            duration: 0.5,
          });
          gsap.to(data.next.container, {
            y: '0%',
            duration: 0.5,
          });
        },
      },
    ],
  });
});
