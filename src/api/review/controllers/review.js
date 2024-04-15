'use strict';

/**
 * review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review',({ strapi }) => ({
    async getListReviewByTaskId(ctx) {
      try {
        const { id } = ctx.params;
  
        let entity;
       
          // Lấy danh sách task của customer
          entity = await strapi.service('api::review.review').find({
            filters: { task: id },
            populate: ['customer', 'tasker', 'review'],
            sort: { createdAt: 'desc' }, // Sắp xếp theo thời gian tạo mới nhất
            pagination: { start: 0, limit: -1 }, // Lấy tất cả các bản ghi
          });
       
  
        ctx.body = entity;
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  }));