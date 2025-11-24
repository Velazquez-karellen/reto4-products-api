const { CreateProductUseCase } = require('../../src/application/product/CreateProductUseCase');
const { Product } = require('../../src/domain/Product');

class ProductRepositoryMock {
  constructor() {
    this.products = [];
  }

  async create(product) {
    // Simula asignar un ID
    const newProduct = new Product({
      ...product,
      id: 1,
    });
    this.products.push(newProduct);
    return newProduct;
  }
}

describe('CreateProductUseCase', () => {
  test('crea un producto válido correctamente', async () => {
    const repo = new ProductRepositoryMock();
    const useCase = new CreateProductUseCase(repo);

    const input = {
      name: 'Mouse gamer',
      description: 'Mouse con RGB',
      price: 25.5,
      stock: 10,
    };

    const result = await useCase.execute(input);

    expect(result).toBeInstanceOf(Product);
    expect(result.id).toBe(1);
    expect(result.name).toBe('Mouse gamer');
    expect(result.price).toBe(25.5);
  });

  test('lanza error si el precio es negativo', async () => {
    const repo = new ProductRepositoryMock();
    const useCase = new CreateProductUseCase(repo);

    const input = {
      name: 'Producto inválido',
      description: 'precio negativo',
      price: -10,
      stock: 5,
    };

    await expect(useCase.execute(input)).rejects.toThrow('Product price must be a non-negative number');
  });
});
