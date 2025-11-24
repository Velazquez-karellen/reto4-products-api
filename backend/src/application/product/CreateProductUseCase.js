const { Product } = require('../../domain/Product');

class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(data) {
    const product = new Product({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock
    });

    const created = await this.productRepository.create(product);
    return created;
  }
}

module.exports = { CreateProductUseCase };
