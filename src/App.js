import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Product from './Product.js';
import ShoppingCart from './ShoppingCart.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    cartItems:[],
    products:[]
  };
  handleAddItemToCart = product => {
    let cartItems = this.state.cartItems;

    const alreadyExist = cartItems.some(
      cartItem => cartItem.product.id===product.id
    );
    if(alreadyExist){
      cartItems= cartItems.map(cartItem=>{
        if(cartItem.product.id===product.id){
          cartItem.quantity= cartItem.quantity+1;
       
        }
         return cartItem;
      });
    } else {
    cartItems.push({
      product : product,
      quantity: 1
    });
    this.setState({cartItems: cartItems});
  };

}
handleRemoveItemFromCart = product => {
  const cartItemsState = this.state.cartItems;

  const selectedItemIndex = cartItemsState.findIndex(cartItem => {
    return cartItem.product.id === product.id;
  });
  const SelectedItem = cartItemsState[selectedItemIndex];

  if (selectedItemIndex.quantity > 1) {
    SelectedItem.quantity--;
  } else {
   cartItemsState.splice(selectedItemIndex, 1);
  }
  this.setState({
    cartItems: cartItemsState
  });
  //console.log(product);
};

  componentDidMount(){
    // console.log("Did mount !");
    fetch("http://product-list.glitch.me/")
    .then(response => response.json())
    .then(products => {
      this.setState({products:products});
    });

  };
  render() {
    // console.log(this.handleAddItemToCart);
    return (

      <div className="container">
  <Navbar/>
      <div className="columns">
        <div className="column is-two-thirds">
          <div>
            <h3 className="title">Our Products</h3>
            <div className="columns">
            {this.state.products.map(product=> 
            (<Product key={product.id} 
              product={product}
              onAddItemToCart={this.handleAddItemToCart}
              />
              ))}
  
            </div>
          </div>
        </div>
<ShoppingCart cartItems={this.state.cartItems}
onRemoveItemFromCart={this.handleRemoveItemFromCart} />
      </div>
    </div>

    );
  }
}

export default App;
