'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::custom-header.custom-header');
