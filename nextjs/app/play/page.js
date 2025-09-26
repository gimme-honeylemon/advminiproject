'use client';

import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.product}</strong>: {product.quantity} items at ${product.price} each
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

// export default function Play() {
//     return(
//         <h1>Play page</h1>
//     );
// }