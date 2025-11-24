function createProductController(deps) {
  const {
    createProductUseCase,
    listProductsUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    getProductByIdUseCase
  } = deps;

  return {
    list: async (req, res, next) => {
      try {
        const products = await listProductsUseCase.execute();
        res.json(products);
      } catch (err) {
        next(err);
      }
    },

    getOne: async (req, res, next) => {
      try {
        const { id } = req.params;
        const product = await getProductByIdUseCase.execute(id);
        res.json(product);
      } catch (err) {
        next(err);
      }
    },

    create: async (req, res, next) => {
      try {
        const product = await createProductUseCase.execute(req.body);
        res.status(201).json(product);
      } catch (err) {
        next(err);
      }
    },

    update: async (req, res, next) => {
      try {
        const { id } = req.params;
        const updated = await updateProductUseCase.execute(id, req.body);
        res.json(updated);
      } catch (err) {
        next(err);
      }
    },

    remove: async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await deleteProductUseCase.execute(id);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  };
}

module.exports = { createProductController };
