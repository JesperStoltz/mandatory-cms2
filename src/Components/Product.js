import React, { useState, useEffect } from 'react';
import './Product.css';
import { cart$ } from '../Storage/Store.js'
import { updateCart } from '../Storage/Store.js'
const axios = require('axios');


const Product = (props) => {
    //================STATES==================
    const [data, updateData] = useState([]);
    const [review, updateReview] = useState([]);
    const [gallery, updateGallery] = useState([]);
    const [amount, updateAmount] = useState(1);
    const [reviewName, updateReviewName] = useState("");
    const [reviewComment, updateReviewComment] = useState("");
    const [reviewRating, updateReviewRating] = useState(5);

    //===============USEEFFECTS============================
    useEffect(() => {

        const id = props.match.params.id;
        let url = "https://cockpit-0fd022.devspace.host/api/collections/get/products?=b66a6aa37d732772938ec3de8e0b7f&filter[_id]=" + id;
        axios.post(url)
            .then(function (response) {
                updateData(response.data.entries);
                updateGallery(response.data.entries[0].gallery);

            });
    }, [props.ping]);

    useEffect(() => {
        const id = props.match.params.id;
        let url = "https://cockpit-0fd022.devspace.host/api/collections/get/review?=b66a6aa37d732772938ec3de8e0b7f&filter[id]=" + id;
        axios.post(url)
            .then(function (response) {
                updateReview(response.data.entries);
            });
    }, [props.ping, review]);


    //=========FUNCTIONS===================
    const addToCart = (name, price, id) => {
        let cart = cart$._value;

        let prodObj = {
            value: {
                name: name,
                price: parseInt(price),
                amount: amount,
                id: id
            }
        }

        let exists = false;

        if (cart.length === 0) {
            cart.push(prodObj);
        }
        else {
            for (let i = 0; i < cart.length; i++) {


                if (cart[i].value.id === prodObj.value.id) {

                    exists = true;
                    let newAmount = parseInt(cart[i].value.amount) + parseInt(prodObj.value.amount)

                    let newObj = {
                        value: {
                            name: prodObj.value.name,
                            price: prodObj.value.price,
                            amount: newAmount,
                            id: prodObj.value.id
                        }
                    }

                    cart[i] = newObj;
                }
            }

            if (exists === false) {
                cart.push(prodObj);
            }
        }

        updateCart(cart);

        if (props.ping === true) {
            props.updatePing(false);
        }
        else {
            props.updatePing(true);
        }

    }

    const onChange = (e) => {
        updateAmount(e.target.value);
    }

    const setReviewName = (e) => {
        updateReviewName(e.target.value);
    }

    const setReviewComment = (e) => {
        updateReviewComment(e.target.value);
    }

    const setReviewRating = (e) => {
        updateReviewRating(e.target.value);
    }

    const submitComment = (e) => {
        e.preventDefault();
        if (reviewName !== "" && reviewComment !== "") {
            let reviewObj = {
                title: reviewName,
                body: reviewComment,
                rating: reviewRating,
                id: data[0]._id,
                productlink: {
                    _id: data[0]._id,
                    link: "products",
                    display: data[0].name
                }
            }
            const id = props.match.params.id;
            let url = "https://cockpit-0fd022.devspace.host/api/collections/save/review?=b66a6aa37d732772938ec3de8e0b7f";
            axios.post(url, { data: reviewObj })
                .then((response) => {
                    console.log(response)
                })

                updateReviewName("");
                updateReviewComment("");

            if (props.ping === true) {
                props.updatePing(false);
            }
            else {
                props.updatePing(true);
            }
        }
    }

    //======RENDERING FUNCTIONS===============

    let gallerypost = gallery.map(x => {
        return (
            <div className="product_image_container">
                <img className="product_image" src={"https://cockpit-0fd022.devspace.host/" + x.path} />
            </div>
        )
    })

    let reviewposts = review.map(x => {
        return (
            <>
            <div className="review_post_container">
                <div className="review_container_title">Name: {x.title}</div>
                <div className="review_container_body">Comment: <br/>{x.body}</div>
                <div className="review_container_rating">Rating: {x.rating}/5</div>
            </div>
            </>
        )
    });

    let product = data.map(x => {
        return (
            <>
                <div id={x._id} className="product_container">
                    <div className="product_container_name">{x.name}</div>
                    <div className="product_container_description">{x.description}</div>
                    <p className="product_container_price">Price: {x.price}</p>
                    <p className="productpost_container_stock">Stock: {x.stock}</p>
                    <div className="add_item">
                    <input className="add_amount" id={x._id} type="number" min="1" onChange={onChange}/>
                    <button className="productpost_container_add" onClick={(e) => addToCart(x.name, x.price, x._id)}>Add</button>
                    </div>
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
                <p className="review_p">Reviews:</p>
                {reviewposts}
            </div>
            <div className="send_review_container">
                <h3 className="send_review_title">What's your opinion?</h3>
                <form onSubmit={submitComment}>
                    <span className="send_review_span">Your name</span><br/>
                    <input className="send_review_input" onChange={setReviewName} value={reviewName} /><br/><br/>
                    <span className="send_review_span" >Your comment</span><br/>

                    <textarea className="send_review_textarea" onChange={setReviewComment} value={reviewComment} /><br/><br/>
                    <span className="send_review_span">Your rating:</span>
                    <p className="send_review_ratingnum">{reviewRating}</p>
                    <input className="review_rating" type="range" min="1" max="5" step="1" className="send_review_rating" onChange={setReviewRating} /><br/>
                    <button className="send_review_button">Send</button>
                </form>
            </div>
        </div>
    );
}
export default Product;