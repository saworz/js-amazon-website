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
};

export function deleteFromCart(productId, checkoutItems) {
  const newCart = [];

  checkoutItems.forEach((item) => {
    if (item.product.id != productId) {
      newCart.push(item);
    };
  });

  cart = newCart;
  saveToStorage();
};