(() => {
  'use strict';

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  const mobileQuery = matchMedia('(max-width: 700px)');
  let keyboardNavigation = false;
  const disclosureStates = new Map();

  function setMenu(open, returnFocus = false) {
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuToggle.querySelector('use').setAttribute('href', open ? '#icon-close' : '#icon-menu');
    if (returnFocus) menuToggle.focus();
  }
  menuToggle.hidden = false;
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    keyboardNavigation = true;
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('pointerdown', () => { keyboardNavigation = false; });
  document.addEventListener('wheel', () => { keyboardNavigation = false; }, { passive: true });
  mobileQuery.addEventListener('change', () => setMenu(false));

  const controls = document.querySelector('.project-controls');
  const filterButtons = [...controls.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project-list > .project')];
  controls.hidden = false;

  function finishDisclosure(project, open = disclosureStates.get(project)?.open ?? project.open) {
    const state = disclosureStates.get(project);
    disclosureStates.delete(project);
    state?.animation.cancel();
    project.open = open;
    project.style.removeProperty('height');
    project.style.removeProperty('overflow');
  }
  function filterProjects(category) {
    let visible = 0;
    for (const project of projects) {
      finishDisclosure(project);
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    }
    for (const button of filterButtons) button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    controls.querySelector('.project-count').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
  }
  for (const button of filterButtons) button.addEventListener('click', () => filterProjects(button.dataset.filter));
  for (const project of projects) {
    project.querySelector('summary').addEventListener('click', event => {
      if (reducedMotion.matches || event.detail === 0 || typeof project.animate !== 'function') {
        finishDisclosure(project);
        return;
      }
      event.preventDefault();
      const previous = disclosureStates.get(project);
      const open = !(previous?.open ?? project.open);
      const start = project.getBoundingClientRect().height;
      previous?.animation.cancel();
      project.open = true;
      project.style.height = 'auto';
      const end = open ? project.getBoundingClientRect().height : project.querySelector('summary').getBoundingClientRect().height;
      project.style.height = `${start}px`;
      project.style.overflow = 'clip';
      const animation = project.animate([{ height: `${start}px` }, { height: `${end}px` }], {
        duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards'
      });
      disclosureStates.set(project, { open, animation });
      animation.finished.then(() => {
        if (disclosureStates.get(project)?.animation === animation) finishDisclosure(project, open);
      }, () => {});
    });
  }
  addEventListener('resize', () => { for (const project of disclosureStates.keys()) finishDisclosure(project); }, { passive: true });

  function revealProject(id) {
    const project = document.getElementById(id);
    if (!project?.matches('.project-list > .project')) return;
    if (project.hidden) filterProjects('all');
    finishDisclosure(project, true);
  }
  document.querySelectorAll('[data-open-project]').forEach(link => link.addEventListener('click', () => revealProject(link.dataset.openProject)));
  addEventListener('hashchange', () => revealProject(location.hash.slice(1)));
  if (location.hash) revealProject(location.hash.slice(1));

  if ('IntersectionObserver' in window) {
    const sections = [...menu.querySelectorAll('a')].map(link => ({ link, section: document.querySelector(link.hash) }));
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const { link, section } of sections) {
          if (entry.target !== hero && section === entry.target) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    for (const { section } of sections) if (section) observer.observe(section);
    observer.observe(hero);

    const visibleEntrances = new WeakSet();
    const entrances = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          visibleEntrances.delete(entry.target);
          entry.target.classList.remove('is-entering');
          continue;
        }
        if (entry.intersectionRatio < .08 || visibleEntrances.has(entry.target)) continue;
        visibleEntrances.add(entry.target);
        if (reducedMotion.matches || keyboardNavigation) continue;
        entry.target.classList.add('is-entering');
      }
    }, { threshold: [0, .08] });
    document.querySelectorAll('.section-heading h2, .section-heading > p, .about > h2, .project-visual, .experience-role, .experience-detail, .experience-photo, .portrait, .about-copy, .education, .skill-list > div, .certifications > h3, .certificate, .awards-table, .leadership, .contact-top, .contact-email').forEach(target => {
      target.addEventListener('animationend', event => {
        if (event.target === target) target.classList.remove('is-entering');
      });
      entrances.observe(target);
    });
  }

  const rail = document.querySelector('.tools-marquee');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { rail.dataset.inView = String(entries[0].isIntersecting); }).observe(rail);
  }

  function setupBadge() {
    const card = document.querySelector('.lanyard-card');
    const stage = document.querySelector('.lanyard-stage');
    const hero = document.querySelector('.hero');
    const motion = window.Motion;
    if (!motion?.motionValue || !motion?.animate) return () => {};
    const x = motion.motionValue(0);
    const y = motion.motionValue(0);
    let springX, springY, renderFrame = 0, pointer = null, suppressClick = false;
    let visible = true, scrollOffset = 0, geometry = { width: 500, height: 600, top: 142, cardWidth: 300, cardHeight: 424 };
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const cords = [...stage.querySelectorAll('path')];
    const spring = { type: 'spring', mass: 1, stiffness: 100, damping: 10 };
    function render() {
      renderFrame = 0;
      const dx = x.get(), dy = y.get() + scrollOffset;
      const angle = -5 + clamp(dx * .075, -16, 16);
      card.style.transform = `translate3d(calc(-50% + ${dx}px), ${dy}px, 0) rotate(${angle}deg)`;
      const radians = angle * Math.PI / 180;
      const endX = geometry.width / 2 + dx + 20 * Math.sin(radians);
      const endY = geometry.top + dy - 20 * Math.cos(radians);
      const back = `M ${geometry.width * .35} -145 C ${geometry.width * .35} -20, ${endX - 62} ${endY - 40}, ${endX} ${endY}`;
      const front = `M ${geometry.width * .64} -145 C ${geometry.width * .64} -5, ${endX + 48} ${endY - 38}, ${endX} ${endY}`;
      cords[0].setAttribute('d', back);
      cords[1].setAttribute('d', front);
      cords[2].setAttribute('d', front);
    }
    function scheduleRender() { if (!renderFrame && visible && !document.hidden) renderFrame = requestAnimationFrame(render); }
    x.on('change', scheduleRender);
    y.on('change', scheduleRender);
    function measure() {
      geometry = { width: stage.clientWidth, height: stage.clientHeight, top: card.offsetTop, cardWidth: card.offsetWidth, cardHeight: card.offsetHeight };
      const minimumHeight = `${geometry.top + geometry.cardHeight + 24}px`;
      if (stage.style.minHeight !== minimumHeight) requestAnimationFrame(() => { stage.style.minHeight = minimumHeight; });
      stage.querySelector('svg').setAttribute('viewBox', `0 0 ${geometry.width} ${geometry.height}`);
      scheduleRender();
    }
    const badgeSize = new ResizeObserver(measure);
    badgeSize.observe(stage);
    badgeSize.observe(card);
    measure();
    function stop() { springX?.stop(); springY?.stop(); }
    function settle(vx = 0, vy = 0) {
      stop();
      if (reducedMotion.matches || !visible || document.hidden) { x.jump(0); y.jump(0); scheduleRender(); return; }
      springX = motion.animate(x, 0, { ...spring, velocity: clamp(vx, -1800, 1800) });
      springY = motion.animate(y, 0, { ...spring, velocity: clamp(vy, -1200, 1200) });
    }
    function endPointer(event, cancelled = false) {
      if (!pointer || (event && event.pointerId !== pointer.id)) return;
      const current = pointer;
      pointer = null;
      suppressClick = current.dragging;
      card.classList.remove('is-dragging');
      if (card.hasPointerCapture(current.id)) card.releasePointerCapture(current.id);
      settle(cancelled ? 0 : current.vx, cancelled ? 0 : current.vy);
    }
    card.disabled = false;
    document.querySelector('.badge-hint-js').hidden = false;
    document.querySelector('.badge-hint-static').hidden = true;
    card.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || pointer) return;
      const presentation = new DOMMatrixReadOnly(getComputedStyle(card).transform);
      stop();
      x.jump(presentation.m41 + geometry.cardWidth / 2);
      y.jump(presentation.m42 - scrollOffset);
      suppressClick = false;
      pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: x.get(), y: y.get(), lastX: event.clientX, lastY: event.clientY, time: performance.now(), vx: 0, vy: 0, dragging: false, touch: event.pointerType === 'touch' };
      card.setPointerCapture(event.pointerId);
    });
    card.addEventListener('pointermove', event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.startX, dy = event.clientY - pointer.startY;
      if (!pointer.dragging && Math.hypot(dx, dy) < 6) return;
      if (pointer.touch && !pointer.dragging && Math.abs(dy) > Math.abs(dx)) { endPointer(event, true); return; }
      pointer.dragging = true;
      card.classList.add('is-dragging');
      const elapsed = Math.max(8, performance.now() - pointer.time);
      pointer.vx = (event.clientX - pointer.lastX) / elapsed * 1000;
      pointer.vy = pointer.touch ? 0 : (event.clientY - pointer.lastY) / elapsed * 1000;
      pointer.lastX = event.clientX; pointer.lastY = event.clientY; pointer.time = performance.now();
      const maxX = Math.max(24, (geometry.width - geometry.cardWidth) / 2 - 8);
      const minY = Math.max(-80, 28 - geometry.top);
      const maxY = Math.max(16, geometry.height - geometry.top - geometry.cardHeight - 24);
      const soften = (value, min, max, dimension) => {
        const bound = clamp(value, min, max), excess = value - bound;
        const resistance = Math.min(32, dimension * .08);
        return bound + excess * resistance * .55 / (resistance + .55 * Math.abs(excess));
      };
      x.set(soften(pointer.x + dx, -maxX, maxX, geometry.width));
      y.set(pointer.touch ? 0 : soften(pointer.y + dy, minY, maxY, geometry.height));
    });
    card.addEventListener('pointerup', event => endPointer(event));
    card.addEventListener('pointercancel', event => endPointer(event, true));
    card.addEventListener('lostpointercapture', event => endPointer(event, true));
    card.addEventListener('click', event => {
      if (suppressClick) { suppressClick = false; return; }
      if (event.detail === 0) { stop(); x.jump(0); y.jump(0); }
      const flipped = card.getAttribute('aria-pressed') !== 'true';
      card.setAttribute('aria-pressed', String(flipped));
      card.querySelector('.badge-front').setAttribute('aria-hidden', String(flipped));
      card.querySelector('.badge-back').setAttribute('aria-hidden', String(!flipped));
    });
    document.addEventListener('keydown', event => {
      if (pointer) endPointer(null, true);
      if (event.key === 'Escape' && document.activeElement === card) {
        card.setAttribute('aria-pressed', 'false');
        card.querySelector('.badge-front').setAttribute('aria-hidden', 'false');
        card.querySelector('.badge-back').setAttribute('aria-hidden', 'true');
      }
    });
    let scrollFrame = 0;
    addEventListener('scroll', () => {
      if (scrollFrame || !visible || reducedMotion.matches) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        scrollOffset = clamp(-hero.getBoundingClientRect().top * .035, -4, 20);
        scheduleRender();
      });
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (!visible) { endPointer(null, true); stop(); x.jump(0); y.jump(0); }
        else scheduleRender();
      }).observe(stage);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { endPointer(null, true); stop(); x.jump(0); y.jump(0); }
      else scheduleRender();
    });
    if (!reducedMotion.matches) { x.set(-28); y.set(-8); settle(); }
    return () => { endPointer(null, true); stop(); x.jump(0); y.jump(0); scrollOffset = 0; scheduleRender(); };
  }
  const resetBadge = setupBadge();
  document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('page-hidden', document.hidden));
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    document.getAnimations().forEach(animation => animation.cancel());
    document.querySelectorAll('.is-entering').forEach(element => element.classList.remove('is-entering'));
    for (const project of disclosureStates.keys()) finishDisclosure(project);
    resetBadge();
  });
})();
