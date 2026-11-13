(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const themeButton = document.getElementById('theme-toggle');
  const updateThemeLabel = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.querySelector('.theme-icon').textContent = dark ? '☼' : '☾';
  };
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
    updateThemeLabel();
  });
  updateThemeLabel();

  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const setMenuOpen = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenuOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) setMenuOpen(false); });
  matchMedia('(min-width: 701px)').addEventListener('change', () => setMenuOpen(false));

  const links = [...nav.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  let scrollQueued = false;
  const updateNavigation = () => {
    scrollQueued = false;
    let current = 'about';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section.id;
    }
    if (current === 'news') current = 'about';
    if (current === 'education') current = 'experience';
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 30) current = 'gallery';
    links.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation, { passive: true });
  updateNavigation();

  // Only play visible demos. Native video controls remain available for manual playback.
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('.project-media video')];
  const visibleVideos = new Set();
  const syncVideo = video => {
    if (document.hidden || !visibleVideos.has(video) || motion.matches) video.pause();
    else video.play().catch(() => {});
  };
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
      syncVideo(entry.target);
    });
  }, { threshold: .2 });
  videos.forEach(video => videoObserver.observe(video));
  document.addEventListener('visibilitychange', () => videos.forEach(syncVideo));
  motion.addEventListener('change', () => videos.forEach(syncVideo));
})();
