const express = require('express');
const { createProductController } = require('./productController');
const { authMiddleware } = require('./authMiddleware');

function createProductRoutes(deps) {
  const router = express.Router();
  const controller = createProductController(deps);

  // Proteger todas las rutas de productos
  router.use(authMiddleware);

  router.get('/', controller.list);
  router.get('/:id', controller.getOne);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
}

module.exports = { createProductRoutes };
