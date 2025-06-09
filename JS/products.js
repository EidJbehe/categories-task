async function getProducts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const page = parseInt(params.get("page")) || 1;
    const limit = 20; 
    const skip = (page - 1) * limit; 
    let apiURL = "";
    if (category) {
      apiURL = `https://dummyjson.com/products/category/${category}`;
    } else {
      apiURL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }
    const { data } = await axios.get(apiURL);
    const products = data.products;
    const numberOfPages = Math.ceil(data.total / limit);
    if(page <0 || page > numberOfPages){
      window.location.href = "products.html?page=1";
    }
    const productList = document.querySelector(".products-list");
    let paginationLink = "";
    if(page==1){
     paginationLink=`<li class="page-item"><a href="products.html?page=${page-1}"class="page-link disabled">&lt;</a></li>`;
    }
    else{
           paginationLink=`<li class="page-item"><a href="products.html?page=${page-1}"class="page-link">&lt;</a></li>`;
    }
    for (let i = 1; i <= numberOfPages; i++) {
      paginationLink+=`<li class="page-item"><a href="products.html?page=${i}" class="page-link">${i}</a></li>`;
    }
    if(page==numberOfPages){
      paginationLink+=`<li class="page-item"><a href="products.html?page=${parseInt(page)+1}" class="page-link disabled">&gt;</a></li>`;
    }
    else{
          paginationLink+=`<li class="page-item"><a href="products.html?page=${parseInt(page)+1}" class="page-link">&gt;</a></li>`;
    }
    document.querySelector(".pagination").innerHTML = paginationLink;



    products.forEach((product) => {
      const li = document.createElement("li");
      li.classList.add("product-item");
      li.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
          <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <p class="product-category">${product.category}</p>
        </a>
      `;
      productList.appendChild(li);
    });
    customModal();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
getProducts();

function customModal() {
  const images = Array.from(document.querySelectorAll(".product-image"));
  const modal = document.querySelector(".myModal");
  const modalImg = document.querySelector(".modal-image");
  const closeBtn = document.querySelector(".close-btn");
  const rightBtn = document.querySelector(".right-btn");
  const leftBtn = document.querySelector(".left-btn");
  let currentIndex = 0;
  images.forEach((img) => {
    img.onclick = function (e) {
      modal.classList.add("show");
      e.preventDefault();
      modalImg.setAttribute("src", e.target.src);
      currentIndex = images.indexOf(e.target);
    };
  });
  function closeModal() {
    modal.classList.remove("show");
  }
  function rightImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0; // Loop to the first image
    } else {
      modalImg.setAttribute("src", images[currentIndex].src);
    }
  }
  function leftImage() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1; // Loop to the last image
    } else {
      modalImg.setAttribute("src", images[currentIndex].src);
    }
  }
  closeBtn.onclick = closeModal;
  rightBtn.onclick = rightImage;
  leftBtn.onclick = leftImage;
  document.onkeydown = function (e) {
      if(e.code==="Escape"){
        closeModal();
     }
      if(e.code==="ArrowLeft"){
       leftImage();
     }
     if(e.code==="ArrowRight"){
       rightImage();
     }
  };
}
