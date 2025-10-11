let currentSortBy = null;
let currentOrder = null;

async function getProducts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const page = parseInt(params.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sortBy = params.get("sortBy");
    const order = params.get("order");

    let apiURL = "";

    if (category) {
      apiURL = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      apiURL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      apiURL += `&sortBy=${sortBy}&order=${order}`;
      currentSortBy = sortBy;
      currentOrder = order;
    }

    const { data } = await axios.get(apiURL);
    const products = data.products;
    const numberOfPages = Math.ceil(data.total / limit);

    if (page < 0 || page > numberOfPages) {
      window.location.href = "products.html?page=1";
    }

    const productList = document.querySelector(".products-list");
    productList.innerHTML = "";

    
    let paginationHTML = "";

    if (page == 1) {
      paginationHTML += `<li class="page-item disabled"><a class="page-link">&lt;</a></li>`;
    } else {
      paginationHTML += `<li class="page-item"><a class="page-link" href="products.html?page=${
        page - 1
      }${sortBy ? `&sortBy=${sortBy}&order=${order}` : ""}">&lt;</a></li>`;
    }

    for (let i = 1; i <= numberOfPages; i++) {
      if (i === 1 || i === numberOfPages || (i >= page - 2 && i <= page + 2)) {
        paginationHTML += `
          <li class="page-item ${i === page ? "active" : ""}">
            <a class="page-link" href="products.html?page=${i}${
          sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
        }">${i}</a>
          </li>`;
      } else if (i === 2 && page > 4) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      } else if (i === numberOfPages - 1 && page < numberOfPages - 3) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    if (page < numberOfPages) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="products.html?page=${
        page + 1
      }${sortBy ? `&sortBy=${sortBy}&order=${order}` : ""}">&gt;</a></li>`;
    } else {
      paginationHTML += `<li class="page-item disabled"><a class="page-link">&gt;</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;

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

/*Sorr proudcts */
document.querySelector("#sortBtn").addEventListener("click", sortProducts);
async function sortProducts() {
  const sortSelect = document.querySelector("#sortBy").value;
  const sortOrder = document.querySelector("#order").value;

  currentSortBy = sortSelect;
  currentOrder = sortOrder;

  window.location.href = `products.html?page=1&sortBy=${sortSelect}&order=${sortOrder}`;
}
/*Modal*/ 
function customModal() {
  const images = Array.from(document.querySelectorAll(".product-image"));
  const modal = document.querySelector(".myModal");
  const modalImg = document.querySelector(".modal-image");
  const closeBtn = document.querySelector(".close-btn");
  const rightBtn = document.querySelector(".right-btn");
  const leftBtn = document.querySelector(".left-btn");
  let currentIndex = 0;

  images.forEach((img) => {
    img.addEventListener("click", (e) => {
      modal.classList.add("show");
      e.preventDefault();
      modalImg.setAttribute("src", e.target.src);
      currentIndex = images.indexOf(e.target);
    });
  });

  function closeModal() {
    modal.classList.remove("show");
  }
  function rightImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    } else {
      modalImg.setAttribute("src", images[currentIndex].src);
    }
  }
  function leftImage() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else {
      modalImg.setAttribute("src", images[currentIndex].src);
    }
  }

  closeBtn.addEventListener("click", closeModal);
  rightBtn.addEventListener("click", rightImage);
  leftBtn.addEventListener("click", leftImage);

  document.addEventListener("keydown", ({ code }) => {
    if (code === "Escape") closeModal();
    if (code === "ArrowLeft") leftImage();
    if (code === "ArrowRight") rightImage();
  });
}
