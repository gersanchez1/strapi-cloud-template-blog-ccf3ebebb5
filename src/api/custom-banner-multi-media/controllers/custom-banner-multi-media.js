'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const deepPopulate = {
  text2: true,
  termsAndConditions: true,
  promotionSettings: true,
  markerConfiguration: true,
};

module.exports = createCoreController('api::custom-banner-multi-media.custom-banner-multi-media', () => ({
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
