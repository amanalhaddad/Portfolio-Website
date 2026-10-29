(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  const menuIcon = menuToggle.querySelector('use');
  const mobileQuery = window.matchMedia('(max-width: 600px)');

  function setMenu(open, returnFocus = false) {
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuIcon.setAttribute('href', open ? '#icon-close' : '#icon-menu');
    if (returnFocus) menuToggle.focus();
  }

  menuToggle.hidden = false;
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  mobileQuery.addEventListener('change', () => setMenu(false));

  const controls = document.querySelector('.project-controls');
  const filterButtons = [...controls.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project-list > .project')];
  const count = controls.querySelector('.project-count');
  controls.hidden = false;

  function filterProjects(category) {
    let visible = 0;
    for (const project of projects) {
      const matches = category === 'all' || project.dataset.category === category;
      project.hidden = !matches;
      if (matches) visible += 1;
    }
    for (const button of filterButtons) button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
  }

  for (const button of filterButtons) button.addEventListener('click', () => filterProjects(button.dataset.filter));

  function revealProject(id) {
    const project = document.getElementById(id);
    if (!project?.matches('.project-list > .project')) return;
    if (project.hidden) filterProjects('all');
    project.open = true;
  }

  document.querySelectorAll('[data-open-project]').forEach(link => link.addEventListener('click', () => revealProject(link.dataset.openProject)));
  window.addEventListener('hashchange', () => revealProject(location.hash.slice(1)));
  if (location.hash) revealProject(location.hash.slice(1));

  if ('IntersectionObserver' in window) {
    const sections = [...menu.querySelectorAll('a')].map(link => ({ link, section: document.querySelector(link.hash) }));
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (entry.target === hero) {
          for (const { link } of sections) link.removeAttribute('aria-current');
          continue;
        }
        for (const item of sections) {
          if (item.section === entry.target) item.link.setAttribute('aria-current', 'location');
          else item.link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    for (const { section } of sections) if (section) observer.observe(section);
    if (hero) observer.observe(hero);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
    let keyboardNavigation = false;
    document.addEventListener('keydown', () => { keyboardNavigation = true; });
    document.addEventListener('pointerdown', () => { keyboardNavigation = false; });
    const entrances = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entrances.unobserve(entry.target);
        if (reducedMotion.matches || keyboardNavigation) continue;
        entry.target.classList.add('is-entering');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('is-entering'), { once: true });
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('.project-visual, .experience-detail, .portrait, .contact-email').forEach(target => entrances.observe(target));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
    });
  }
})();
