const bcrypt = require('bcryptjs');
const { User } = require('../../domain/User');

class UserRepositoryInMemory {
  constructor() {
    this.users = [];
    this.currentId = 1;

    // Crear usuario admin por defecto: admin / admin123
    const passwordHash = bcrypt.hashSync('admin123', 10);
    const adminUser = new User({
      id: this.currentId++,
      username: 'admin',
      email: 'admin@example.com',
      passwordHash,
      role: 'admin'
    });
    this.users.push(adminUser);

    console.log('Seeded admin user:', {
      username: adminUser.username,
      email: adminUser.email
    });
  }

  async findByUsernameOrEmail(identifier) {
    if (!identifier) return null;
    return (
      this.users.find(
        (u) => u.username === identifier || u.email === identifier
      ) || null
    );
  }

  async create(user) {
    const newUser = new User({
      ...user,
      id: this.currentId++
    });
    this.users.push(newUser);
    return newUser;
  }
}

module.exports = { UserRepositoryInMemory };
