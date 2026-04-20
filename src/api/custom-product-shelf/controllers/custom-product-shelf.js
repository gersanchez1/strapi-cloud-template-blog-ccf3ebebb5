'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const deepPopulate = {
  cta: true,
  selectedFacets: true,
  productCardConfiguration: true,
};

module.exports = createCoreController('api::custom-product-shelf.custom-product-shelf', () => ({
  /** @param {any} ctx */
  async find(ctx) {
    if (!ctx.query.populate) ctx.query.populate = deepPopulate;
    return await super.find(ctx);
  },
  /** @param {any} ctx */
  async findOne(ctx) {
    if (!ctx.query.populate) ctx.query.populate = deepPopulate;
    return await super.findOne(ctx);
  },
}));
