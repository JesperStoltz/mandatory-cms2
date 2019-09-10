import React, { useState, useEffect, useRef } from 'react';
import Product from './Product.js'
import Home from './Home.js'
import Confirmation from './Confirmation.js'
import App from '../App.js'


const Shoppingcart = (props) => {

    let cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let amount = parseInt(cart[i].amount).toFixed(2);
        let price = parseInt(cart[i].price).toFixed(2);
        let combine = amount * price;
        total = total + combine;
    }

    console.log(total);

    let shoppingcart = props.cart.map(x => {
        return (
            <>
                <tr>
                    <td>{x.name}</td><td>{x.amount}</td><td>{x.price}</td><td><button>X</button></td>
                </tr>
            </>
        )
    })

    const onClick = (e) => {
        console.log(props.cart);
        console.log(localStorage);
    }

    return (
        <div className="Shoppingcart">
            <table>
                <thead>
                    <th>Product</th><th>Amount</th><th>Price</th>
                </thead>
                <tbody>
                    {shoppingcart}
                </tbody>
                <tfooter>
                    <td></td><td></td><td>Total: {total}</td>
                </tfooter>
            </table>
            <button onClick={onClick}>Log</button>
        </div>
    );
}

export default Shoppingcart;