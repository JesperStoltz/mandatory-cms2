import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Product from './Product.js'
import Shoppingcart from './Shoppingcart.js'
import Confirmation from './Confirmation.js'
import App from '../App.js'
import './Home.css';
const axios = require('axios');


const Home = (props) => {
    //================STATES==================
    const [data, updateData] = useState([]);
    const [total, updateTotal] = useState(0);
    const [skip, updateSkip] = useState(0);
    const [limit, updateLimit] = useState(4);
    const [findLimit, updateFindLimit] = useState(4)
    const [disPrev, updateDisPrev] = useState(false);
    const [disNext, updateDisNext] = useState(true);
    const [stock, updateStock] = useState(false);
    const [search, updateSearch] = useState("");
    const selectEl = useRef(null);

    //===============USEEFFECTS============================
    useEffect(() => {
        let pagination = "&limit=" + limit + "&skip=" + skip;
        let url = "https://cockpit-0fd022.devspace.host/api/collections/get/products?=b66a6aa37d732772938ec3de8e0b7f" + pagination;
        if (stock) {
            url += "&filter[stock]=true"
        }
        if (search !== "") {
            url += "&filter[name][$regex]=" + search
            updateLimit(5000);
        }
        else if (search === ""){
            updateLimit(findLimit);
        }

        axios.post(url)
            .then(function (response) {
                let tot = parseInt(response.data.total);
                updateTotal(tot);
                updateData(response.data.entries);
            });

    }, [skip, limit, stock, search]);

    useEffect(() => {
        if (skip - limit < 0) {
            updateDisPrev(true)
            updateDisNext(false)
        }
        else if (skip + limit >= total) {
            updateDisNext(true);
            updateDisPrev(false)
        }
        else {
            updateDisNext(false);
            updateDisPrev(false);
        }

        if (limit == total) {
            updateDisNext(true);
            updateDisPrev(true);
        }

        if (skip > total) {
            updateSkip(limit);
        }
    }, [skip, limit]);

    //=========FUNCTIONS===================
    const goBack = () => {
        updateSkip(skip - limit);
    }

    const goForward = () => {
        updateSkip(skip + limit);
    }

    const onSelect = (e) => {
        updateLimit(selectEl.current.value);
        updateFindLimit(e.target.value);
    }

    const inStock = (e) => {
        updateStock(true);
    }

    const allStock = (e) => {
        updateStock(false);
    }

    const onSearch = (e) => {
        updateSearch(e.target.value);
    }

    //======RENDERING FUNCTIONS===============

    let productpost = data.map(x => {
        return (
            <>
                <div id={x._id} className="productpost_container">
                    <Link className="link" to={{ pathname: "/product/" + x._id, state: x._id }}><img className="productpost_container_image" src={"https://cockpit-0fd022.devspace.host/" + x.gallery[0].path} /></Link>
                    <div className="productpost_container_name" id={x._id}><Link className="link" to={{ pathname: "/product/" + x._id, state: x.name }}>{x.name}</Link></div>
                    <div className="productpost_container_description">{x.description}</div>
                    <p className="productpost_container_pricetitle">Price:</p>
                    <div className="productpost_container_price">{x.price}</div>
                    <p className="productpost_container_stocktitle">Stock:</p>
                    <div className="productpost_container_stock">{x.stock}</div>
                </div>
            </>
        )
    }
    )

    //==============RETURN/RENDER==================
    return (
        <div className="Home">
            <div className="Home_header">
                <p className="Home_header_p">Which products do you wish to see?</p>
                <span className="Home_header_span">All items</span>
                <input type="radio" name="stock" onClick={allStock} />
                <span className="Home_header_span">Only in Stock</span>
                <input type="radio" name="stock" onClick={inStock} />
            </div>
            <div className="Home_searchfield">
                <p className="Home_search_p">Or search for what you're interested in!</p>
                <input className="Home_search" onChange={onSearch}/>
            </div>
            <div className="Home_products">
                {productpost}
                <div className="button_container">
                    <button disabled={disPrev} onClick={goBack}>Back</button>
                    <div className="select_container">
                        Articles per Page:
                    <select ref={selectEl} onChange={onSelect}>
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    <button disabled={disNext} onClick={goForward}>Forward</button>
                </div>
            </div>
        </div>
    );
}

export default Home;