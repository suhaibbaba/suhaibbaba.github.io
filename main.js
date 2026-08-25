// Suhaib Baba — portfolio interactions
// hero headline stagger, Lighthouse gauge, scroll reveal, timeline progress, dynamic years

(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Years of experience: career started 2018, remote since 2019
  const Y = new Date().getFullYear();
  document.querySelectorAll('[data-years]').forEach(el => el.textContent = Y - 2018);
  document.querySelectorAll('[data-remote]').forEach(el => el.textContent = Y - 2019);
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = Y);

  // Hero headline: split into words, stagger rise
  const h = document.getElementById('headline');
  const html = h.innerHTML.trim();
  // keep the accent span intact: tokenize by words but preserve tag boundaries
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  let i = 0;
  const wrapWords = (node) => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t.trim()) { frag.appendChild(document.createTextNode(t)); return; }
          const w = document.createElement('span'); w.className = 'w';
          const s = document.createElement('span'); s.textContent = t;
          s.style.animationDelay = (0.05 * i++) + 's';
          w.appendChild(s); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else wrapWords(n);
    });
  };
  wrapWords(tmp);
  h.innerHTML = tmp.innerHTML;

  // Lighthouse gauge: 0 -> 40 (red), pause, 40 -> 95 (green)
  const arc = document.getElementById('arc'), score = document.getElementById('score'),
    label = document.getElementById('gauge-label'), pill = document.getElementById('pill');
  const C = 597;
  const set = v => { arc.style.strokeDashoffset = C - C * v / 100; score.textContent = Math.round(v); };
  const tween = (from, to, dur, ease, cb) => new Promise(res => {
    const t0 = performance.now();
    (function f(t) {
      const k = Math.min(1, (t - t0) / dur); const v = from + (to - from) * ease(k); set(v);
      if (k < 1) requestAnimationFrame(f); else { cb && cb(); res(); }
    })(t0);
  });
  const easeOut = k => 1 - Math.pow(1 - k, 3);
  if (reduce) { set(95); arc.style.stroke = 'var(--pass)'; label.textContent = 'after'; pill.classList.add('show'); }
  else setTimeout(async () => {
    await tween(0, 40, 1100, easeOut);
    await new Promise(r => setTimeout(r, 700));
    label.textContent = 'after';
    arc.style.stroke = 'var(--amber)';
    await tween(40, 95, 1400, easeOut, () => { arc.style.stroke = 'var(--pass)'; pill.classList.add('show'); });
  }, 900);

  // Scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
    { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .tl-item').forEach(el => io.observe(el));

  // Timeline line draws with scroll progress
  const tl = document.getElementById('tl'), prog = document.getElementById('tl-progress');
  const onScroll = () => {
    const r = tl.getBoundingClientRect(); const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * .75 - r.top) / r.height));
    prog.style.setProperty('--p', p.toFixed(3));
  };
  if (reduce) prog.style.setProperty('--p', 1); else { onScroll(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); }
})();
