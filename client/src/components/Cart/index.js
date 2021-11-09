import React from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART } from "../../utils/actions";

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    const { cart, cartOpen } = state;
    // console.log(state);
    const toggleCart = () => {
        dispatch({
            type: TOGGLE_CART
        });
    }

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
                        {cart.map(item => <CartItem key={item.id} item={item} />)}
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