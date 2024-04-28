// const panels = gsap.utils.toArray('.panel');
// const observer = ScrollTrigger.normalizeScroll(true);
// let scrollTween: gsap.core.Tween | null;

// // on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
// document.addEventListener(
//   'touchstart',
//   (e) => {
//     if (scrollTween) {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//     }
//   },
//   { capture: true, passive: false }
// );

// function goToSection(i: number) {
//   scrollTween = gsap.to(window, {
//     scrollTo: { y: i * innerHeight, autoKill: false },
//     onStart: () => {
//       observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
//       observer.enable();
//     },
//     duration: 0.5,
//     // eslint-disable-next-line no-return-assign
//     onComplete: () => (scrollTween = null),
//     overwrite: true,
//   });
// }

// panels.forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     start: 'top bottom',
//     end: '+=199%',
//     onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
//   });
// });

// // just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
// ScrollTrigger.create({
//   start: 0,
//   end: 'max',
//   snap: 1 / (panels.length - 1),
// });
