const mealsContainer = document.getElementById('meals-container');
const searchInput = document.getElementById('foodTitle');


function loadFoods (name) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}` 
    fetch(url)
    .then( res => res.json())
    .then( json => showFoods(json))
}

const showFoods = (foods) => {
    mealsContainer.innerHTML = ' ';
    const meals = foods.meals;
    // console.log(meals[1])
    meals.forEach(meal => {
        mealsContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4 mb-4">
            <div class="card h-100  food-card" onclick='showFoodDetails(${meal.idMeal})'>
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}...</p>
                </div>
            </div>
      </div>
        `
    });
}

function showResults(event) {
    event.preventDefault();
    const searchText = searchInput.value;
    if(searchText === '') {
        alert("Enter Food Name to Search")
    }
    else {
        loadFoods(searchText)
    }

    searchInput.value = '';
    document.getElementById('main-heading').innerHTML = `Search Result for "${searchText}"`
}
// -----------set id valus to local Storage------------------
function showFoodDetails(id) {
    localStorage.clear();
    localStorage.setItem("Id", id);
    console.log(id)
    window.location.assign("foodDetails.html")
}

loadFoods('');