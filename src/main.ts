import barba from '@barba/core';
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

window.Webflow ||= [];
window.Webflow.push(() => {

  barba.hooks.enter((data) => {
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
    document.dispatchEvent(new Event('readystatechange'));

    const scriptElement = document.createElement('script');
    const scriptSRC = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsslider@1/cmsslider.js';
    scriptElement.setAttribute('async', '');
    scriptElement.setAttribute('src', scriptSRC);
    document.head.appendChild(scriptElement);

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  });

  const heroButton = document.querySelector('.hero-button');
  heroButton.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1, 
      scrollTo: { 
	y: document.body.scrollHeight 
      }
    });
  });

  barba.init({
    transitions: [
      {
        name: 'left',
        from: { namespace: 'home' },
        to: { namespace: 'left' },
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
        from: { namespace: 'home' },
        to: { namespace: 'right' },
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
    ],
  });
});
