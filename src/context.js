import $ from "jquery";
import React from 'react';
import ReactOwlCarousel from 'react-owl-carousel';
const ProductContext = React.createContext();
const API_PATH = 'http://localhost/app/src/components/php/async.php';

class ProductProvider extends React.Component {
  constructor(a){
    super(a);
    this.state = {
      isLoaded: false,
      isError: false,
      error: [],
      cart: [],
      carts: [],
      favorites: [],
      cartTax: 0,
      cartTotal: 0,
    };
  }
  componentDidMount() {
    $.ajaxSetup({
      cache: false,
      dataType: "JSON",
      complete: function () {
      }
    });
    this.updateAllCart();
  }
  updateAllCart(){
    let localcarts = [...this.getItem()],
    $this = this,
    token = localcarts.map(item => item.cartToken);
    this.setState(() => {
      return {cart: [...this.getItem()]};
    })
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "updateAllCart=" + token,
      success: function(a){
        if (a.cart &&  a.carts && a.favorites) {
          $this.setState(()=> {
            return {cart: a.cart, carts: a.carts, favorites: a.favorites, cartTotal: a.totals, cartTax: Number(1000), subTotal: a.total, isLoaded: true, isError: false};
          });
          $this.setItem($this.state.cart);
        }
      },
      error: function(a){
        if (a) {
            $this.setState(() => {
              return {cart: [], isLoaded: true, isError: true, error: a}
            });
        }
      }
    });
  }
  setItem(item) {
    localStorage.setItem('cart', JSON.stringify(item));
  }
  getItem(){
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
  addCart = (id) => {
    const size = document.querySelector("[name='addCartSize']").value;
    if (size == "") {
      alert("Select a size");
      return false;
    }
    var $this = this;
    let localcarts = [...this.state.carts];
    this.setState(()=> {
      return {cart: this.getItem()};
    });
    let token = localcarts.map(item => item.cart_tok);
    let product_id = localcarts.map(item => item.product_id);
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "addCart=" + id + "&size=" + size + "&token=" + token + "&id=" + product_id,
      success: function(a){
        if (a.cart && a.carts && "success" === a.status) {
          $this.setState(()=> {
            return {cart: [...$this.state.cart, a.cart], carts: [...$this.state.carts, a.carts], isLoaded: true};
          })
          $this.setItem($this.state.cart);
          $this.updateAllCart();
          alert("Cart added to successfully");
        } else if ("error" === a.status) {
          alert("Already added to cart");
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  deleteCart = (id) => {
    var $this = this;
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "deleteCart=" + id,
      success: function(a){
        if ("success" === a.status) {
          alert("Cart deleted successfully");
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  quatity = (num, id) => {
    var $this = this;
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "quatity=" + num + "&id=" + id,
      success: function(a){
        if (a.status === "success") {
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  changesize = (size, id) => {
    var $this = this;
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "changesize=" + size + "&id=" + id,
      success: function(a){
        if (a.status === "success") {
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  addFavorite = (id) => {
    var $this = this;
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "addFavorite=" + id,
      success: function(a){
        if (a.status === "success") {
          $this.setState(()=> {
            return {favorites: [a.data], isLoaded: true};
          })
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  deleteFavorite = (id) => {
    var $this = this;
    $.ajax({
      url: API_PATH,
      type: "POST",
      data: "deleteFavorite=" + id,
      success: function(a){
        if (a.status === "success") {
          $this.updateAllCart();
        }
      }
    });
    return false;
  }
  render () {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        addCart: this.addCart,
        deleteFavorite: this.deleteFavorite,
        deleteCart: this.deleteCart,
        quatity: this.quatity,
        changesize: this.changesize,
        addFavorite: this.addFavorite,
       }}>
      {this.props.children}
      </ProductContext.Provider>
      );
  }
}

function Url(sParam){
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }
  return getUrlParameter(sParam); 
}
const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer, Url };