const products = [{
  name: 'Six pieces of non stick baking set for kitchen.',
  image: 'images/products/6-piece-non-stick-baking-set.webp',
  rating: {
    stars: 4.5,
    count: 125},
  price_in_cents: 1120
},{
  name: 'Very comfy tshirt that will match your shoes.',
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  rating: {
    stars: 4,
    count: 54},
  price_in_cents: 160
},{
  name: 'Super nice backpack for your next trip.',
  image: 'images/products/backpack.jpg',
  rating: {
    stars: 5,
    count: 121},
  price_in_cents: 3200
},{  
  name: 'Dark curtains for bedroom.',
  image: 'images/products/blackout-curtains-black.jpg',
  rating: {
  stars: 3.5,
  count: 21},
price_in_cents: 6600
}];

let productsHTML = '';

products.forEach((product) => {
  const html = `<div class="item-container">
  <div class="item-image-div">
    <img src="${product.image}" class="item-image">
  </div>
  <div class="item-description-div">
    ${product.name}
  </div>
  <div class="item-rating-div">
    <img src="images/ratings/rating-${product.rating.stars*10}.png" class="rating">
    <div class="rating-count-div">
      ${product.rating.count}
    </div>
  </div>
  <div class="item-price-div">
    $${product.price_in_cents/100}
  </div>
  <div class="item-amount-div">
    <select>
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>
  <div class="product-spacer"></div>
  <div class="item-add-div">
    <button class="add-button" onclick="">Add to Cart</button>
  </div>
</div>`

productsHTML += html;
});

console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML = productsHTML;