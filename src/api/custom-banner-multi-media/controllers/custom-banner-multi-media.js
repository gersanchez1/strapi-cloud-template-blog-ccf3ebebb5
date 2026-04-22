'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { flattenMedia } = require('../../../utils/flatten-media');

const deepPopulate = {
  mediaSrc: true,
  mobileMediaSrc: true,
  text2: true,
  termsAndConditions: true,
  promotionSettings: true,
  markerConfiguration: true,
};

module.exports = createCoreController('api::custom-banner-multi-media.custom-banner-multi-media', () => ({
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
