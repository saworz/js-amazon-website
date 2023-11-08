export let cart = JSON.parse(localStorage.getItem('cart'));
import { products } from "../../backend/data/products.js"

if (!cart) {
  cart = [];
};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
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
  saveToStorage();
  calculateQuantity();
};

export function deleteFromCart(deleteId) {
  const newCart = [];

  cart.forEach((product) => {

    if(product.product.id != deleteId) {
      newCart.push(product);
    };
  });

  cart = newCart;
  saveToStorage();
};

export function calculateQuantity() {
  let itemsQuantity = 0;

  cart.forEach((item) => {
    itemsQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = itemsQuantity;
}