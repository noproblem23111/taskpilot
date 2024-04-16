'use strict';

module.exports = {
  // Tạo một tasker mới
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.create('api::tasker.tasker', { data });
      return entity;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Tìm và trả về tất cả taskers
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::tasker.tasker', ctx.query);
      return entities;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Tìm một tasker dựa trên taskerId
  // Tìm một tasker dựa trên taskerId
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entities = await strapi.entityService.findMany('api::tasker.tasker', {
        filters: { taskerId: { $eq: id } },
        populate: ['addresses'],
        ...ctx.query,
      });

      if (entities.length === 0) {
        ctx.throw(404, 'Tasker not found');
      } else if (entities.length > 1) {
        ctx.throw(500, 'Multiple taskers found with the same taskerId');
      }

      return entities[0];
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Cập nhật một tasker
  async update(ctx) {
    try {
      const { taskerId } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::tasker.tasker', taskerId, { data });
      return entity;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Xóa một tasker
  async delete(ctx) {
    try {
      const { taskerId } = ctx.params;
      const entity = await strapi.entityService.delete('api::tasker.tasker', taskerId);
      return entity;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};