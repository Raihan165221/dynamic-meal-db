const searchBtn = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const errorMessage = document.getElementById("error-message");
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  if (searchText == "") {
    errorMessage.innerHTML = `
      <p>Please Search Any Meal</p>
    `;
    const mealContainer = document.getElementById("meal-container");
    const mealDetails = document.getElementById("meal-details");
    mealContainer.textContent = "";
    mealDetails.textContent = "";
  } else {
    errorMessage.textContent = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMeals(data.meals));
  }
  searchField.value = "";
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  const mealDetails = document.getElementById("meal-details");
  mealContainer.textContent = "";
  mealDetails.textContent = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadIdMeal('${meal.idMeal}')" class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 220)}</p>
      </div>
    </div>
    `;
    mealContainer.appendChild(div);
  });
};

const loadIdMeal = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (mealDetail) => {
  console.log(mealDetail);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.innerHTML = `
  <div class="card">
            <img width='50%' src="${
              mealDetail.strMealThumb
            }" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${mealDetail.strMeal}</h5>
              <p class="card-text">${mealDetail.strInstructions.slice(
                0,
                220
              )}</p>
              <a href="${
                mealDetail.strYoutube
              }" class="btn btn-primary">Youtube Video</a>
            </div>
          </div>
  `;
};
