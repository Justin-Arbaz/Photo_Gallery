// =======================
// Pagination
// =======================
const itemsPerPage = 6;
const galleryItems = document.querySelectorAll('.gallery-item');
const paginationContainer = document.getElementById('pagination');

function showPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  galleryItems.forEach((item, index) => {
    item.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  // Build pagination dynamically
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${page === i ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link">${i}</a>`;
    li.onclick = () => showPage(i);
    paginationContainer.appendChild(li);
  }

  if (totalPages > 1) {
    const next = document.createElement('li');
    next.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
    next.innerHTML = `<a class="page-link">&raquo;</a>`;
    next.onclick = () => { if (page < totalPages) showPage(page + 1); };
    paginationContainer.appendChild(next);
  }
}

showPage(1);

// =======================
// Filter Functionality
// =======================
document.getElementById('filterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const textValue = document.getElementById('textFilter').value.toLowerCase();
  const dateValue = document.getElementById('dateFilter').value;
  const cards = document.querySelectorAll('.gallery-item');

  let visibleCount = 0;
  cards.forEach(card => {
    const title = card.getAttribute('data-title')?.toLowerCase() || '';
    const date = card.getAttribute('data-date') || '';
    const matchesText = textValue === '' || title.includes(textValue);
    const matchesDate = dateValue === '' || date === dateValue;
    const visible = matchesText && matchesDate;
    card.style.display = visible ? 'block' : 'none';
    if (visible) visibleCount++;
  });

  // Update pagination after filtering
  showPage(1);
});

// =======================
// Zoom functionality
// =======================
document.querySelectorAll('.carousel-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = `
      <button class="close-zoom">&times;</button>
      <img src="${img.src}" alt="Zoomed Image">`;
    document.body.appendChild(overlay);
    overlay.querySelector('.close-zoom').onclick = () => overlay.remove();
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
  });
});


// =======================
// Carousel Counter Handler
// =======================
function initCarouselCounter(carouselId, counterId) {
  const carousel = document.getElementById(carouselId);
  const counter = document.getElementById(counterId);
  const items = carousel.querySelectorAll('.carousel-item');
  const total = items.length;

  const updateCounter = () => {
    const activeIndex = [...items].findIndex(item => item.classList.contains('active'));
    counter.textContent = `${activeIndex + 1} out of ${total}`;
  };

  carousel.addEventListener('slid.bs.carousel', updateCounter);
  window.addEventListener('load', updateCounter);
}

initCarouselCounter("galleryCarousel1", "slide-counter1");
initCarouselCounter("galleryCarousel2", "slide-counter2");
initCarouselCounter("galleryCarousel3", "slide-counter3");
initCarouselCounter("galleryCarousel4", "slide-counter4");
initCarouselCounter("galleryCarousel5", "slide-counter5");

// =======================
// Stop Videos on Modal Close (for ALL modals)
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('hidden.bs.modal', () => {
    const iframes = modal.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const src = iframe.src;
      iframe.src = src; // Reset to stop video
    });
  });
});

// =======================
// Thumbnail Click → Carousel Slide
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
  img.addEventListener('click', () => {
    const carouselEl = document.querySelector('#galleryCarousel');
    if (carouselEl) {
      const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
      carousel.to(index);
    }
  });
});
