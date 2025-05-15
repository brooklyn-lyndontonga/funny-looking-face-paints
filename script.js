document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const content = document.getElementById('content');

  async function loadPage(page) {
    const res = await fetch(`partials/${page}.html`);
    const html = await res.text();
    content.innerHTML = html;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
      history.pushState({ page }, '', `#${page}`);
    });
  });

  // Load initial page on refresh or direct link
  const initialPage = location.hash.replace('#', '') || 'home';
  loadPage(initialPage);

  // Handle back/forward browser buttons
  window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    loadPage(page);
  });
});
