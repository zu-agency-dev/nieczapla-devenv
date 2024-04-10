window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('hello, localhost!');

  document.addEventListener('load', => {
    const heroImageOverlay = document.querySelector('.hero-background_image-overlay');
    heroImageOverlay.style.background = '"' + heroImageOverlay.getAttribute('data-color') + '";';
  });
});
