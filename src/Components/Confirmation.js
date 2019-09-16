import React, { useState, useEffect } from 'react';
import { cart$ } from '../Storage/Store.js'
import { updateCart } from '../Storage/Store.js'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import "./Confirmation.css";
const axios = require('axios');


function Confirmation(props) {
    const [name, updateName] = useState("");
    const [adress, updateAdress] = useState("");
    const [newRedirect, updateNewRedirect] = useState(false);
    

    useEffect(() => {

        if (props.redirect) {

            setTimeout(function () { updateNewRedirect(true); }, 5000);
        }


    }, [props.redirect])

    if (newRedirect) {
        return <Redirect to="/" />
    }

    const setName = (e) => {
        updateName(e.target.value);
    }

    const setAdress = (e) => {
        updateAdress(e.target.value);
    }

    const Confirm = () => {

        if (name !== "" && adress !== "" && cart$._value.length > 0) {

            let total = 0;

            let arr = cart$._value;

            for (let i = 0; i < arr.length; i++) {
                let amount = arr[i].value.amount;
                total = amount * parseInt(arr[i].value.price)
            }

            let orderObj = {
                name: name,
                adress: adress,
                total_price: total,
                product_list: cart$._value
            }

            let url = "https://cockpit-0fd022.devspace.host/api/collections/save/order?=b66a6aa37d732772938ec3de8e0b7f"
            axios.post(url, { data: orderObj })
                .then((response) => {
                    console.log(response)
                })

            updateCart([]);
            updateName("");
            updateAdress("");
            props.updateHide("show")
            props.updateRedirect(true);
            
        }

    }


    return (
        <div className="Confirmation">
            <p className="confirmation_p">Before you send your order we need some information.</p>
            <span className="confirmation_span">Name:</span>
            <input onChange={setName} className="confirmation_input" value={name} />
            <span className="confirmation_span">Adress:</span>
            <input onChange={setAdress} className="confirmation_input" value={adress} />
            <button onClick={Confirm} className="confirmation_button">Agree and confirm</button>

            <div className={props.hide}>
                <p className="confirmation_thankyou_p">Thank you for your order!</p>
                <p className="confirmation_thankyou_p">You will be returned to the frontpage in a few moments!</p>
            </div>
        </div>
    );
}

export default Confirmation;