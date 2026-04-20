'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const deepPopulate = {
  card1: { populate: '*' },
  card2: { populate: '*' },
};

module.exports = createCoreController('api::infocard-doble.infocard-doble', () => ({
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
