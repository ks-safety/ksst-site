/* ================================================================
   (KS)안전기술 — 공통 JavaScript
   ✏️ 이 파일 하나만 수정하면 모든 페이지에 동시 반영됩니다.
   ================================================================ */

/* ════════════════════════════════════════════════════════
   ✏️ 사이트 정보 설정 — 여기만 수정하세요
   ════════════════════════════════════════════════════════ */
let SITE = {
  name:     '(KS)안전기술',
  nameEn:   'Korea Standard Safety Tech.',
  biz:      '000-00-00000',       // 사업자등록번호
  ceo:      '홍길동',              // 대표자명
  tel:      '033-000-0000',       // 대표 전화
  fax:      '033-000-0000',       // 팩스
  email:    'info@ks-safety.co.kr',
  addr:     '강원특별자치도 강릉시 000로 00, ○○빌딩 3층',
  addrShort:'강원 강릉시 000로 00',
  logo:     '../KS_안전기술_로고.png',  // 서브폴더에서 상대경로
  logoRoot: './KS_안전기술_로고.png',   // 루트에서 상대경로
  hours:    '평일 09:00 ~ 18:00',
  kakaoMap: 'https://map.kakao.com', // ✏️ 실제 카카오맵 URL로 교체
  year:     new Date().getFullYear(),
};

/* ════════════════════════════════════════════════════════
   네비게이션 메뉴 구성 ✏️ 메뉴 항목 수정 가능
   ════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: '홈',         href: 'index.html' },
  { label: '기업소개',   href: 'about.html', sub: [
    { label: '회사 개요', href: 'about.html#overview' },
    { label: '경영 비전', href: 'about.html#vision' },
    { label: '회사 연혁', href: 'about.html#history' },
    { label: '인증·실적', href: 'about.html#certs' },
  ]},
  { label: '사업분야',   href: 'services.html', sub: [
    { label: '안전 컨설팅',        href: 'services.html#s1' },
    { label: '산업현장 안전지도',   href: 'services.html#s2' },
    { label: '위험성 평가',         href: 'services.html#s3' },
    { label: '안전 교육',          href: 'services.html#s4' },
    { label: '중대재해 컨설팅',     href: 'services.html#s5' },
    { label: '안전관리 대행',       href: 'services.html#s6' },
  ]},
  { label: '수행실적',   href: 'portfolio.html' },
  { label: '공지사항',   href: 'board.html', sub: [
    { label: '공지사항',      href: 'board.html' },
    { label: '안전 법령 정보', href: 'board.html?cat=law' },
    { label: '안전 뉴스',     href: 'board.html?cat=news' },
  ]},
  { label: '문의하기',   href: 'inquiry.html' },
  { label: '오시는 길',  href: 'directions.html' },
];

/* ════════════════════════════════════════════════════════
   페이지 루트 감지 (루트 vs 서브폴더)
   ════════════════════════════════════════════════════════ */
function isRoot() {
  return !window.location.pathname.includes('/pages/');
}
function logoSrc() {
  return isRoot() ? SITE.logoRoot : SITE.logo;
}
function pageHref(href) {
  return isRoot() ? href : '../' + href;
}

/* ════════════════════════════════════════════════════════
   네비게이션 주입
   ════════════════════════════════════════════════════════ */
