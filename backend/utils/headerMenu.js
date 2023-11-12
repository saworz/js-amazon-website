const addEventsToButtons = () => {
  const moveToOrdersReturns = () => {
    document.querySelector(".js-orders-button").addEventListener("click", () => {
      window.location.href = "orders.html";
    });
  };
  
  const moveToCheckout = () => {
    document.querySelector(".js-checkout-button").addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  };

  moveToOrdersReturns();
  moveToCheckout();
};

const rolldownMenu = () => {
  document.querySelector(".js-mobile-list-link").addEventListener('click', () => {
    document.querySelector(".js-dropdown-content").classList.add("show");
  });
};

rolldownMenu();
addEventsToButtons();