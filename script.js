const loadAllMeals = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => console.error("Error fetching meals:", error));
};
const displayMeals = (meals) => {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; 

  if (meals) {
    meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");
      mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory.slice(0, 12)}</p>
                <button onclick="singleMeal('${
                  meal.idMeal
                }')" id="details-btn">Details</button>
                <button onclick="handleAddToCart('${meal.strMealThumb}', '${meal.strMeal}', '${meal.strCategory}')" id="add-to-cart-btn">Add to cart</button>


            `;
      menuContainer.appendChild(mealDiv);
    });
  } else {
    menuContainer.innerHTML = "<p>No meals found.</p>";
  }
};
const searchMeals = () => {
  const searchField = document.getElementById("search");
  const searchText = searchField.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => console.error("Error fetching meals:", error));
};
const singleMeal = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => displaySingleMeal(data.meals[0]))
    .catch((error) => console.error("Error fetching single meal:", error));
};
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchMeals);
const displaySingleMeal = (meal) => {
    const singleMealContainer = document.getElementById("single-meal-container");
    const modalTitle = singleMealContainer.querySelector(".modal-title");
    const modalBody = singleMealContainer.querySelector(".modal-body");
  
    // Set modal content
    modalTitle.innerText = meal.strMeal;
    modalBody.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
      <h5>Ingredients:</h5>
      <ul>
        ${Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((key) => `<li>${meal[key]}</li>`)
          .join("")}
      </ul>
      <p>${meal.strInstructions.slice(0, 200)}</p>
    `;

    // Trigger the modal
    $('#single-meal-container').modal('show');
};

const handleAddToCart = (img, item, catagory) => {
    const cartCount = document.getElementById("count").innerText;
  
    let convertedCOunt = parseInt(cartCount);
    convertedCOunt = convertedCOunt + 1;
    document.getElementById("count").innerText = convertedCOunt;
  
    console.log(convertedCOunt);
    const container = document.getElementById("cart-main-container");
    
    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `
    <img src="${img}" alt="${item}">
      <h4 class="text-center">${item}</h4>
      <p class="text-center"><b>Catagory:</b> ${catagory}</p>
      `;
    container.appendChild(div);
    
  };


loadAllMeals();
