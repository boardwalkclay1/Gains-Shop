import products from '../data/products.json';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Products API
    if (url.pathname === '/api/products') {
      return new Response(JSON.stringify(products), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Orders API placeholder
    if (url.pathname === '/api/orders') {
      const orders = { orders: [] }; // later: persist in KV / D1
      return new Response(JSON.stringify(orders), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fallback
    return new Response('Not found', { status: 404 });
  }
};
