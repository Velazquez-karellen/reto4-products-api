class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, data) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    existing.update(data);
    const updated = await this.productRepository.update(id, existing);
    return updated;
  }
}

module.exports = { UpdateProductUseCase };