function buildNav() {
  const menuHTML = NAV_ITEMS.map(item => {
    const href = pageHref(item.href);
    const active = window.location.pathname.includes(item.href.split('.')[0])
                   || (item.href === 'index.html' && (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')));
    const subHTML = item.sub ? `
      <div class="dd">
        ${item.sub.map(s => `<a href="${pageHref(s.href)}">${s.label}</a>`).join('')}
      </div>` : '';
    const arrow = item.sub ? '<span style="font-size:9px;opacity:0.5;">▾</span>' : '';
    return `<li class="nav-item">
      <a href="${href}" class="nav-a ${active ? 'active' : ''}">${item.label}${arrow}</a>
      ${subHTML}
    </li>`;
  }).join('');

  const mobHTML = NAV_ITEMS.map(item => {
    const href = pageHref(item.href);
    const subHTML = item.sub ? item.sub.map(s =>
      `<a href="${pageHref(s.href)}" class="mob-sub" onclick="closeMob()">› ${s.label}</a>`
    ).join('') : '';
    return `<a href="${href}" class="mob-link" onclick="${item.sub ? '' : 'closeMob()'}">
      ${item.label}
    </a>${subHTML}`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
  <header id="site-nav">
    <div class="nav-top">
      <div class="nav-top-inner">
        <span class="nav-top-left">고용노동부 인정 안전관리 전문기관 · ${SITE.nameEn}</span>
        <div class="nav-top-right">
          <a href="tel:${SITE.tel}">📞 ${SITE.tel}</a>
          <span class="bar"></span>
          <a href="mailto:${SITE.email}">✉ ${SITE.email}</a>
          <span class="bar"></span>
          <a href="${pageHref('inquiry.html')}">온라인 문의</a>
        </div>
      </div>
    </div>
    <nav class="nav-main-bar">
      <div class="nav-main-inner">
        <a href="${pageHref('index.html')}" class="nav-logo">
          <img src="${logoSrc()}" alt="${SITE.name} 로고">
        </a>
        <ul class="nav-menu">${menuHTML}</ul>
        <button class="nav-ham" id="hambBtn" aria-label="메뉴 열기">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>

  <div id="mob-menu">
    <button class="mob-x" id="mobClose">✕</button>
    ${mobHTML}
  </div>

  <button id="top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="맨 위로">↑</button>
  `);

  // 햄버거 이벤트
  document.getElementById('hambBtn').addEventListener('click', () => {
    document.getElementById('mob-menu').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('mobClose').addEventListener('click', closeMob);
}
function closeMob() {
  const m = document.getElementById('mob-menu');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ════════════════════════════════════════════════════════
   푸터 주입
   ════════════════════════════════════════════════════════ */
function buildFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
  <div class="wrap">
    <div class="footer-grid">
      <div class="f-brand">
        <img src="${logoSrc()}" alt="${SITE.name}">
        <p>${SITE.name}은 산업현장의 안전문화 정착을 위해<br>
          전문 컨설팅과 현장 안전지도를 제공하는<br>
          고용노동부 인정 안전관리 전문기관입니다.</p>
        <p style="margin-top:10px;font-size:11px;color:rgba(255,255,255,0.25);">
          사업자등록번호: ${SITE.biz} | 대표: ${SITE.ceo}
        </p>
      </div>
      <div class="f-col">
        <h5>사업분야</h5>
        <ul>
          <li><a href="${pageHref('services.html')}">→ 안전 컨설팅</a></li>
          <li><a href="${pageHref('services.html')}">→ 산업현장 안전지도</a></li>
          <li><a href="${pageHref('services.html')}">→ 위험성 평가</a></li>
          <li><a href="${pageHref('services.html')}">→ 안전 교육</a></li>
          <li><a href="${pageHref('services.html')}">→ 중대재해 컨설팅</a></li>
          <li><a href="${pageHref('services.html')}">→ 안전관리 대행</a></li>
        </ul>
      </div>
      <div class="f-col">
        <h5>회사 정보</h5>
        <ul>
          <li><a href="${pageHref('about.html')}">→ 기업소개</a></li>
          <li><a href="${pageHref('portfolio.html')}">→ 수행실적</a></li>
          <li><a href="${pageHref('board.html')}">→ 공지사항</a></li>
          <li><a href="${pageHref('inquiry.html')}">→ 문의하기</a></li>
          <li><a href="${pageHref('directions.html')}">→ 오시는 길</a></li>
        </ul>
      </div>
      <div class="f-col">
        <h5>연락처</h5>
        <ul>
          <li><a href="tel:${SITE.tel}">📞 ${SITE.tel}</a></li>
          <li><a href="mailto:${SITE.email}">✉ ${SITE.email}</a></li>
          <li><a href="${pageHref('directions.html')}">📍 ${SITE.addrShort}</a></li>
        </ul>
        <div style="margin-top:16px;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;">
          <p style="font-size:10px;color:rgba(255,255,255,0.30);margin-bottom:3px;">운영 시간</p>
          <p style="font-size:13px;color:rgba(255,255,255,0.65);">${SITE.hours}</p>
          <p style="font-size:11px;color:rgba(255,255,255,0.28);">토·일·공휴일 휴무</p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="wrap">
      <p>© ${SITE.year} ${SITE.name} ${SITE.nameEn} All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="#">개인정보처리방침</a>
        <a href="#">이용약관</a>
        <a href="${pageHref('directions.html')}">오시는 길</a>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════
   스크롤 효과 공통
   ════════════════════════════════════════════════════════ */
function initScroll() {
  // 네비 스크롤
  const nav = document.getElementById('site-nav');
  const topBtn = document.getElementById('top-btn');
  window.addEventListener('scroll', () => {
    if (nav)    nav.classList.toggle('scrolled', window.scrollY > 50);
    if (topBtn) topBtn.classList.toggle('show', window.scrollY > 400);
  });

  // 앵커 스무스 스크롤 (nav 높이 보정)
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const [, hash] = this.href.split('#');
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el && window.location.pathname.includes(this.pathname.split('/').pop())) {
        e.preventDefault();
        const offset = (nav ? nav.offsetHeight : 0) + 12;
        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // 페이드업
  const fuObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('show'); fuObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fu').forEach(el => fuObs.observe(el));

  // 숫자 카운터
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.n);
      let   n   = 0;
      const step = end / (1800 / 16);
      const t = setInterval(() => {
        n += step;
        if (n >= end) { el.textContent = end; clearInterval(t); }
        else          { el.textContent = Math.floor(n); }
      }, 16);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.cnt').forEach(el => cntObs.observe(el));
}

/* ════════════════════════════════════════════════════════
   문의 폼 공통 제출
   ════════════════════════════════════════════════════════ */
function submitInquiry(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const req = form.querySelectorAll('[data-req]');
  let ok = true;
  req.forEach(el => {
    const empty = !el.value.trim();
    el.style.borderColor = empty ? 'var(--red)' : '';
    if (empty) ok = false;
  });
  const chk = form.querySelector('[data-priv]');
  if (chk && !chk.checked) { alert('개인정보 처리방침에 동의해 주세요.'); return; }
  if (!ok) { alert('필수 항목을 모두 입력해 주세요.'); return; }

  /* ✏️ 실제 전송 연동 위치
     Formspree: fetch('https://formspree.io/f/YOUR_ID', {...})
     EmailJS:   emailjs.send(...) */
  alert('문의가 접수되었습니다.\n빠른 시일 내에 답변드리겠습니다. 감사합니다!');
  form.reset();
}

/* ════════════════════════════════════════════════════════
   site.json 불러오기 — CMS에서 편집한 회사 정보를 반영
   파일이 없으면 위의 기본값으로 작동 (안전)
   ════════════════════════════════════════════════════════ */
async function loadSiteInfo() {
  try {
    // 루트/서브폴더 모두 대응
    const path = isRoot() ? './site.json' : '../site.json';
    const res = await fetch(path + '?t=' + Date.now()); // 캐시 방지
    if (!res.ok) return;
    const data = await res.json();
    // 값이 있는 항목만 덮어쓰기 (빈 값은 기본값 유지)
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        SITE[key] = data[key];
      }
    });
  } catch (err) {
    console.log('site.json 불러오기 건너뜀:', err);
  }
}

/* ════════════════════════════════════════════════════════
   초기화 실행
   ════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteInfo();  // 먼저 회사 정보를 불러온 뒤
  buildNav();
  buildFooter();
  initScroll();
});
