function loginController(loginUseCase) {
  return async (req, res, next) => {
    try {
      const { identifier, password } = req.body;
      const result = await loginUseCase.execute({ identifier, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}

function registerController(registerUserUseCase) {
  return async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = await registerUserUseCase.execute({ username, email, password });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { loginController, registerController };
