'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::custom-header.custom-header');
