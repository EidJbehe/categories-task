async function getProductDetails() {

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);

    const productDetails = document.querySelector(".product-details");

    const div = document.createElement("div");
    div.classList.add("item-details");

    div.innerHTML = `
      <h2 class="product-title">${data.title}</h2>
      <img src="${data.thumbnail}" alt="${data.title}" class="product-image" style="max-width: 300px;">
      <p class="product-price"><strong>Price:</strong> $${data.price}</p>
      <p class="product-category"><strong>Category:</strong> ${data.category}</p>
      <p class="product-rating"><strong>Rating:</strong> ${data.rating}</p>
      <p class="product-description"><strong>Description:</strong> ${data.description}</p>
    `;

    productDetails.appendChild(div);

  } catch (error) {
    console.error("Error fetching product details:", error);
    document.querySelector(".product-details").innerText = "❌ Failed to load product.";
  }
}

getProductDetails();
