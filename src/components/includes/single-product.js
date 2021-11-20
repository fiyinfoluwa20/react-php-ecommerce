import {BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import $ from "jquery";
import React, {useState, useEffect} from 'react';
import {ProductConsumer, ProductProvider, Url}  from "../../context";
import Breadcrumbs from "./breadcrumbs";
import Description from "./description";
import Related_Products from "./related-products";
import ReactOwlCarousel from 'react-owl-carousel';
import options from "../../data";
import Header from './header-2';
import Loader from "./loader";
import Footer from './footer';
import "../../App.css"
const API_PATH = 'http://localhost/app/src/components/php/async.php';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

var option = {
  ...options,
  nav: true,
  loop: true,
}

function Products(){
  const [products, setProducts] = useState([]),
   [error, setError] = useState(false),
   [isLoaded, setIsLoaded] = useState(false),
   param1 = Url("product") || "",
   param2 = Url("token") || "";
  useEffect(() => {
    $.ajaxSetup({
      cache: false,
      dataType: "JSON",
      complete: function () {
      }
    });
    $.ajax({
      url: API_PATH + "?product="+param1+"&token="+param2,
      type: "GET",
      success: function(a){
        if (a) {
          setProducts(a);
          setIsLoaded(true);
        }
      },
      error: function(a){
          setIsLoaded(true);
          setError(a);
      }
    });

  }, []);
   return {products, error, isLoaded};
}

function Product(){
  const {products, error, isLoaded} = Products();
  if (!isLoaded) {
    return (
      <React.Fragment>
        <Header/>
        <Loader/>
        <Footer/>
      </React.Fragment>
    );
  } else if (error) {
    window.location.href = "/";
  } else {
  	return (
      <React.Fragment>
        <Header/>
    		<Breadcrumbs/>
        <section className="no-overflow py-lg-0" style={{backgroundColor: "#EFEFEF"}}>
          <div className="container">
            <div className="row align-items-center justify-content-center justify-content-lg-start position-relative" id="owlCarouselParent">
              <div id="nav-1" className="owl-external-nav"></div>

              <div className="col-md-6 col-lg-4">
                <ReactOwlCarousel className="owl-carousel owl-carousel--slide gallery visible" {...option} data-id="#nav-1">
                  <figure>
                    <a href="assets/images/demo/product-carousel-1.jpg"><img src={`assets/images/demo/`+products.image1} alt="Image"/></a>
                  </figure>
                  <figure>
                    <a href="assets/images/demo/product-carousel-1-2.jpg"><img src={`assets/images/demo/`+products.image2} alt="Image"/></a>
                  </figure>
                  <figure>
                    <a href="assets/images/demo/product-carousel-1-3.jpg"><img src={`assets/images/demo/`+products.image3} alt="Image"/></a>
                  </figure>
                  <figure>
                    <a href="assets/images/demo/product-carousel-1-4.jpg"><img src={`assets/images/demo/`+products.image1} alt="Image"/></a>
                  </figure>
                </ReactOwlCarousel>
              </div>

              <div className="col-md-8 col-lg-4 level-1">
                <ProductConsumer>
                    {value => {
                      if(!value.isLoaded || value.isError){
                        return (
                          <div className="col-12">
                            <Loader/>
                          </div>
                        )
                      } else {
                        return(
                          <React.Fragment>
                            <div className="col-12 text-center">
                              <span className="eyebrow text-muted">{products.category}</span>
                              <h1>{products.title}</h1>
                              <span className="price fs-18">${products.amount}</span>
                            </div>
                            <div className="col-12">
                              <div className="select-frame">
                                <select className="custom-select custom-select-lg mb-2 text-dark" style={{cursor: "pointer"}} name="addCartSize" placeholder="Select size">
                                  <option value="">size</option>
                                  {
                                   products && products.sizes.map((a, b)=> {
                                      return <option key={b} value={a}>{a}</option>;
                                    })
                                  }
                                </select>
                              </div>
                              <div className="row align-items-center mt-1">
                                <div className="col">
                                  <small className="text-muted">Product code: <span className="text-dark">{products.sku}</span></small>
                                </div>
                                <div className="col text-right">
                                  <a href="#" className="underline fs-14">Size Guide</a>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button className="btn btn-block btn-primary mb-2" type="submit" onClick={() => value.addCart(products.id)}> <i className="icon-shopping-cart mr-2"></i>Add to bag</button>
                                <a href="#" className="btn btn-outline-primary btn-ico btn-circle" onClick={() => value.addFavorite(products.id)}><i className="icon-heart"></i></a>
                            </div>
                          </React.Fragment>
                        );
                      }
                    }
                  }
                </ProductConsumer>

              </div>

            </div>
          </div>
        </section>
        <Description data={products} />
        <Related_Products/>
        <Footer/>
      </React.Fragment>
  	);
  }
}
export default Product;