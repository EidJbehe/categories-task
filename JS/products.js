async function getProducts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    let apiURL = "";
    if (category) {
      apiURL = `https://dummyjson.com/products/category/${category}`;
    } else {
      apiURL = "https://dummyjson.com/products";
    }

    const { data } = await axios.get(apiURL);
    const products = data.products;

    const productList = document.querySelector(".products-list");

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

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
getProducts();
