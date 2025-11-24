const bcrypt = require('bcryptjs');
const { User } = require('../../domain/User');

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email, password }) {
    if (!username || !email || !password) {
      const error = new Error('username, email and password are required');
      error.status = 400;
      throw error;
    }

    const existing = await this.userRepository.findByUsernameOrEmail(username)
      || await this.userRepository.findByUsernameOrEmail(email);

    if (existing) {
      const error = new Error('User already exists');
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      passwordHash,
      role: 'user'
    });

    const created = await this.userRepository.create(user);

    // Nunca devolvemos el hash
    return {
      id: created.id,
      username: created.username,
      email: created.email,
      role: created.role
    };
  }
}

module.exports = { RegisterUserUseCase };
