'use strict';

module.exports = {
  routes: [
    { method: 'POST', path: '/tasks', handler: 'api::task.task.create' },
    { method: 'GET', path: '/tasks', handler: 'api::task.task.find' },
    { method: 'GET', path: '/tasks/:id', handler: 'api::task.task.findOne' },
    { method: 'PUT', path: '/tasks/:id', handler: 'api::task.task.update' },
    { method: 'DELETE', path: '/tasks/:id', handler: 'api::task.task.delete' },
   
    {
      method: 'GET',
      path: '/:type/:id/historytasks', 
      handler: 'api::task.task.getHistoryTaskById',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/detailtask/:id',
      handler: 'api::task.task.getDetailTaskByTaskId',
      config: {auth:false}
    }
  ],
};