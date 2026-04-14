'use strict';

/**
 * use-strappi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::use-strappi.use-strappi');
