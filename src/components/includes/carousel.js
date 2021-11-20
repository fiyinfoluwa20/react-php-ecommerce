import React from 'react';
import ReactOwlCarousel from 'react-owl-carousel';
import options from "../../data";
var option = {
  ...options,
  loop: true,
  nav: true,
  margin: 10,
  responsive: {
    0: { items:  2 },
    768: { items:  2 },
    1200: { items:  2 },
    1600: { items:  1}
  },
}
export default function Carousel() {
  return (
    <section className="py-lg-0 no-overflow">
      <div className="container">
        <div className="row align-items-center gutter-1">
          <div className="col-lg-3">
            <div className="pr-lg-5">
              <div className="level-1">
                <span className="eyebrow text-muted">Hot Products</span>
                <h2>Top Sellers</h2>
                <div className="nav nav-tabs flex-lg-column mt-md-3 lavalamp" id="myTab" role="tablist">
                  <a className="nav-item nav-link active" id="women" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Women</a>
                  <a className="nav-item nav-link" id="men" data-toggle="tab" href="#home1" role="tab" aria-controls="home1" aria-selected="true">Men</a>
                  <a className="nav-item nav-link" id="kids" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true">Kids</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row gutter-2 tab-content">


              <div className="col-12 tab-pane active" id="home" role="tabpanel">
                <ReactOwlCarousel className="owl-carousel owl-carousel--mask visible" {...option}>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-1.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-1-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">T-shirt</h3>
                      <span className="price">$19.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-2.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-2-2.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Swimwear</h3>
                      <span className="price">$39.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-3.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-3-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Skirt</h3>
                      <span className="price">$29.00</span>
                    </a>
                  </div>
                </ReactOwlCarousel>
              </div>

              <div className="col-12 tab-pane" id="home1" role="tabpanel">
                <ReactOwlCarousel className="owl-carousel owl-carousel--mask visible" {...option}>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-1.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-1-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">T-shirt</h3>
                      <span className="price">$19.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-2.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-2-2.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Swimwear</h3>
                      <span className="price">$39.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-3.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-3-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Skirt</h3>
                      <span className="price">$29.00</span>
                    </a>
                  </div>
                </ReactOwlCarousel>
              </div>

              <div className="col-12 tab-pane" id="home2" role="tabpanel">
                <ReactOwlCarousel className="owl-carousel owl-carousel--mask visible" {...option}>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-1.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-1-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">T-shirt</h3>
                      <span className="price">$19.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-2.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-2-2.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Swimwear</h3>
                      <span className="price">$39.00</span>
                    </a>
                  </div>
                  <div className="card card-product">
                    <figure className="card-image">
                      <a href="#" className="action"><i className="icon-heart"></i></a>
                      <a href="#">
                        <img src="assets/images/demo/product-3.jpg" alt="allwell" />
                        <img src="assets/images/demo/product-3-3.jpg" alt="allwell" />
                      </a>
                    </figure>
                    <a href="#" className="card-body">
                      <h3 className="card-title">Skirt</h3>
                      <span className="price">$29.00</span>
                    </a>
                  </div>
                </ReactOwlCarousel>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
    );
}