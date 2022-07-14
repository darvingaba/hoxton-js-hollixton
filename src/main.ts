import "./style.css";
type State = {
  store: Store[];
  user: User[];
  modal:"search" | "bag" | "";
  page: "home" | "Girls" | "Guys" | "Sale";
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
  dateEntered: Date;
  stock: number;
};

let state:State = {
  store: [],
  user: [],
  modal:"",
  page: "home"
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

// ! rendering the girls page

function renderGirlsProducts(){
    let girlsProducts = state.store.filter(prod => prod.type==="Girls")
    state.store= girlsProducts;
    render();
  }

  let girlsProd = document.querySelector(".girls-link")
  girlsProd.addEventListener("click", function(){
    state.page = "Girls";
    render()
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
function createSearchBar(product: Element) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let searchContainer = document.createElement("div");

  let button = document.createElement("button");
  button.innerHTML = "X";
  button.className = "modal-close-button";
  button.addEventListener("click",function(){
    state.modal= "";
    render();
  })

  let h2Element = document.createElement("h2");
  h2Element.innerText = "Search";

  let formEl = document.createElement("form");

  let inputEl = document.createElement("input");
  inputEl.className = "search-input";
  formEl.append(inputEl);

  searchContainer.append(button, h2Element, formEl);
  wrapper.append(searchContainer);
  product.append(wrapper);
}

let searchIcon = document.querySelector(".magnify-glass");
searchIcon?.addEventListener("click", function(){
  state.modal = "search";
  render();
})



function render() {
  let products = document.querySelector(".products");
  if (products == null) return;
  products.innerHTML = "";

  if (state.page === "Girls") {
    renderGirlsProducts();
  }

  for (let products of state.store) {
    createProduct(products);
  }
  if(state.modal==="search")createSearchBar(products);
}
render();


