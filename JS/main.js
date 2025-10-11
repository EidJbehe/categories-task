async function getCategories() {
    try{
  const {data} = await axios.get("https://dummyjson.com/products/category-list");
    const topFive = data.slice(0, 5); 

  topFive.map((category) => {
  const categoryList = document.querySelector(".categories-list");
  const li = document.createElement("li");
  li.classList.add("category-item");
  li.innerHTML = `
    <a href="products.html?category=${encodeURIComponent(category)}" class="category-link">
      ${category}
    </a>
  `;
  categoryList.appendChild(li);

});
}
catch (error) {
   console.error("Error fetching categories:", error); 
}
}
getCategories();
async function getProducts() {
    try {
        const { data } = await axios.get("https://dummyjson.com/products?limit=5");
        const products = data.products.slice(0, 5); // Get the first 5 products

        products.map((product) => {
            const productList = document.querySelector(".products-list");
            const li = document.createElement("li");
            li.classList.add("product-item");
            li.innerHTML = `
                <a href="product.html?id=${product.id}" >
                    <img src="${product.thumbnail}" alt="${product.image}" class="product-image">
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
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", searchProducts);
async function searchProducts(){
    const query = document.querySelector(".search-input").value;
    console.log(query);
    try {
        const response= await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
        
      const products = response.data.products;

      const resultsOfSearch= document.querySelector('.products-list');
      const  searchResult=document.querySelector('.top-products h1');
      resultsOfSearch.innerHTML = '';
      if (products.length === 0) {
        resultsOfSearch.innerHTML = '<p> No products found.</p>';
        return;
      }

      products.forEach(product => {
        searchResult.textContent = product.title;
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h4>${product.title}</h4>
          <p>${product.description}</p>
          <strong>💲${product.price}</strong>
        `;
        resultsOfSearch.appendChild(productDiv);
      });
    }
catch (error) {
    console.error("Error searching products:", error);
    
}}