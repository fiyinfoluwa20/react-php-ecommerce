import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {ProductConsumer, ProductProvider}  from "../../context";
import Loader from "./loader";

export default function SingleCart() {

  return (
    <li className="nav-item dropdown dropdown-md dropdown-hover">
      <Link to="/cart" className="nav-icon dropdown-toggle" id="navbarDropdown-8" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="icon-shopping-bag d-none d-lg-inline-block"></i>
        <span className="d-inline-block d-lg-none">Bag</span>
      </Link>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown-8">
        <div className="row gutter-3">
          <ProductConsumer>
            {values => {
              if(!values.isLoaded){
                return (
                  <div className="col-12 p-5">
                    <Loader value={{position: "relative", backgroundColor: "transparent"}}/>
                  </div>
                )
              } else if (values.isError || values.carts.length === 0) {
                return (
                  <div className="col-12">
                    <div className="text-center text-base my-1" style={{fontSize: "1.5rem"}}>
                      <i className="icon-shopping-bag text-muted"></i>
                      <p>Your cart is empty </p>
                    </div>
                  </div>
                )
              } else {
                return (
                  <React.Fragment>
                    <div className="col-12">
                      <h3 className="eyebrow text-dark fs-16 mb-0">My Bag</h3>
                    </div>
                    <div className="col-12">
                    {
                      values.carts.map((value) => {
                        return (
                          <div className="cart-item" key={value.cart_tok}>
                            <a href="#!" className="cart-item-image"><img src={`assets/images/demo/`+value.image1} alt="Image" /></a>
                            <div className="cart-item-body">
                              <div className="row">
                                <div className="col-9">
                                  <h5 className="cart-item-title">{value.title}</h5>
                                  <ul className="list list--horizontal fs-14">
                                    <li><s>${value.discount}</s></li>
                                    <li className="text-red">${value.amount}</li>
                                  </ul>
                                </div>
                                <div className="col-3 text-right">
                                  <ul className="cart-item-options">
                                    <li><a href="#" className="icon-x" onClick={() => values.deleteCart(value.cart_tok)}></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    <div className="col-12">
                      <ul className="list-group list-group-minimal">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-uppercase font-weight-bold">
                          Subtotal
                          <span>$78.00</span>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }
            }}
          </ProductConsumer>

          <div className="col-12">
            <Link to="/cart" className="btn btn-primary btn-block">Add all to cart</Link>
            <a href="#" className="btn btn-outline-secondary btn-block">View favorites</a>
          </div>
        </div>
      </div>
    </li>
  )
 }