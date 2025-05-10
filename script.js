const products = {
  "oyinchoqlar": [
    {
      name: "Yumshoq ayiqcha",
      price: "99,000 so‘m",
      image: "https://example.com/ayiqcha.jpg",
      link: "https://market.yandex.ru/product/ayiqcha"
    },
    {
      name: "LEGO to‘plami",
      price: "299,000 so‘m",
      image: "https://example.com/lego.jpg",
      link: "https://market.yandex.ru/product/lego"
    }
  ],
  "texnika": [
    {
      name: "Changyutgich",
      price: "799,000 so‘m",
      image: "https://example.com/changyutgich.jpg",
      link: "https://market.yandex.ru/product/changyutgich"
    }
  ]
};

function getCategoryFromURL() {
  const tg = window.Telegram.WebApp;
  return tg.initDataUnsafe?.start_param || 'oyinchoqlar';
}

function loadProducts() {
  const category = getCategoryFromURL();
  const listContainer = document.getElementById('product-list');
  const title = document.getElementById('category-title');
  
  if (!category || !products[category]) {
    title.innerText = "Kategoriya topilmadi";
    return;
  }

  title.innerText = category[0].toUpperCase() + category.slice(1);
  products[category].forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <a href="${item.link}" target="_blank">🛒 Xarid qilish</a>
    `;
    listContainer.appendChild(card);
  });
}

document.getElementById('back-button').addEventListener('click', () => {
  Telegram.WebApp.close();
});

loadProducts();
