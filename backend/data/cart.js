export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    };
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
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