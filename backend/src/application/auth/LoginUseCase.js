const bcrypt = require('bcryptjs');

class LoginUseCase {
  constructor(userRepository, tokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async execute({ identifier, password }) {
    console.log('Login attempt:', { identifier });

    if (!identifier || !password) {
      const error = new Error('identifier and password are required');
      error.status = 400;
      throw error;
    }

    const user = await this.userRepository.findByUsernameOrEmail(identifier);
    console.log('User found:', !!user);

    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log('Password valid:', valid);

    if (!valid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = this.tokenService.sign({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return { token };
  }
}

module.exports = { LoginUseCase };
