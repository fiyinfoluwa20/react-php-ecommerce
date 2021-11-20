import React from 'react';
import {Link} from "react-router-dom";
import ReactOwlCarousel from 'react-owl-carousel';
import {ProductConsumer}  from "../../context";
import options from "../../data";
import {Data} from './products';
import Loader from "./loader";

var option = {
  ...options,
  nav: true,
  loop: true,
  margin: 10,
  responsive: {
    0: { items: 1},
    768: { items: 2},
    1200: { items: 3},
    1600: { items: 4}
  }
}

function Product({value}) {
	if (!value.isLoaded || value.error) {
      return <Loader value={{backgroundColor: "transparent", position: "relative", padding: "5rem"}}/>
  } else {
      return (
      	<ProductConsumer>
				{values => {
       return <ReactOwlCarousel className="owl-carousel visible" {...option}>
        {value.products.map((a) => {
        	return (
	          <div className="card card-product" key={a.p_tok}>
	            <figure className="card-image">
	              <a href="#" className="action" onClick={() => values.addFavorite(a.id)}><i className="icon-heart"></i></a>
	              <a href={`/product?product=${a.title}&token=${a.p_tok}`}>
	                <img src={`assets/images/demo/`+a.image1} alt="Image"/>
	                <img src={`assets/images/demo/`+a.image2} alt="Image"/>
	              </a>
	            </figure>
	            <Link to="" className="card-body">
	              <h3 className="card-title">{a.title}</h3>
	              <span className="price">${a.amount}</span>
	            </Link>
	          </div>
          )
        })}
        </ReactOwlCarousel>
	      }}
        </ProductConsumer>
      );
   }
   
}
function Related_Products(){
	return (
    <section className="no-overflow">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Recently viewed</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
	          <Product value={Data()}/>
          </div>
        </div>
      </div>
    </section>
	)
}
export default Related_Products;