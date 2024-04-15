'use strict';

/**
 * address router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::address.address');

const customRouter = (innerRouter, extraRoutes = []) => {
    let routes;
    return {
      get prefix() {
        return innerRouter.prefix;
      },
      get routes() {
        if (!routes) routes = innerRouter.routes.concat(extraRoutes);
        return routes;
      },
    };
  };

  const myExtraRoutes = [
    {
      method: 'GET',
      path: '/address/customer/:customerid',
      handler: 'api::address.address.getListAddressbyCustomerId',
    },
  ];

  module.exports = customRouter(defaultRouter, myExtraRoutes)