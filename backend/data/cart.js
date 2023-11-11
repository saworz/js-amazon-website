export let cart = JSON.parse(localStorage.getItem('cart'));
import { products } from "../../backend/data/products.js"


if (!cart) {
  cart = [];
};

export const saveCartToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};


export const getCartQuantity = () => {
  let itemsQuantity = 0;

  cart.forEach((item) => {
    itemsQuantity += item.quantity;
  });

  return itemsQuantity;
};

export const clearCart = () => {
  cart = [];
  saveCartToStorage();
};


export const addToCart = (productId) => {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.product.id) {
      matchingItem = item;
    };
  });


  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      };
    });

    cart.push({
      product: matchingProduct,
      quantity: 1
    });
  };
  saveCartToStorage();
  setHeaderCartQuantity();
};

export const deleteFromCart = (deleteId) => {
  const newCart = [];

  cart.forEach((product) => {

    if(product.product.id != deleteId) {
      newCart.push(product);
    };
  });

  cart = newCart;
  saveCartToStorage();
  setHeaderCartQuantity();
};

export const setHeaderCartQuantity = () => {
  document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();
};

export const setCheckoutCartQuantity = () => {
  const html = `Checkout (<a class='return-to-home-link' href='main-page.html'>${getCartQuantity()} items</a>)`;
  document.querySelector('.js-cart-quantity').innerHTML = html;
};

export const updateCart = (productId, newQuantity) => {
  const productIndex = cart.findIndex(item => item.product.id === productId);
  cart[productIndex].quantity = newQuantity;
  saveCartToStorage();
};