import React from 'react';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Productos</h3>
      {products.length === 0 ? (
        <p style={styles.empty}>No hay productos todavía.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>${p.price}</td>
                <td style={styles.td}>{p.stock}</td>
                <td style={styles.td}>
                  <button style={styles.edit} onClick={() => onEdit(p)}>
                    Editar
                  </button>
                  <button style={styles.delete} onClick={() => onDelete(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: '0.75rem',
  },
  empty: {
    fontStyle: 'italic',
    color: '#6b7280',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.5rem',
    fontSize: '0.9rem',
    color: '#4b5563',
  },
  td: {
    borderBottom: '1px solid #f3f4f6',
    padding: '0.5rem',
    fontSize: '0.9rem',
  },
  edit: {
    marginRight: '0.5rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#10b981',
    color: '#ffffff',
  },
  delete: {
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f97316',
    color: '#ffffff',
  },
};
