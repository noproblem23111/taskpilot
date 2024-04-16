'use strict';

module.exports = {
  // Tạo một customer mới
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.create('api::customer.customer', { data });
      return entity; // Trả về entity mới được tạo
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Tìm và trả về tất cả customers
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::customer.customer', ctx.query);
      return entities; // Trả về danh sách các entities
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entities = await strapi.entityService.findMany('api::customer.customer', {
        filters: { customerId: { $eq: id } },
        populate: ['addresses'],
        ...ctx.query,
      });
  
      if (entities.length === 0) {
        ctx.throw(404, 'Customer not found');
      } else if (entities.length > 1) {
        // Xử lý trường hợp có nhiều hơn một customer với cùng customerId
        ctx.throw(500, 'Multiple customers found with the same customerId');
      }
  
      return entities[0];
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  // Cập nhật một customer
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::customer.customer', id, { data });
      return entity; // Trả về entity đã cập nhật
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Xóa một customer
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.delete('api::customer.customer', id);
      return entity; // Trả về entity đã được xóa
    } catch (error) {
      ctx.throw(500, error);
    }
  },

};
