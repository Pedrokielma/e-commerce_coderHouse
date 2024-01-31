
// Function to fetch products from the server
const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/products/getProducts"
    );
    const result = await response.json();
    if (result.data) {
      // If the data is available, render it
      renderAllProducts(result.data);
    } else {
      console.error("No data received from the server");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the fetchProducts function to initiate the data fetching and rendering
// fetchProducts();

let socket = io();

socket.on("products", (data) => {
  renderRealTimeProducts(data);
});

const renderRealTimeProducts = (data) => {
  const html = data
    .map((elem) => {
      return `
      <div class="product-card">
      <div class="header-card">
      <h2>${elem.title}</h2>
      <span 
      data-product-id="${elem.id}" onclick="deleteProduct(this)" class="delete-icon"><i class="trash fas fa-trash-alt"></i></span>
      </div>
        <p>${elem.description}</p>
        <p><strong>Price:</strong> $${elem.price}</p>
        <p><strong>Category:</strong> ${elem.category}</p>
      </div>
        `;
    })
    .join(" ");

  document.getElementById("real-time-products").innerHTML = html;
};

const addProduct = async (e) => {
  // Prevent the form from submitting and page reloading
  e.preventDefault();
  // Get product data from the form
  const productData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: parseInt(document.getElementById("stock").value),
    category: document.getElementById("category").value,
  };
  try {
    // Make a POST request to the server endpoint
    await fetch(
      "http://localhost:8080/api/products/addProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
  }

  return false;
};


const deleteProduct = async (element) => {
    const id = element.dataset.productId;
    try {
      const response = await fetch(`http://localhost:8080/api/products/deleteProduct/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };