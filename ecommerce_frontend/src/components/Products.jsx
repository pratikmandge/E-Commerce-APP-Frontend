import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, auth.token, navigate]);

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <img src={product.thumbnail} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
