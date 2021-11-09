import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";

import Cart from "../components/Cart";

function Detail() {
  const { id } = useParams();
  const [state, dispatch] = useStoreContext(); 
  const { products } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [currentProduct, setCurrentProduct] = useState({});

  // Check to see if the products in globalState is not empty
  // If it is not, then find the product that matches the id in the route and set that to the current product so that it will be displayed
  // if the globalState is empty and the query is complete, set the products in the globalState equal to the data from querying our DB

  // products would be empty if this was the first page that a user visited on the webpage ---> why we need to query 
  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
