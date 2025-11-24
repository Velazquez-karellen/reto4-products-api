require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { createProductRoutes } = require('./interfaces/http/productRoutes');
const { createAuthRoutes } = require('./interfaces/http/authRoutes');

// Repositorios e infraestructura (por ahora en memoria)
const { ProductRepositoryInMemory } = require('./infrastructure/repositories/ProductRepositoryInMemory');
const { UserRepositoryInMemory } = require('./infrastructure/repositories/UserRepositoryInMemory');
const { JwtTokenService } = require('./infrastructure/security/JwtTokenService');

// Casos de uso de productos
const { CreateProductUseCase } = require('./application/product/CreateProductUseCase');
const { ListProductsUseCase } = require('./application/product/ListProductsUseCase');
const { UpdateProductUseCase } = require('./application/product/UpdateProductUseCase');
const { DeleteProductUseCase } = require('./application/product/DeleteProductUseCase');
const { GetProductByIdUseCase } = require('./application/product/GetProductByIdUseCase');

// Casos de uso de auth
const { LoginUseCase } = require('./application/auth/LoginUseCase');
const { RegisterUserUseCase } = require('./application/auth/RegisterUserUseCase');

const app = express();
app.use(cors());
app.use(express.json());

// Instancias de infraestructura
const productRepository = new ProductRepositoryInMemory();
const userRepository = new UserRepositoryInMemory();
const tokenService = new JwtTokenService(process.env.JWT_SECRET || 'dev-secret');

// Casos de uso productos
const createProductUseCase = new CreateProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);

// Casos de uso auth
const loginUseCase = new LoginUseCase(userRepository, tokenService);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

// Rutas
app.use('/auth', createAuthRoutes(loginUseCase, registerUserUseCase));
app.use('/products', createProductRoutes({
  createProductUseCase,
  listProductsUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductByIdUseCase
}));

// Salud
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
