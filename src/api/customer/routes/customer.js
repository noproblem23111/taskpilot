module.exports = {
    routes: [
      // CRUD Operations
      { method: 'POST', path: '/customers', handler: 'customer.create' },
      { method: 'GET', path: '/customers', handler: 'customer.find' },
      { method: 'GET', path: '/customers/:id', handler: 'customer.findOne' },
      { method: 'PUT', path: '/customers/:id', handler: 'customer.update' },
      { method: 'DELETE', path: '/customers/:id', handler: 'customer.delete' },
  
      // Custom findByAddress Route
      
    ],
  };
  