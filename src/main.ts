import barba from '@barba/core';
import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('hello, localhost!');

  barba.init({
    transitions: [{
      name: 'page-slide',
      leave() {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter() {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }]
  });
});
