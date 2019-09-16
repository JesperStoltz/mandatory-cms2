import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Home from './Components/Home.js'
import Product from './Components/Product.js'
import Shoppingcart from './Components/Shoppingcart.js'
import Confirmation from './Components/Confirmation.js'
import { cart$ } from './Storage/Store.js'
import { updateCart } from './Storage/Store.js'
import './App.css';

function App() {

  const [cart, updateNewCart] = useState([]);
  const [ping, updatePing] = useState(false);
  const [redirect, updateRedirect] = useState(false);
  const [hide, updateHide] = useState("hide");

  useEffect(() => {
    cart$.subscribe((cart) => {
      updateNewCart(cart);
    })
  }, [cart]);

  useEffect(() => {

  }, [cart]);

  //Aside uppdaterar inte trots att objektet uppdateras.
  let shoppingcart = cart.map(x => {
    return (
      <>
        <div className="shoppingcart_name">{x.value.name}</div>
        <div className="shoppingcart_price">PaP: {x.value.price} :-</div>
        <div className="shoppingcart_amount">Qty: {x.value.amount}</div>
      </>
    )
  })

  return (
    <Router>
      <div className="App">
        <header>
          <Link className="header_title_link" to="/">Go Lift Yourself Up</Link>
          <p className="header_p">Because you are your own best self-improvement enabler</p>
        </header>

        <div className="main_aside">

          <main>
            <Route exact path='/' component={() => <Home cart={cart} updateCart={updateCart} redirect={redirect} updateRedirect={updateRedirect} updateHide={updateHide}/>} />
            <Route path='/shoppingcart' component={() => <Shoppingcart cart={cart} updateCart={updateCart} />} />
            <Route path='/confirmation' component={() => <Confirmation cart={cart} redirect={redirect} updateRedirect={updateRedirect} hide={hide} updateHide={updateHide}/>} />
            <Route path='/product/:id' render={(props) => <Product {...props} cart={cart} updateCart={updateCart} ping={ping} updatePing={updatePing} />} />
          </main>

          <aside>
            <div className="contact_form">
              <h2 className="contact_form_title">Go Lift Yourself Up</h2>
              <p className="contact_form_p">Second & Classic</p>
              <p className="contact_form_p">Portland, Oregon</p>
              <p className="contact_form_p"><a className="contact_link" href="tel:555-555-5555">Call: 555-555-5555</a></p>
            </div>
            <div className="Shoppingcart">
              <p className="shoppingcart_p">Your shoppingcart:</p>
              {shoppingcart}
            </div>
            <Link className="shoppingcart_goto" to="/shoppingcart">Go to Cart</Link>
          </aside>

        </div>
      </div>
    </Router>
  )
}

export default App;
