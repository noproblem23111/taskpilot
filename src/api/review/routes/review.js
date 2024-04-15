'use strict';

/**
 * review router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::review.review');

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
    path: '/reviews/task/:id',
    handler: 'api::review.review.getListReviewByTaskId',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);