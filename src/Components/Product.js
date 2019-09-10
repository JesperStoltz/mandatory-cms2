import React, { useState, useEffect, useRef } from 'react';
import Home from './Home.js'
import Shoppingcart from './Shoppingcart.js'
import Confirmation from './Confirmation.js'
import App from '../App.js'
import './Product.css';
import {token$} from '../Storage/Store.js'
import {updateToken} from '../Storage/Store.js'
const axios = require('axios');


const Product = (props) => {
    //================STATES==================
    const [data, updateData] = useState([]);
    const [review, updateReview] = useState([]);
    const [gallery, updateGallery] = useState([])
    const [amount, updateAmount] = useState(0);

    //===============USEEFFECTS============================
    useEffect(() => {

        const id = props.match.params.id;
        let url = "https://cockpit-0fd022.devspace.host/api/collections/get/products?=b66a6aa37d732772938ec3de8e0b7f&filter[_id]=" + id;
        axios.post(url)
            .then(function (response) {
                updateData(response.data.entries);
                updateGallery(response.data.entries[0].gallery);
            });
    }, []);

    useEffect(() => {
        const id = props.match.params.id;
        let url = "https://cockpit-0fd022.devspace.host/api/collections/get/review?=b66a6aa37d732772938ec3de8e0b7f&filter[productlink._id]=" + id;
        axios.post(url)
            .then(function (response) {
                updateReview(response.data.entries);
            });
    }, []);


    //=========FUNCTIONS===================
    const addToCart = (name, price) => {
        let cart = props.cart;
        let prodObj = {
            name: name,
            price: price,
            amount: amount
        }

        let exists = false;

        if (cart.length === 0) {
            props.updateCart([prodObj]);
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === prodObj.name) {
                    exists = true;
                    let newAmount = parseInt(cart[i].amount) + parseInt(prodObj.amount)
                    let newObj = {
                        name: prodObj.name,
                        price: prodObj.price,
                        amount: newAmount
                    }
                    cart[i] = newObj;
                    props.updateCart(cart);
                
                }
            }
            if (exists === false) {
                props.updateCart([...props.cart, prodObj]);
            }
        }

        if (props.ping === true){
            props.updatePing(false);
        }
        else {
            props.updatePing(true);
        }
        
    }

    const onClick = () => {
        console.log(review)
        console.log(props)
    }

    const onChange = (e) => {
        updateAmount(e.target.value)
    }

    //======RENDERING FUNCTIONS===============

    let gallerypost = gallery.map(x => {
        return (
            <img className="product_image" src={"https://cockpit-0fd022.devspace.host/" + x.path} />
        )
    })

    let reviewposts = review.map(x => {
        return (
            <>
                <div className="review_container_title">{x.title}</div>
                <div className="review_container_body">{x.body}</div>
                <div className="review_container_rating">{x.rating}/5</div>
            </>
        )
    })

    let product = data.map(x => {
        return (
            <>
                <div className="productpost_container">
                    <div className="productpost_container_name">{x.name}</div>
                    <div className="productpost_container_description">{x.description}</div>
                    <p className="productpost_container_pricetitle">Price:</p>
                    <div className="productpost_container_price">{x.price}</div>
                    <p className="productpost_container_stocktitle">Stock:</p>
                    <div className="productpost_container_stock">{x.stock}</div>
                    Amount:
                    <button className="productpost_container_add" onClick={(e) => addToCart(x.name, x.price, x._id)}>Add</button>
                    <input id={x._id} type="number" min="1" max="10" onChange={onChange} />
                </div>
            </>
        )
    }
    )

    //==============RETURN/RENDER==================
    return (
        <div className="Product">
            <div className="gallery">
                {gallerypost}
            </div>
            <div className="productinfo">
                {product}
            </div>
            <div className="review_container">
                {reviewposts}
            </div>
            <div className="send_review_container">
                <h3 className="send_review_title">What's your opinion?</h3>
                <form>
                    <span className="send_review_span">Your name</span>
                    <input className="send_review_input" />
                    <span className="send_review_span">Your comment</span>
                    <textarea className="send_review_textarea" />
                    <span className="send_review_span">Your rating</span>
                    <input onChange={onChange} type="range" min="1" max="5" step="1" className="send_review_rating" />
                    <button className="send_review_button">Send</button>
                </form>
            </div>
            <button onClick={onClick}>Log</button>

        </div>
    );
}

export default Product;