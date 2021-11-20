import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {ProductConsumer, ProductProvider}  from "../../context";
import Loader from "./loader";

export default function Favorite() {
	return (

        <li className="d-none d-lg-inline nav-item dropdown dropdown-md dropdown-hover">
          <a className="nav-icon" id="navbarDropdown-7" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="icon-heart"></i></a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown-7">
            <div className="row gutter-3">
							<ProductConsumer>
                {value => {
                  if(!value.isLoaded){
                    return (
                      <div className="col-12">
                        <Loader/>
                      </div>
                    )
                  } else if (value.isError || value.favorites.length < 1) {
                  	return  (
                        <div className="bg-white cart-item-list ml-3 p-3 mb-1">
                          <div className="text-base text-center" style={{fontSize: "1.5rem"}}>
                            <i className="icon-heart text-muted"></i>
                            <p>Your favourite is empty </p>
                          </div>
                        </div>
                    );
                  } else {
                    return(
                      <React.Fragment>
					              <div className="col-12">
					                <h3 className="eyebrow text-dark fs-16 mb-1">My Favorites</h3>
					                <p className="text-muted fs-14"><a href="#" className="underline">Sign in</a> to keep your saves for up to 60 days.</p>
					              </div>

					              <div className="col-12">
	                      	{value.favorites.map((a) => {
	                      		if (!a) {
	                      			return;
	                      		}
						                return (
							                <div className="cart-item" key={a.wish_tok}>
							                  <Link to={`/product?product=${a.title}&token=${a.p_tok}`} className="cart-item-image"><img src={`assets/images/demo/`+a.image1} alt="Image" /></Link>
							                  <div className="cart-item-body">
							                    <div className="row">
							                      <div className="col-9">
							                        <h5 className="cart-item-title">{a.title}</h5>
							                        <ul className="list list--horizontal fs-14">
							                          <li><s>${a.discount}</s></li>
							                          <li className="text-red">${a.amount}</li>
							                        </ul>
							                      </div>
							                      <div className="col-3 text-right">
							                        <ul className="cart-item-options">
							                          <li><a href="#" className="icon-x" onClick={() => value.deleteFavorite(a.id)}></a></li>
							                        </ul>
							                      </div>
							                    </div>
							                  </div>
							                </div>
						                );
	                      	})}
					                    	
					              </div>
				              </React.Fragment>
		                );
                  }
                }}
	            </ProductConsumer>
              <div className="col-12">
                <a href="#" className="btn btn-primary btn-block">Add all to cart</a>
                <a href="#" className="btn btn-outline-secondary btn-block">View favorites</a>
              </div>
            </div>
          </div>
        </li>
	)
}