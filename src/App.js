import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from "./components/includes/single-product";
import Swiper from './components/includes/swiper';
import Cart from './components/includes/cart';
import { ProductProvider}  from "./context";
class App extends Component {

  render() {
    return (
      <React.Fragment>
      <ProductProvider>
          <Routes>
            <Route exact path="/" element={<Swiper/>} />
            <Route exact path="/product" element={<Product/>} />
            <Route exact path="/cart" element={<Cart/>} />
          </Routes>
        {/*<Footer/>*/}
        </ProductProvider>
      </React.Fragment>
    );
  }
}

export default App;
