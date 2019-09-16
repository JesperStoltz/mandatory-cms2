import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './Home.css';
import API from "../Storage/Api.js";
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
        props.updateRedirect(false);
        props.updateHide("hide");
        let pagination = "&limit=" + limit + "&skip=" + skip;
        let url = API.ROOT_URL + API.GET_PRODUCTS + API.TOKEN + pagination;
        if (stock) {
            url += "&filter[stock]=true"
        }
        if (search !== "") {
            url += "&filter[name][$regex]=" + search
        }
        else if (search === "" || search.length === 1) {
            updateLimit(parseInt(findLimit));
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
                <Link className="link" to={{ pathname: "/product/" + x._id, state: x._id }}>
                    <div id={x._id} className="productpost_container">
                        <img className="productpost_container_image" src={"https://cockpit-0fd022.devspace.host/" + x.gallery[0].path} />
                        <div className="card_text">
                            <p className="productpost_container_name">{x.name}</p>
                            <p className="productpost_container_price">Price: {x.price}</p>
                            <p className="productpost_container_stock">Stock: {x.stock}</p>
                        </div>
                    </div>
                </Link>
            </>
        )
    }
    )

    //==============RETURN/RENDER==================
    return (
        <div className="Home">
            <div className="Home_header">
                <div className="stock_container">
                    <p className="Home_header_p">Which products do you wish to see?</p>
                    <div className="stock_button_container">
                        <span className="Home_header_span">All items</span>
                        <input type="radio" name="stock" onChange={allStock} checked={!stock} />
                        <span className="Home_header_span">Only in Stock</span>
                        <input type="radio" name="stock" onChange={inStock} />
                    </div>
                </div>
                <div className="search_container">
                    <p className="Home_search_p">Or search for what you're interested in!</p>
                    <input className="Home_search" onChange={onSearch} />
                </div>
            </div>

            <div className="Home_products">
                <div className="products">
                    {productpost}
                </div>
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