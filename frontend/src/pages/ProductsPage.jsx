import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../api/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el producto');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.title}>Gestión de productos</h1>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.grid}>
          <div style={styles.left}>
            <ProductForm onSubmit={handleCreateOrUpdate} editingProduct={editingProduct} />
          </div>
          <div style={styles.right}>
            {loading ? <p>Cargando...</p> : (
              <ProductList
                products={products}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  },
  main: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  title: {
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1rem',
  },
  left: {},
  right: {},
  error: {
    color: '#b91c1c',
    marginBottom: '0.75rem',
  },
};
