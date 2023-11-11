export let orders = JSON.parse(localStorage.getItem('orders'));

const baseOrders = [
  {
    order_placed: 'November 4',
    total_price_cents: 4402,
    order_id: 'QpsOuNnSIHxdTgfsNqEhqhsP2ryiJf',
    products: [
      {
        product: {          
          id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
          image: "images/products/women-stretch-popover-hoodie-black.jpg",
          name: "Women's Stretch Popover Hoodie",
          rating: {
            stars: 4.5,
            count: 2465
          },
          priceCents: 1374,
          keywords: [
            "hooded",
            "hoodies",
            "sweaters",
            "womens",
            "apparel"
          ],
        },
        quantity: 2,
        arrival: 'November 9'
      },
      {
        product: {          
          id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
          image: "images/products/bathroom-rug.jpg",
          name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
          rating: {
            stars: 4.5,
            count: 119
          },
          priceCents: 1250,
          keywords: [
            "bathmat",
            "bathroom",
            "home"
          ],
        },
        quantity: 1,
        arrival: 'November 16'
      },
    ],  
  },
];

if (!orders) {
  orders = baseOrders;

  localStorage.setItem('orders', JSON.stringify(orders));
} else {
  orders = JSON.parse(localStorage.getItem('orders'))
};

export const saveOrdersToStorage = () => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const addToOrders = (newOrder) => {
  orders.push(newOrder);
  saveOrdersToStorage();
};

export default orders;