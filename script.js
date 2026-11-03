/* =========================================================
   Данные проектов
   ========================================================= */
const PROJECTS = {
  loop: {
    tag: 'Реклама',
    title: 'Рекламный ролик для LOOP',
    client: 'Бренд LOOP',
    video: null,
    videoNote: 'Видео доступно по запросу',
    details: {
      'Задача': 'Снять и смонтировать рекламный ролик для бренда LOOP.',
      'Роль': 'Оператор, монтаж, цвет.',
      'Инструменты': 'Камера, CapCut.',
      'Результат': 'Ролик использован в рекламной кампании бренда.'
    }
  },
  angoc: {
    tag: 'Реклама',
    title: 'Рекламный ролик для ANGOC',
    client: 'Бренд ANGOC',
    video: null,
    videoNote: 'Видео доступно по запросу',
    details: {
      'Задача': 'Снять и смонтировать рекламный ролик для бренда ANGOC.',
      'Роль': 'Оператор, монтаж.',
      'Инструменты': 'Камера, CapCut.',
      'Результат': 'Ролик размещён на площадках бренда.'
    }
  },
  newyear: {
    tag: 'Клип',
    title: 'Новогодний клип-парадия',
    client: 'YouTube · 25 декабря 2024',
    video: 'https://www.youtube.com/embed/CNVz_u516Wg',
    videoNote: '',
    details: {
      'Задача': 'Снять и смонтировать новогодний музыкальный клип.',
      'Роль': 'Оператор, монтаж.',
      'Инструменты': 'Камера, CapCut, хромакей.',
      'Результат': 'Клип опубликован на YouTube.'
    }
  },
  diss: {
    tag: 'Клип',
    title: 'Дисс на Жюри',
    client: 'YouTube · январь 2025',
    video: 'https://www.youtube.com/embed/TOeKtNYVjcI',
    videoNote: '',
    details: {
      'Задача': 'Снять и смонтировать клип для шоу Мафани.',
      'Роль': 'Оператор, монтаж.',
      'Инструменты': 'Камера, CapCut.',
      'Результат': 'Клип опубликован на YouTube.'
    }
  }
};

/* =========================================================
   Мобильное меню
   ========================================================= */
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

/* =========================================================
   Модалка проектов
   ========================================================= */
const modal = document.getElementById('projectModal');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalClient = document.getElementById('modalClient');
const modalVideo = document.getElementById('modalVideo');
const modalDetails = document.getElementById('modalDetails');

function openProject(id) {
  const p = PROJECTS[id];
  if (!p || !modal) return;

  modalTag.textContent = p.tag;
  modalTitle.textContent = p.title;
  modalClient.textContent = p.client;

  if (p.video) {
    modalVideo.innerHTML =
      '<div class="video-embed"><iframe src="' + p.video + '" ' +
      'title="' + p.title + '" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe></div>';
  } else {
    modalVideo.innerHTML = '<div class="video-note">' + (p.videoNote || 'Видео доступно по запросу') + '</div>';
  }

  modalDetails.innerHTML = Object.entries(p.details).map(([k, v]) =>
    '<div class="detail"><dt>' + k + '</dt><dd>' + v + '</dd></div>'
  ).join('');

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  modalVideo.innerHTML = '';
}

document.querySelectorAll('.project-card').forEach((card) => {
  const id = card.dataset.project;

  card.addEventListener('click', () => openProject(id));

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProject(id);
    }
  });
});

if (modal) {
  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeProject);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProject();
    }
  });
}

/* =========================================================
   Год в футере
   ========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();