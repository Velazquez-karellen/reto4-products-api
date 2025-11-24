const { LoginUseCase } = require('../../src/application/auth/LoginUseCase');
const bcrypt = require('bcryptjs');

// Mock de bcrypt para controlar el resultado
jest.mock('bcryptjs');

describe('LoginUseCase', () => {
  const userMock = {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    passwordHash: 'hashed',
    role: 'admin',
  };

  const userRepositoryMock = {
    findByUsernameOrEmail: jest.fn(),
  };

  const tokenServiceMock = {
    sign: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('devuelve un token al hacer login con credenciales válidas', async () => {
    userRepositoryMock.findByUsernameOrEmail.mockResolvedValue(userMock);
    bcrypt.compare.mockResolvedValue(true);
    tokenServiceMock.sign.mockReturnValue('fake-jwt-token');

    const useCase = new LoginUseCase(userRepositoryMock, tokenServiceMock);

    const result = await useCase.execute({
      identifier: 'admin',
      password: 'admin123',
    });

    expect(userRepositoryMock.findByUsernameOrEmail).toHaveBeenCalledWith('admin');
    expect(bcrypt.compare).toHaveBeenCalledWith('admin123', 'hashed');
    expect(tokenServiceMock.sign).toHaveBeenCalledWith({
      userId: userMock.id,
      username: userMock.username,
      role: userMock.role,
    });
    expect(result).toEqual({ token: 'fake-jwt-token' });
  });

  test('lanza error si el usuario no existe', async () => {
    userRepositoryMock.findByUsernameOrEmail.mockResolvedValue(null);
    bcrypt.compare.mockResolvedValue(false);

    const useCase = new LoginUseCase(userRepositoryMock, tokenServiceMock);

    await expect(
      useCase.execute({ identifier: 'no-existe', password: 'x' })
    ).rejects.toThrow('Invalid credentials');
  });

  test('lanza error si la contraseña es incorrecta', async () => {
    userRepositoryMock.findByUsernameOrEmail.mockResolvedValue(userMock);
    bcrypt.compare.mockResolvedValue(false);

    const useCase = new LoginUseCase(userRepositoryMock, tokenServiceMock);

    await expect(
      useCase.execute({ identifier: 'admin', password: 'wrong' })
    ).rejects.toThrow('Invalid credentials');
  });
});
