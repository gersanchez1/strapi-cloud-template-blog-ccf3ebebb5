'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { flattenMedia } = require('../../../utils/flatten-media');

const deepPopulate = {
  cta: true,
  selectedFacets: true,
  productCardConfiguration: true,
};

module.exports = createCoreController('api::custom-product-shelf.custom-product-shelf', () => ({
  /** @param {any} ctx */
  async find(ctx) {
    if (!ctx.query.populate) ctx.query.populate = deepPopulate;
    const res = await super.find(ctx);
    res.data = flattenMedia(res.data);
    return res;
  },
  /** @param {any} ctx */
  async findOne(ctx) {
    if (!ctx.query.populate) ctx.query.populate = deepPopulate;
    const res = await super.findOne(ctx);
    res.data = flattenMedia(res.data);
    return res;
  },
}));
