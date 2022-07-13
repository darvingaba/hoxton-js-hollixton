import "./style.css";
type State = {
  store: Store[];
  user: User[];
  IsSearchBarActive: boolean;
};
type IsSearchBarActive = {
  isSearchBarActive: boolean;
}
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
  dateEntered: Date;
  stock: number;
};

let state = {
  store: [],
  user: [],
  isSearchBarActive: false,
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
    products.innerHTML = "";
    singleProductBuy(product);
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
// !checking the day the item was entered
function checkDate(date: Date) {
  for(let element of state.store){
      let dateEntered = new Date(date);
      let today = new Date();
      let diff = today.getTime() - dateEntered.getTime();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      console.log(days);
      if(days < 350){
          let product = document.querySelector(".products");
          if (product == null) return;
          let productContainer = document.querySelector(".product-container");
          if (productContainer == null) return;

          let newTag = document.createElement("p");
          newTag.classList.add("new-tag");
          newTag.innerText = "New";
          productContainer.prepend(newTag);
          product.append(productContainer);
    }
  }

}
// console.log(checkDate("2020-01-01"));




// ! function to create a product when user buys one
function singleProductBuy(product: Store) {
  let container = document.querySelector(".products");
  if (container == null) return;
  container.innerHTML = "";

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
  let backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerText = "Back";
  backButton.addEventListener("click", () => {
    if (container == null) return;
    container.innerHTML = "";
    render();
  });

  nameAndButton.append(productTitle, productPrice, addToCart, backButton);
  singleProduct.append(buyImgProduct, nameAndButton);

  container.append(singleProduct);
}

// !crearting the search bar
function createSearchBar() {
  let main = document.querySelector("main");
  if (main == null) return;
  main.innerHTML = "";

  let searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");
  let h1Element = document.createElement("h1");
  h1Element.innerText = "Search for your favorite products";
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search";
  let searchButton = document.createElement("button");
  searchButton.classList.add("search-button");
  searchButton.innerText = "Search";
  searchBar.append(h1Element,searchInput, searchButton);

  main.append(searchBar);
}


function toggleIsSearchBarActive() {
  let searchIcon = document.querySelector(".magnify-glass");

  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();
    state.isSearchBarActive = !state.isSearchBarActive;
    // render();
    console.log(state.isSearchBarActive);
  });
}


function render() {
  let products = document.querySelector(".products");
  if (products == null) return;
  products.innerHTML = "";


  for (let products of state.store) {
    createProduct(products);
  }
  toggleIsSearchBarActive();
  if (state.isSearchBarActive===true) {
    createSearchBar();
  }
  checkDate(state.store[0].dateEntered);
}
render();
