class User {
  constructor({ id, username, email, passwordHash, role = 'user', createdAt, updatedAt }) {
    this.id = id || null;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();

    this.validate();
  }

  validate() {
    if (!this.username || typeof this.username !== 'string') {
      throw new Error('Username is required');
    }
    if (!this.email || typeof this.email !== 'string' || !this.email.includes('@')) {
      throw new Error('Valid email is required');
    }
    if (!this.passwordHash) {
      throw new Error('Password hash is required');
    }
  }
}

module.exports = { User };
