const main = document.getElementById("main-content");
const homeBtn = document.getElementById("homeBtn");
const categoriesBtn = document.getElementById("categoriesBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const searchInput = document.getElementById("searchInput");

const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

let favorites = [];

function renderProducts(filter = "") {
  main.innerHTML = "";
  const filtered = products.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" />
      <div class="title">${product.title}</div>
      <div class="price">${product.price}</div>
    `;
    card.onclick = () => openProductModal(product);
    main.appendChild(card);
  });
}

function renderCategories() {
  const cats = [...new Set(products.map(p => p.category))];
  main.innerHTML = "";
  cats.forEach(cat => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="title">${cat}</div>`;
    div.onclick = () => renderProductsByCategory(cat);
    main.appendChild(div);
  });
}

function renderProductsByCategory(category) {
  const filtered = products.filter(p => p.category === category);
  main.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" />
      <div class="title">${product.title}</div>
      <div class="price">${product.price}</div>
    `;
    card.onclick = () => openProductModal(product);
    main.appendChild(card);
  });
}

function renderFavorites() {
  const liked = products.filter(p => favorites.includes(p.id));
  main.innerHTML = "";
  if (liked.length === 0) {
    main.innerHTML = "<p style='text-align:center;padding:20px;'>Sevimlilarda mahsulot yo‘q</p>";
    return;
  }
  liked.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" />
      <div class="title">${product.title}</div>
      <div class="price">${product.price}</div>
    `;
    card.onclick = () => openProductModal(product);
    main.appendChild(card);
  });
}

function openProductModal(product) {
  modalContent.innerHTML = `
    <img src="${product.image}" style="width:100%;border-radius:10px;" />
    <h2>${product.title}</h2>
    <p>${product.price}</p>
    <button onclick="toggleFavorite(${product.id})">
      ${favorites.includes(product.id) ? "❤️ Yoqdi" : "🤍 Yoqtirish"}
    </button>
  `;
  productModal.classList.remove("hidden");
}

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  productModal.classList.add("hidden");
  renderFavorites();
}

closeModal.onclick = () => {
  productModal.classList.add("hidden");
};

// Eventlar
homeBtn.onclick = () => {
  setActive(homeBtn);
  renderProducts();
};
categoriesBtn.onclick = () => {
  setActive(categoriesBtn);
  renderCategories();
};
favoritesBtn.onclick = () => {
  setActive(favoritesBtn);
  renderFavorites();
};
searchInput.oninput = (e) => {
  renderProducts(e.target.value);
};

function setActive(button) {
  [homeBtn, categoriesBtn, favoritesBtn].forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

renderProducts(); // boshlanishida asosiy sahifa
