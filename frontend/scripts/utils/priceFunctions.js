import deliveryOptions from "../../../backend/data/deliveryOptions.js";
import cart from "../../../backend/data/cart.js";

export const getDeliveryPrice = () => {
  let totalDeliveryPrice = 0;

  cart.forEach((item) => {
    const deliveryList = document.querySelectorAll('input[name="delivery-option-' + item.product.id + '"]');

    for(let i=0; i<deliveryList.length; i++) {
      if (deliveryList[i].checked) {
          totalDeliveryPrice += deliveryOptions[i].priceCents;
      };
    };
  });
  return totalDeliveryPrice;
};

export const getItemsPrice = () => {
  let totalItemsPrice = 0;
  
  cart.forEach((item) => {
    for (let i=0; i<item.quantity; i++) {
      totalItemsPrice += item.product.priceCents;
    };
  });
  return totalItemsPrice;
};

export const getBeforeTaxPrice = () => {
  return getDeliveryPrice() + getItemsPrice();
};

export const getTaxPrice = () => {
  const taxValue = 0.1;
  const afterTaxPrice = getBeforeTaxPrice()*taxValue;
  return afterTaxPrice;
};

export const getTotalPrice = () => {
  return getDeliveryPrice() + getItemsPrice() + getTaxPrice();
};