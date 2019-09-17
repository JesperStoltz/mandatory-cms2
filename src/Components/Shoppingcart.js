import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { cart$ } from '../Storage/Store.js'
import { updateCart } from '../Storage/Store.js'
import './Shoppingcart.css';


const Shoppingcart = (props) => {
    const [ping, updatePing] = useState(true)
    const [errorMessage, updateErrorMessage] = useState("");
    const [continueClass, updateContinueClass] = useState("toConfirmation_button")

    let cart = cart$._value;
    let total = 0;

    useEffect(() => {
        if (cart.length === 0) {
            updateErrorMessage("You have no items in your cart yet");
            updateContinueClass("hide");
        }
    }, [])

    for (let i = 0; i < cart.length; i++) {
        let amount = parseInt(cart[i].value.amount).toFixed(2);
        let price = parseInt(cart[i].value.price).toFixed(2); //Får inte rätt på decimalerna?
        let combine = amount * price;
        total = total + combine;
    }

    const onDelete = (e) => {

        let id = e.target.id;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].value.id === id) {
                let newArr = cart.slice(1);
                updateCart(newArr);
            }
        }
        if (ping === true) {
            updatePing(false);
        }
        else {
            updatePing(true);
        }
    }

    let shoppingcart = props.cart.map(x => {
        return (
            <>
                <tr>
                    <td>{x.value.name}</td><td>{x.value.amount}</td><td>{x.value.price}</td><td><button id={x.value.id} onClick={onDelete}>Remove from Cart</button></td>
                </tr>
            </>
        )
    })

    

    return (
        <div className="Shoppingcart">
            <table className="shoppingcart_table">
                <thead>
                    <tr><th>Product</th><th>Amount</th><th>Price</th><th></th></tr>
                </thead>
                <tbody>
                    {shoppingcart}
                </tbody>
                <tfoot>
                    <tr><td></td><td></td><td>Total: {total}</td><td></td></tr>
                </tfoot>
            </table>

            <div className="toConfirmation_container">
                <p className="errorMessage">{errorMessage}</p>
                <Link className={continueClass} to="/confirmation">Continue to checkout to complete your order</Link>
            </div>
        </div>
    );
}

export default Shoppingcart;