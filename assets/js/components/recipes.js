
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];


/**
 * display all recipes
 * @param   {object}  recipes
 */
export function displayRecipes(recipesArray) {
    let parentElt = document.getElementById("recipes");
    let filters;

    recipesArray.forEach((recipe) => {
        let recipeHTML = createRecipe(recipe);
        parentElt.insertAdjacentHTML('beforeend', recipeHTML);
        getIngredients(recipe.ingredients);
        getAppliances(recipe.appliance);
        getUstensils(recipe.ustensils);

    });

    ingredientsArray = new Set(ingredientsArray);
    appliancesArray = new Set(appliancesArray);
    ustensilsArray = new Set(ustensilsArray);

    return filters = [ingredientsArray, appliancesArray, ustensilsArray];
}



/**
 * Create a recipe HTML
 * @param   {object}  recipe
 * @return  {string}    HTML recipe element
 */
function createRecipe(recipe){

    let lolcat = Math.floor(Math.random() * 400) + 399;

    let ingredients =``;
    recipe.ingredients.forEach(ingredient => {
        if (ingredient.quantity){
            if (ingredient.quantity && ingredient.unit){
                ingredients += `<p class="ingredient"><span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit}</p>`;
            }
            else{
                ingredients += `<p class="ingredient"><span>${ingredient.ingredient}:</span> ${ingredient.quantity}</p>`;
            }
        }
        else {
            ingredients += `<p class="ingredient"><span>${ingredient.ingredient}</p>`;
        }
    });

    return `<article class="recipe-container">
                <figure class="recipe">
                    <img src="http://placekitten.com/${lolcat}/400" alt="${recipe.name}" class="recipe__picture">
                    <figcaption class="recipe__description">
                        <div class="header">
                            <span class="header__title pb-2">${recipe.name}</span>
                            <span class="header__time"><em class="far fa-clock"></em> ${recipe.time} min</span>
                        </div>
                        <div class="description">
                            <div class="description__ingredients pb-3">
                                ${ingredients}
                            </div>
                            <div class="description__excerpt">                               
                                <p>${recipe.description}</p>
                            </div>                                          
                        </div>
                    </figcaption>
                </figure>
            </article>`;
}


function getIngredients(ingredients){
    ingredients.forEach(ingredient => {
        ingredientsArray.push(ingredient.ingredient);
    })
}

function getAppliances(appliances){
    //console.log(appliancesArray)
        appliancesArray.push(appliances);
}

function getUstensils(ustensils){
    ustensils.forEach(ustensil => {
        ustensilsArray.push(ustensil);
    })
}

export function getFilters(){

}