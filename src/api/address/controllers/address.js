'use strict';

/**
 * address controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::address.address', ({ strapi }) => ({
  async getListAddressbyCustomerId(ctx) {
    try {
      const customerId = ctx.params.customerid; // Corrected variable name

      let entity; // Declared the variable

      try {
        entity = await strapi.entityService.findMany('api::address.address', {
          filters: { customer: customerId }, // Changed to use customerId
        });
      } catch (err) {
        ctx.throw(500, err);
      }

      ctx.body = entity; // Corrected variable name
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));
