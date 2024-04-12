import barba from '@barba/core';
import barbaCss from '@barba/css';

window.Webflow ||= [];
window.Webflow.push(() => {
  barba.use(barbaCss);

  // TODO: data.next.container -> automatically scrollTop
  Barba.Dispatcher.on('newPageReady', function(current, prev, container) {
    history.scrollRestoration = 'manual';
  });
  barba.init({
    transitions: [{
      name: 'left',
      from: { namespace: 'home' },
      to: { namespace: 'left' },
      sync: true,
      leave() {},
      enter() {},
    }, {
      name: 'right',
      from: { namespace: 'home' },
      to: { namespace: 'right' },
      sync: true,
      leave() {},
      enter() {},
    }, {
      name: 'down',
      from: { namespace: 'home' },
      to: { namespace: 'down' },
      sync: true,
      leave() {},
      enter() {},
    }]
  });
});
