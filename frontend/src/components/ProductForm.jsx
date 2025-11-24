import React, { useEffect, useState } from 'react';

const initialState = {
  name: '',
  description: '',
  price: '',
  stock: '',
};

export default function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      setForm(initialState);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!editingProduct) {
      setForm(initialState);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h3 style={styles.title}>{editingProduct ? 'Editar producto' : 'Crear producto'}</h3>
      <input
        style={styles.input}
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        style={styles.textarea}
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />
      <input
        style={styles.input}
        type="number"
        step="0.01"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <button style={styles.button} type="submit">
        {editingProduct ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9fafb',
  },
  title: {
    marginBottom: '0.75rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    minHeight: '60px',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
