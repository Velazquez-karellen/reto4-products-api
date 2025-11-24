class Product {
  constructor({ id, name, description, price, stock, createdAt, updatedAt }) {
    this.id = id || null;
    this.name = name;
    this.description = description || '';
    this.price = price;
    this.stock = stock ?? 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();

    this.validate();
  }

  validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Product name is required');
    }
    if (this.price == null || isNaN(this.price) || this.price < 0) {
      throw new Error('Product price must be a non-negative number');
    }
    if (this.stock == null || isNaN(this.stock) || this.stock < 0) {
      throw new Error('Product stock must be a non-negative number');
    }
  }

  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.price !== undefined) this.price = data.price;
    if (data.stock !== undefined) this.stock = data.stock;
    this.updatedAt = new Date();
    this.validate();
  }
}

module.exports = { Product };
