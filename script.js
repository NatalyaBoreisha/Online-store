const items = [
  {
    title: "Блюдо круглое новогоднее",
    description: "Отлично дополнит декор на Вашем новогоднем столе!",
    tags: ["sale"],
    price: 20,
    img: "./img/1.jpg",
    rating: 4,
  },
  {
    title: "Блюдо прямоугольное новогоднее",
    description: "Дополнит рожденствинский декор стола на 10000%.",
    tags: ["sale"],
    price: 20,
    img: "./img/2.jpg",
    rating: 4.1,
  },
  {
    title: "Набор посуды ручной работы",
    description: "Керамическая посуда ручной работы с рисунками деревьев и яркой зелёно-синей глазурью.",
    tags: [""],
    price: 145,
    img: "./img/3.jpg",
    rating: 3.5,
  },
  {
    title: "Набор посуды для юной принцессы",
    description: "Набор посуды с милым дизайном и нежными розовыми акцентами для маленьких принцесс.",
    tags: [""],
    price: 35,
    img: "./img/4.jpg",
    rating: 4,
  },
  {
    title: "Набор посуды для мальчиков",
    description: "Набор посуды с ярким дизайном гоночных машин для юных любителей скорости.",
    tags: [""],
    price: 35,
    img: "./img/5.jpg",
    rating: 5,
  },
  {
    title: "Набор для чайной церемонии",
    description: "Чайный набор в восточном стиле с изысканным дизайном дракона, воплощающий традиции и изящество.",
    tags: [""],
    price: 270,
    img: "./img/6.jpg",
    rating: 5,
  },
  {
    title: "Набор для чайной церемонии",
    description: "Элегантный чайный набор с глазурью в глубоких синих тонах, подчеркивающий стиль и изысканность чайной церемонии.",
    tags: [""],
    price: 250,
    img: "./img/7.jpg",
    rating: 4.4,
  },
  {
    title: "Набор посуды",
    description: "Нежный набор посуды в пастельно-розовом цвете с изящным рельефным узором для стильной сервировки.",
    tags: ["sale"],
    price: 28,
    img: "./img/8.jpg",
    rating: 4,
  },
  {
    title: "Набор посуды",
    description: "Набор посуды в мягких бирюзовых тонах, идеально подходящий для уютной и стильной сервировки.",
    tags: [""],
    price: 120,
    img: "./img/9.jpg",
    rating: 4,
  },
  {
    title: "Набор посуды",
    description: "Ремесленный набор посуды в глубоких синих оттенках с ручной глазурью, отражающий стиль и природную текстуру.",
    tags: [""],
    price: 126,
    img: "./img/10.jpg",
    rating: 1,
  },
  {
    title: "Набор посуды из фарфора",
    description: "Классический фарфоровый набор с изысканным синим орнаментом и винтажными мотивами для утончённой сервировки стола.",
    tags: [""],
    price: 400,
    img: "./img/11.jpg",
    rating: 2,
  },
  {
    title: "Набор для чайной церемонии",
    description: "Элегантный чайный набор из тёмной керамики с утончённым дизайном, идеально подходящий для традиционной чайной церемонии.",
    tags: [""],
    price: 520,
    img: "./img/12.jpg",
    rating: 5,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  itemsContainer.innerHTML = "";
  if (arr.length === 0) {
    nothingFound.style.display = "block";
    return;
  }
  nothingFound.style.display = "none";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");
  tags.forEach((tag) => {
    if (tag) {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    }
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

const saleCheckbox = document.createElement("input");
saleCheckbox.type = "checkbox";
saleCheckbox.id = "sale-checkbox";
saleCheckbox.style.marginLeft = "10px";
const saleLabel = document.createElement("label");
saleLabel.htmlFor = "sale-checkbox";
saleLabel.textContent = "SALE";
document.querySelector(".filters-sort").append(saleCheckbox, saleLabel);

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  if (saleCheckbox.checked) {
    currentState = currentState.filter((item) => item.tags.includes("sale"));
  }
  renderItems(currentState);
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);
saleCheckbox.addEventListener("change", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive":
      currentState.sort((a, b) => b.price - a.price);
      break;
    case "cheap":
      currentState.sort((a, b) => a.price - b.price);
      break;
    case "rating":
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    case "alphabet":
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
  }
  renderItems(currentState);
});

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));