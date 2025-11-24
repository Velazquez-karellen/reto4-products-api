import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { userInfo, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Reto 4 – Productos</span>
      <div style={styles.right}>
        {userInfo && (
          <span style={styles.user}>
            {userInfo.username || 'Usuario'}
          </span>
        )}
        <button style={styles.button} onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: '60px',
    backgroundColor: '#1f2933',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    justifyContent: 'space-between',
  },
  brand: {
    fontWeight: 'bold',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  user: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#e11d48',
    color: '#ffffff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
