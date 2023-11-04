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
    $${(product.price_in_cents/100).toFixed(2)}
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

document.querySelector('.js-products-grid').innerHTML = productsHTML;