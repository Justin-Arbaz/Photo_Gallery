
// =======================
// Pagination Setup
// =======================
const itemsPerPage = 4;
const galleryItems = document.querySelectorAll('.gallery-item');
const paginationContainer = document.getElementById('pagination');
const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

function showPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  galleryItems.forEach((item, index) => {
    item.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  // Build pagination UI
  paginationContainer.innerHTML = '';

  // Previous Button
  const prev = document.createElement('li');
  prev.className = `page-item ${page === 1 ? 'disabled' : ''}`;
  prev.innerHTML = `<a class="page-link">Previous</a>`;
  prev.onclick = () => { if (page > 1) showPage(page - 1); };
  paginationContainer.appendChild(prev);

  // Page Number Buttons
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === page ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link">${i}</a>`;
    li.onclick = () => showPage(i);
    paginationContainer.appendChild(li);
  }

  // Next Button
  const next = document.createElement('li');
  next.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
  next.innerHTML = `<a class="page-link">Next</a>`;
  next.onclick = () => { if (page < totalPages) showPage(page + 1); };
  paginationContainer.appendChild(next);
}

// Initialize Pagination
showPage(1);



// =======================
// Filter Functionality
// =======================
document.getElementById('filterForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const textValue = document.getElementById('textFilter').value.toLowerCase();
  const dateValue = document.getElementById('dateFilter').value;
  const cards = document.querySelectorAll('.gallery-cards');

  cards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const date = card.getAttribute('data-date');
    const matchesText = textValue === '' || title.includes(textValue);
    const matchesDate = dateValue === '' || date === dateValue;

    card.style.display = (matchesText && matchesDate) ? 'block' : 'none';
  });
});


document.querySelectorAll('.carousel .carousel-item img').forEach(img => {
  img.style.cursor = 'pointer';

  img.addEventListener('click', function (e) {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const carousel = img.closest('.carousel');

    if (x > rect.width / 2) {
      // Clicked right side – go to next
      bootstrap.Carousel.getInstance(carousel).next();
    } else {
      // Clicked left side – go to previous
      bootstrap.Carousel.getInstance(carousel).prev();
    }
  });
});


const modal = document.getElementById('galleryModal');

modal.addEventListener('hidden.bs.modal', () => {
  const iframes = modal.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.src;
    iframe.src = src; // Reset src to stop video
  });
});
