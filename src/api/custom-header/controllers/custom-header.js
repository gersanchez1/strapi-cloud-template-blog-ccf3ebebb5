'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { flattenMedia } = require('../../../utils/flatten-media');

const deepPopulate = {
  logo: { populate: '*' },
  promoBar: { populate: '*' },
  syneriseSegmentation: true,
  navigation: {
    populate: {
      pageLinks: true,
      menu: {
        populate: {
          drawerMenu: {
            populate: {
              images: {
                populate: {
                  imagesMenu: { populate: '*' },
                },
              },
              subMenuCarousels: {
                populate: {
                  subMenuImages: { populate: '*' },
                },
              },
            },
          },
        },
      },
    },
  },
  searchInput: true,
  signInButton: { populate: '*' },
  cartIcon: true,
  searchInputv2: true,
};

module.exports = createCoreController('api::custom-header.custom-header', () => ({
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
