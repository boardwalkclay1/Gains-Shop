// Hidden dashboard unlock
let gsClickCount = 0;
const gsLogo = document.getElementById('gs-logo');

gsLogo.addEventListener('click', () => {
  gsClickCount++;
  if (gsClickCount >= 4) {
    gsClickCount = 0;
    window.location.href = '/admin.html';
  }
});

// Load products from Worker JSON API
async function loadProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();

  const app = document.getElementById('app');
  app.innerHTML = '';

  const seaMossSection = document.createElement('section');
  seaMossSection.id = 'sea-moss';
  seaMossSection.innerHTML = `<h2>Sea Moss</h2>`;
  const apparelSection = document.createElement('section');
  apparelSection.id = 'apparel';
  apparelSection.innerHTML = `<h2>Apparel</h2>`;

  data.products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>$${p.price}</strong>
      <button>Add to Cart</button>
    `;
    if (p.category === 'sea-moss') seaMossSection.appendChild(card);
    if (p.category === 'apparel') apparelSection.appendChild(card);
  });

  app.appendChild(seaMossSection);
  app.appendChild(apparelSection);
}

loadProducts();
