'use strict';

/**
 * tasker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tasker.tasker');
