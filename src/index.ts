import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const pinnedSections = document.querySelectorAll('[data-gsap-scroll="pin"]');
let isScrolling = false;
let currentIndex = 0;
pinnedSections.forEach((section, index) => {
  const nextSection = section.nextElementSibling;
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '100% top',
    onEnter: () => {
      if (!isScrolling && nextSection) {
        isScrolling = true;
        gsap.to(window, {
          duration: 1,
          scrollTo: nextSection,
          ease: 'power2.inOut',
          onComplete: () => (isScrolling = false),
        });
      }
    },
  });
  // Add wheel event only for pinned sections
  section.addEventListener(
    'wheel',
    (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(pinnedSections.length - 1, index + direction));
      if (nextIndex !== index) {
        isScrolling = true;
        gsap.to(window, {
          duration: 1,
          scrollTo: pinnedSections[nextIndex],
          ease: 'power2.inOut',
          onComplete: () => (isScrolling = false),
        });
      }
    },
    { passive: false }
  );
});
