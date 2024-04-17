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
  },

  async getListTaskByTaskerId(ctx) {
    try {
      const { id: taskerId } = ctx.params;
  
      // Lấy danh sách tất cả các task có status 'sended'
      const sendedTasksResult = await strapi.service('api::task.task').find({
        filters: { status: 'sended' },
        populate: ['customer', 'tasker', 'review', 'address']
      });
  
      let sendedTasks = [];
      if (Array.isArray(sendedTasksResult)) {
        sendedTasks = sendedTasksResult;
      } else if (sendedTasksResult && sendedTasksResult.results) {
        sendedTasks = sendedTasksResult.results;
      }
  
      // Lấy danh sách các task đã bị từ chối bởi tasker có id là taskerId
      const deniedTasks = await strapi.entityService.findMany('api::denied-task.denied-task', {
        filters: { tasker: taskerId },
        populate: { task: true }
      });
  
      // Lọc ra danh sách các task có status 'sended' và chưa bị từ chối bởi tasker có id là taskerId
      const filteredTasks = sendedTasks.filter(task => !deniedTasks.some(dt => dt.task.id === task.id));
  
      ctx.body = filteredTasks;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));