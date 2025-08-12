const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const grid = document.getElementById('portfolioGrid');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    // Filter cards
    cards.forEach(card => {
      card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });

    // Change columns based on category
    let cols;
    switch(category) {
      case 'thumbnail':
      case 'intro':
        cols = 'repeat(2, 1fr)';
        break;
      case 'social':
        cols = 'repeat(4, 1fr)';
        break;
      default:
        cols = 'repeat(3, 1fr)';
    }

    grid.style.gridTemplateColumns = cols;
  });
});

// Trigger default view
document.querySelector('.filter-btn.active').click();
