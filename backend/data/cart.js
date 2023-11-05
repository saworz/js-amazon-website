export let cart = [{
  productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
  quantity: 2,
},{
  productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
  quantity: 3,
}];

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
}

export function deleteFromCart(productId, checkoutItems) {
  const newCart = [];

  checkoutItems.forEach((item) => {
    if (item.product.id != productId) {
      newCart.push(item);
    };
  });

  cart = newCart;
};