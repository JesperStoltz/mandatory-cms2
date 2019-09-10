import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Home from './Components/Home.js'
import Product from './Components/Product.js'
import Shoppingcart from './Components/Shoppingcart.js'
import Confirmation from './Components/Confirmation.js'
import {token$} from './Storage/Store.js'
import {updateToken} from './Storage/Store.js'
import './App.css';

function App() {

  const [cart, updateCart] = useState([]);
  const [ping, updatePing] = useState(false);


  useEffect(() => {

}, [cart]);

useEffect(() => {
  
}, [cart]);

    //Aside uppdaterar inte trots att objektet uppdateras.
     let shoppingcart = cart.map(x => {
    return (
      <>
        <div className="shoppingcart_name">{x.name}</div>
        <div className="shoppingcart_price">{x.price}</div>
        <div className="shoppingcart_amount">{x.amount}</div>
      </>
    ) 
  })  

  const Log = (e) => {
    console.log(cart);
    console.log(token$)
    updateToken([]);
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="header_title"><Link className="pageList_li" to="/">Go Lift Yourself Up</Link></h1>
          <p className="header_p" onClick={Log}>Because you are your own best self-improvement enabler</p>
        </header>

        <aside>
          <div className="contact_form">
            <h2 className="contact_form_title">Go Lift Yourself Up</h2>
            <p className="contact_form_p">Second & Classic</p>
            <p className="contact_form_p">Portland, Oregon</p>
            <p className="contact_form_p"><a href="tel:555-555-5555">555-555-5555</a></p>
          </div>
          <div className="Shoppingcart">
                {shoppingcart} 
          </div>
          <button><Link className="pageList_li" to="/shoppingcart">Go to checkout</Link></button>
        </aside>

        <main>
          <Route exact path='/' component={() => <Home cart={cart} updateCart={updateCart}/>} />
          <Route path='/shoppingcart' component={() => <Shoppingcart cart={cart} updateCart={updateCart} />} />
          <Route path='/confirmation' component={() => <Confirmation cart={cart} />} />
          <Route path='/product/:id' render={(props) => <Product {...props} cart={cart} updateCart={updateCart} ping={ping} updatePing={updatePing}/>} />
        </main>
      </div>
    </Router>
  )
}

export default App;
