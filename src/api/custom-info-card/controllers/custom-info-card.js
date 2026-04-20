'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const deepPopulate = {
  cards: { populate: '*' },
};

module.exports = createCoreController('api::custom-info-card.custom-info-card', () => ({
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
