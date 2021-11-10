import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from '../../utils/helpers';

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    const { cart, cartOpen } = state;
    // console.log(state);
    const toggleCart = () => {
        dispatch({
            type: TOGGLE_CART
        });
    }

    // check indexedDB's 'cart' store everytime the cart opens
    // our dependency array includes all the items that the useEffect() hook is dependent upon, and only runs again (after mounting) if any of the items in the dependency array have changed
    // in this case, that means that even if there is nothing to retrieve from the indexedDB store, the cart.length variable does not change from 0 and so the dependency array does not execute again
    useEffect(() => {
        async function getCart() {
            // have to wait for the get request to complete before adding to the global state
            const indexedCart = await idbPromise('cart', 'get');
            console.log(`useEffect cart: ${indexedCart}`); 
            dispatch({
                type: ADD_MULTIPLE_TO_CART,
                products: indexedCart
            });
        };
        // if the globalState for the cart is empty, check to see if there are any objects in the cart indexDB store
        // When the user closes the browser, the globalState is wiped and will be re-instantiated as blank
        // Thus, if there was anything the last time they were shopping, it will be added to indexedDB and so when they open the website again, it'll populate the globalState using indexedDB
        if(!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch]);

    const calculateTotal = () => {
        let sum = 0;

        cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });

        return sum.toFixed(2);
    }


    if (!cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="cart">🛒</span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            <div>
                {cart.length ?
                    <div>
                        {cart.map(item => <CartItem key={item._id} item={item} />)}
                        <div className="flex-row space-between">
                            <strong>Total: ${calculateTotal()}</strong>
                            {
                                Auth.loggedIn() ?
                                    <button>
                                        Checkout
                                    </button>
                                    :
                                    <span>(log in to checkout)</span>
                            }
                        </div>
                    </div>
                    :
                    <h3>
                        <span role="img" aria-label="shocked">
                            'insert shocked emoji here'
                        </span>
                        You haven't added anything to your cart yet!
                    </h3>
                }
            </div>
        </div>
    );
};

export default Cart;