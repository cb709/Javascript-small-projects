let mealId = localStorage.getItem('Id');

function showDetails (mealId) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => showFoodDetails(data))
}

function showFoodDetails(data) {
    console.log(data)
    const {meals : [
        {   
            idMeal: id,
            strMealThumb:image,
            strInstructions: instrustions,
            strCategory: category,
            strMeal: name,
            strYoutube: youtubeLink
        }
    ]
    } = data;
    
    const detailContainer  = document.getElementById('detail-container');

    detailContainer.innerHTML = `
    <div class="col-md-6 col-sm-12">
        <div class="food-image-container">
            <img src="${image}" alt="food-image" id="food-image">
        </div>
    </div>
    <div class="col-md-6 col-sm-12">
        <div class="food-details-container">
            <div class="food-name">
                <h2>${name}</h2>
                <h6>Category: ${category} </h6>
            </div>
           
            <div class="ingredients">
                <h5>Ingredients</h5>
                <ul id="ingredients">
                    <li>Ingredient - Measurement</li>
                    <li>Ingredient - Measurement</li>
                </ul>
            </div>
            <div class="process">
                <div class="accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="instrustions">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                         Instrustions
                         </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                              <p>${instrustions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="youtube">
                <a class="btn btn-success" href="${youtubeLink}">See on YouTube</a>
            </div>
        </div>
    </div>
    `
    const measurement = [];
    const ingredients = [];
    const obj = data.meals[0]
    const keys = Object.keys(obj);

    // -----------------getting ingredients-------------------
    for (const key of keys) {
        if(key.includes('strIngredient')){
            // console.log(obj[key] == '')
            if(obj[key]!= '') {
                ingredients.push(obj[key]);
            }
        }
    }

    // -------------getting measurements------------
    for (const key of keys) {
        if(key.includes('strMeasure')){
            if(obj[key]!= ' ') {
                measurement.push(obj[key]);
            }
        }
    }
    
    const ingredientsList = document.getElementById('ingredients')
    ingredientsList.innerHTML =  ` `;
    for( let i=0; i< ingredients.length; i++){
        ingredientsList.innerHTML += `
         <li>${ingredients[i]} - ${measurement[i]}</li>
        `
    }
}

showDetails(mealId)