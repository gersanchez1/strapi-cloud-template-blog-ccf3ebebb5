'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

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
    return await super.find(ctx);
  },
  /** @param {any} ctx */
  async findOne(ctx) {
    if (!ctx.query.populate) ctx.query.populate = deepPopulate;
    return await super.findOne(ctx);
  },
}));
