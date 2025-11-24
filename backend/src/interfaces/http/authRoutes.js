const express = require('express');
const { loginController, registerController } = require('./authController');

function createAuthRoutes(loginUseCase, registerUserUseCase) {
  const router = express.Router();

  const loginHandler = loginController(loginUseCase);
  const registerHandler = registerController(registerUserUseCase);

  router.post('/token', loginHandler);
  router.post('/register', registerHandler);

  return router;
}

module.exports = { createAuthRoutes };
