
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];


/**
 * Parse recipe with any recipe array and get filters
 * @param   {Array.<Object>}  recipesArray
 * @returns {Array.<Object>} filters - filters for ingredients, appliances & ustensils custom select
 */
export function displayRecipes(recipesArray) {
    let parentElt = document.getElementById("recipes");
    let filters;

    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];

    recipesArray.forEach((recipe) => {
        let recipeHTML = createRecipe(recipe);
        parentElt.insertAdjacentHTML('beforeend', recipeHTML);

        getIngredients(recipe.ingredients);
        getAppliances(recipe.appliance);
        getUstensils(recipe.ustensils);
    });



    ingredientsArray = ingredientsArray.filter(onlyUnique);
    appliancesArray = appliancesArray.filter(onlyUnique);
    ustensilsArray = ustensilsArray.filter(onlyUnique);

    return filters = [ingredientsArray, appliancesArray, ustensilsArray];
}

/**
 * Create a recipe in HTML and inject it in index.html
 * @param   {object}  recipe
 * @return  {string}  HTML recipe element
 */
function createRecipe(recipe){

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

    return `<article class="recipe-container" id-recipe="${recipe.id}">
                <figure class="recipe">
                    <img src="assets/images/400x400.png" alt="${recipe.name}" class="recipe__picture">
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
                                                        <p>${recipe.appliance}</p> 
                                                        <p>${recipe.ustensils}</p>
                                <p>${recipe.description}</p>
                            </div>                                          
                        </div>
                    </figcaption>
                </figure>
            </article>`;
}

/**
 * Remove all recipes in HTML
 */
export function removeNodesRecipes (){
    let elt = document.getElementsByClassName("recipe-container");
    Array.from(elt).forEach(node => {
        node.remove();
    })
}

/**
 * Get ingredients from recipe and push them in ingredientsArray
 * @param { Object } ingredients - from each recipe, push into ingredientsArray
 */
function getIngredients(ingredients){
    ingredients.forEach(ingredient => {
        ingredientsArray.push(ingredient.ingredient);
    })
}

/**
 * Get appliances from recipe and push them in appliancesArray
 * @param { Object } appliances - from each recipe, push into appliancesArray
 */
function getAppliances(appliances){
    appliancesArray.push(appliances);
}

/**
 * Get ustensils from recipe and push them in ustensilsArray
 * @param { Object } ustensils - from each recipe, push into ustensilsArray
 */
function getUstensils(ustensils){
    ustensils.forEach(ustensil => {
        ustensilsArray.push(ustensil);
    })
}

/**
 * Get ustensils from recipe and push them in ustensilsArray
 * @param { Object } ustensils - from each recipe, push into ustensilsArray
 */
export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}