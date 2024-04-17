'use strict';

/**
 * denied-task service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::denied-task.denied-task');
