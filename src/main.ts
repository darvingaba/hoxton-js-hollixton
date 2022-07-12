import "./style.css";
type State = {
  store: Store[];
  user: User[];
};
type User = {
  firstName: string;
  lastName: string;
  id: string;
  password: string;
  bag: never[];
};
type Store = {
  id: number;
  type: string;
  name: string;
  image: string;
  price: number;
  discountedPrice: number;
  dateEntered: string;
  stock: number;
};

let state = {
  store: [],
  user: [],
};

// !fetching data from the server
fetch("http://localhost:3005/store")
  .then((response) => response.json())
  .then((data) => {
    state.store = data;
    render();
  });

fetch("http://localhost:3005/users")
  .then((response) => response.json())
  .then((data) => {
    state.user = data;
    render();
  });
// !creating the product
function createProduct(product: Store) {
  let products = document.querySelector(".products");
  if (products == null) return;

  // <div class="product-container">
  let productContainer = document.createElement("div");
  productContainer.classList.add("product-container");

  productContainer.addEventListener("click", () => {
    singleProductBuy(product);
    location.href = "/product.html";
    console.log(product.id);
  });
  //       <img src="https://img.hollisterco.com/is/image/anf/KIC_324-1085-0123-100_prod1" alt="">
  let productImage = document.createElement("img");
  productImage.src = product.image;
  //       <div class="product-info">
  let productInfo = document.createElement("div");
  productInfo.classList.add("product-info");
  //         <h2 class="product-title">Crewneck T-Shirt 3-Pack</h2>
  let productTitle = document.createElement("h2");
  productTitle.classList.add("product-title");
  productTitle.innerText = product.name;
  //         <p>$29</p>
  let productPrice = document.createElement("p");
  productPrice.innerText = `$${product.price}`;
  //       </div>
  productInfo.append(productTitle, productPrice);
  productContainer.append(productImage, productInfo);
  products.append(productContainer);
  //     </div>
}
// ! function to create a product when user buys one
function singleProductBuy(product: Store) {
  let container = document.querySelector(".single-product-container");
  if (container == null) return;
  // <div class="single-product">
  //         <img class="buy-img-product" src="https://img.hollisterco.com/is/image/anf/KIC_324-1085-0123-100_prod1" alt="">

  //         <div class="name-and-button">
  //             <h2 class="product-title">Crewneck T-Shirt 3-Pack</h2>
  //             <p>$29</p>
  //             <button class="add-to-cart">Add to Cart</button>
  //         </div>
  //     </div>
  let singleProduct = document.createElement("div");
  singleProduct.classList.add("single-product");
  let buyImgProduct = document.createElement("img");
  buyImgProduct.classList.add("buy-img-product");
  buyImgProduct.src = product.image;
  let nameAndButton = document.createElement("div");
  nameAndButton.classList.add("name-and-button");
  let productTitle = document.createElement("h2");
  productTitle.classList.add("product-title");
  productTitle.innerText = product.name;
  let productPrice = document.createElement("p");
  productPrice.innerText = `$${product.price}`;
  let addToCart = document.createElement("button");
  addToCart.classList.add("add-to-cart");
  addToCart.innerText = "Add to Cart";
  nameAndButton.append(productTitle, productPrice, addToCart);
  singleProduct.append(buyImgProduct, nameAndButton);

  container.append(singleProduct);
}

function render() {
  let products = document.querySelector(".products");
  if (products == null) return;
  products.innerHTML = "";

  for (let products of state.store) {
    createProduct(products);
  }
}
render();
