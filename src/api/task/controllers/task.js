'use strict';

const { sort } = require('../../../../config/middlewares');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
  async getHistoryTaskById(ctx) {
    try {
      const { id, type } = ctx.params;

      let entity;
      if (type === 'customer') {
        // Lấy danh sách task của customer
        entity = await strapi.service('api::task.task').find({
          filters: { customer: id },
          populate: ['customer', 'tasker', 'review', 'address'],
          sort: { createdAt: 'desc' }, // Sắp xếp theo thời gian tạo mới nhất
          pagination: { start: 0, limit: -1 }, // Lấy tất cả các bản ghi
        });
      } else if (type === 'tasker') {
        // Lấy danh sách task của tasker
        entity = await strapi.service('api::task.task').find({
          filters: { tasker: id },
          populate: ['customer', 'tasker', 'review', 'address'],
          sort: { createdAt: 'desc' },
          pagination: { start: 0, limit: -1 },
        });
      } else {
        return ctx.badRequest('Invalid type');
      }

      ctx.body = entity;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getDetailTaskByTaskId(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.service('api::task.task').find({ 
        filters: { id: id },
        populate: ['customer', 'tasker', 'review', 'address']
      });

      if (!entity) {
        return ctx.notFound('Task not found');
      }

      ctx.body = entity;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));