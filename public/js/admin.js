const adminContent = document.getElementById('admin-content');
const sidebarButtons = document.querySelectorAll('.gs-admin-sidebar button');

sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    renderView(view);
  });
});

async function getProducts() {
  const res = await fetch('/api/products');
  return res.json();
}

async function renderView(view) {
  if (view === 'overview') {
    adminContent.innerHTML = `
      <h2>Overview</h2>
      <p>Quick stats for Gainz Shop will go here.</p>
    `;
  }

  if (view === 'products') {
    const data = await getProducts();
    adminContent.innerHTML = `<h2>Products</h2>`;
    const list = document.createElement('div');
    list.className = 'gs-admin-list';

    data.products.forEach(p => {
      const row = document.createElement('div');
      row.className = 'gs-admin-row';
      row.innerHTML = `
        <strong>${p.name}</strong>
        <span>$${p.price}</span>
        <span>Stock: ${p.stock ?? '—'}</span>
      `;
      list.appendChild(row);
    });

    adminContent.appendChild(list);
  }

  if (view === 'orders') {
    adminContent.innerHTML = `
      <h2>Orders</h2>
      <p>Hook this into /api/orders from the Worker.</p>
    `;
  }

  if (view === 'inventory') {
    adminContent.innerHTML = `
      <h2>Inventory</h2>
      <p>Future: edit stock, toggle active/inactive, etc.</p>
    `;
  }
}

// default view
renderView('overview');
