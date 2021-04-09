import data from "./data";

const recipes = data.recipes;
const parentElt = document.getElementById("recipes");

/**
 * display all recipes
 * @param   {object}  recipes
 */
export function displayRecipes() {

    recipes.forEach((recipe) => {
        let recipeHTML = createRecipe(recipe);
        parentElt.insertAdjacentHTML('beforeend', recipeHTML);
    });
}

/**
 * Create a recipe HTML
 * @param   {object}  recipe
 * @return  {string}    HTML recipe element
 */
function createRecipe(recipe){

    let ingredients =``;
    recipe.ingredients.forEach(ingredient => {
        ingredients += `<p class="ingredient"><span>${ingredient.ingredient}:</span> ${ingredient.quantity}</p>`;
    });

    return `<article class="recipe-container">
                <figure class="recipe">
                    <img src="http://placekitten.com/600/400" alt="Une recette" class="recipe__picture">
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

