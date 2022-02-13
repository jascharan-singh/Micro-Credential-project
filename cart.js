let cart = document.querySelectorAll('.btn1');
let product = [
{
  name:'Jordan Delta 2',
  tag :'JordanDelta2',
  price:130 ,
  inCart: 0
},
{
  name:'Air Jordan 11',
  tag :'AirJordan11',
  price: 95,
  inCart: 0},
{
  name:'Air Jordan OG',
  tag :'AirJordanOG',
  price: 145,
  inCart: 0
},
{
  name:'Jordan Max',
  tag :'JordanMax',
  price: 90,
  inCart: 0
},
{
  name:'Nike Renew',
  tag :'NikeRenew',
  price: 80,
  inCart: 0
},
{
  name:'Nike Court',
  tag :'NikeCourt',
  price: 70,
  inCart: 0
},
{
  name:'Nike Air Max9 0',
  tag :'NikeAirMax90',
  price: 140,
  inCart: 0
},
{
  name:'Jordan Max',
  tag :'JordanMax2',
  price: 90,
  inCart: 0
}

];
for( let i=0; i<cart.length;i++){
  cart[i].addEventListener('click', ()=>{
    cartNumbers(product[i]);
    totatCost(product[i]);
  })
}
function onLoadNumber(){
  let productNumber = localStorage.getItem('cartNumbers');
  if(productNumber){
    document.querySelector('.span').textContent = productNumber;
  }
}
function cartNumbers(product){

  let productNumber = localStorage.getItem('cartNumbers');
  productNumber = parseInt(productNumber);
  if(productNumber){
    localStorage.setItem('cartNumbers', productNumber + 1 );
    document.querySelector('.span').textContent = productNumber + 1 ;
  }
  else{
    localStorage.setItem('cartNumbers', 1 );
    document.querySelector('.span').textContent = 1 ;
  }
  setItem(product);
}
function setItem(product){

  let cartItem = localStorage.getItem('productInCart');
  cartItem = JSON.parse(cartItem);
  if(cartItem != null){
    if(cartItem[product.tag]==undefined){
      cartItem={
        ...cartItem,[product.tag]:product
      }
    }
    cartItem[product.tag].inCart+=1;
  }
  else{
  product.inCart = 1;
  cartItem = {
    [product.tag]:product
  }
}
  localStorage.setItem('productInCart', JSON.stringify(cartItem));
}
function totatCost(product){
  // console.log(product.price);
  let cartCost = localStorage.getItem("totalCost");

  localStorage.setItem("totalCost",product.price );
  if (cartCost !=null){
    cartCost= parseInt(cartCost);
      localStorage.setItem("totalCost",cartCost + product.price);
  }
  else{
      localStorage.setItem("totalCost",product.price );
  }

}
function displayCart(){
  let cartItem = localStorage.getItem("productInCart");
  cartItem = JSON.parse(cartItem);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  console.log(cartItem);
  if(cartItem && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItem).map(item=>{
      productContainer.innerHTML += `
      <div class = "product">

      <ion-icon name = "close-circle"></ion-icon>
      <img src = "IMAGES/${item.tag}.jpeg" width = "300" height = "300">
      <span>${item.name}</span>
      </div>
      <div class = "price">$ ${item.price},00</div>
      <div class = "quantity">

        <span>${item.inCart}</span>


            </div>
      <div class = "total">
        ${item.inCart * item.price},00
      </div>
      <br>
      `;
    });
    productContainer.innerHTML += `

    <div class = "basketTotalContainer">
      <h4 class =  "basketTotalTitle">
      Basket Total
      </h4>
      <h4 class = "basketTotal">
        $${cartCost},00
      </h4>
    `;
  }
}
onLoadNumber();
displayCart();
