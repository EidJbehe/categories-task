async function getCategories() {
    try{
      
  const {data} = await axios.get("https://dummyjson.com/products/category-list");
   const categoryList = document.querySelector(".all-categories-list");

  data.map((category) => {
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
};
getCategories();