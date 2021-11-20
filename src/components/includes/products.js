import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";
import {ProductConsumer}  from "../../context";
import Loader from "./loader";
const API_PATH = 'http://localhost/app/src/components/php/async.php';

function Product({status, error, products}) {
   if (!status) {
      return (
          <React.Fragment>
            <div className="col-6 col-lg-3">
                <figure className="category category--alt">
                  <div className="equal"><span className="image" style={{backgroundImage: `url(/assets/images/demo/background-3.jpg)`}} ></span></div>
                </figure>
            </div>
          </React.Fragment>
      );
    } else if (error) {
      return (
          <React.Fragment>
            <Loader value={{backgroundColor: "transparent", position: "relative", padding: "5rem"}}/>
          </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {products.map(a => (
            <div className="col-6 col-lg-3" key={a.p_tok}>
              <Link to={`/product?product=${a.title}&token=${a.p_tok}`}>
                <figure className="category category--alt">
                  <div className="equal"><span className="image" style={{backgroundImage: `url(/assets/images/demo/${a.image1})`}} ></span></div>
                  <figcaption>{a.title}</figcaption>
                </figure>
              </Link>
            </div>
          ))}
        </React.Fragment>
      );
   }
}
function Data(){
  const [products, setProducts] = useState([]),
   [error, setError] = useState(false),
   [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    $.ajaxSetup({
      cache: false,
      dataType: "JSON",
      complete: function () {
      }
    });
    $.ajax({
      url: API_PATH + "?url=index",
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

function Products () {
  const {products, error, isLoaded} = Data();
  return (
    <React.Fragment>
      <section>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-8 col-md-6">
              <span className="eyebrow text-muted">Shop by category</span>
              <h2>Trending Categories</h2>
            </div>
            <div className="col-4 col-md-6 text-right">
              <Link to="/" className="underlined">View More</Link>
            </div>
          </div>
          <div className="row gutter-1">
              <Product error={error} status={isLoaded} products={products}/>
          </div>
        </div>
      </section>
    </React.Fragment>
  )


}

export {Products, Data};