import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  restartWebflow();

  barba.hooks.enter(() => {
    restartWebflow();
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
