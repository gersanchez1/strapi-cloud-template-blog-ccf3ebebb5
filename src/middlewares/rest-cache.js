'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Only cache GET requests to the API
    if (ctx.method !== 'GET' || !ctx.url.startsWith('/api/')) {
      return;
    }

    // Skip if response is not successful
    if (ctx.status < 200 || ctx.status >= 300) {
      return;
    }

    // Set cache headers: browser caches 60s, CDN caches 5 min
    ctx.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    ctx.set('Surrogate-Control', 'max-age=300');
  };
};
