class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }
}

module.exports = { DeleteProductUseCase };
