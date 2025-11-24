const { Product } = require('../../domain/Product');

class ProductRepositoryInMemory {
  constructor() {
    this.products = [];
    this.currentId = 1;

    // Producto de ejemplo
    this.create(new Product({
      name: 'Producto de ejemplo',
      description: 'Descripción inicial',
      price: 10,
      stock: 5
    }));
  }

  async findAll() {
    return this.products;
  }

  async findById(id) {
    return this.products.find(p => p.id === Number(id)) || null;
  }

  async create(product) {
    const newProduct = new Product({
      ...product,
      id: this.currentId++
    });
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, product) {
    const index = this.products.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    this.products[index] = product;
    return this.products[index];
  }

  async delete(id) {
    this.products = this.products.filter(p => p.id !== Number(id));
  }
}

module.exports = { ProductRepositoryInMemory };
