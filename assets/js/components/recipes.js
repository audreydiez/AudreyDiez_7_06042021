import {sanitizeString, lightText} from "./utils";




/**
 * Parse recipe with any recipe array and get filters
 * @param   {Array.<Object>}  recipesArray
 * @returns {Array.<Object>} filters - filters for ingredients, appliances & ustensils custom select
 */
export function displayRecipes(recipesArray) {
    let parentElt = document.getElementById("recipes");

    let ingredientsArray = [];
    let appliancesArray = [];
    let ustensilsArray = [];

    recipesArray.forEach((recipe) => {
        let recipeHTML = createRecipe(recipe);
        parentElt.insertAdjacentHTML('beforeend', recipeHTML);

        addIngredients(recipe.ingredients, ingredientsArray);
        addAppliances(recipe.appliance, appliancesArray);
        addUstensils(recipe.ustensils, ustensilsArray);
    });

    return [ingredientsArray, appliancesArray, ustensilsArray];
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

    const dataRecipe = parseData(recipe);


    return `<article    class="recipe-container" 
                        data-recipeId="${recipe.id}" 
                        data-mainSearch="${dataRecipe[0]}"
                        data-ingredients="${dataRecipe[1]}"
                        data-appliance="${dataRecipe[2]}"
                        data-ustensils="${dataRecipe[3]}"
                 >
                <figure class="recipe">
                    <img src="assets/images/400x400.png" alt="${recipe.name}" class="recipe__picture">
                    <figcaption class="recipe__description">
                        <header class="header">
                            <span class="header__title pb-2">${recipe.name}</span>
                            <span class="header__time"><em class="far fa-clock"></em> ${recipe.time} min</span>
                        </header>
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
 * Add ingredients from recipe then push them in ingredientsArray
 * @param { Object } ingredients - from each recipe, push into ingredientsArray
 * @param {Array} ingredientsArray
 * @return {Array} ingredientsArray
 */
function addIngredients(ingredients, ingredientsArray){
    ingredients.forEach(ingredient => {

        const test = ingredientsArray.filter(ing => sanitizeString(ing) === sanitizeString(ingredient.ingredient));

        if (test.length <= 0) {
            ingredientsArray.push(ingredient.ingredient);
        }
    })

    return ingredientsArray;
}

/**
 * Add appliances from recipe then push them in appliancesArray
 * @param { Object } appliances - from each recipe, push into appliancesArray
 * @param {Array} appliancesArray
 * @return {Array} appliancesArray
 */
function addAppliances(appliances, appliancesArray){

    const test = appliancesArray.filter(app => sanitizeString(app) === sanitizeString(appliances));

    if (test.length <= 0) {
        appliancesArray.push(appliances);
    }

    return appliancesArray;
}

/**
 * Add ustensils from recipe then push them in ustensilsArray
 * @param { Object } ustensils - from each recipe, push into ustensilsArray
 * @param {Array} ustensilsArray
 * @return {Array} ustensilsArray
 */
function addUstensils(ustensils, ustensilsArray){
    ustensils.forEach(ustensil => {

        const test = ustensilsArray.filter(ust => sanitizeString(ust) === sanitizeString(ustensil));

        if (test.length <= 0) {
            ustensilsArray.push(ustensil);
        }

    })
    return ustensilsArray;
}


/**
 * Parse data from a recipe for sanitize and remove no needed texts
 * @param { Object } myRecipe
 * @return {Array, Array, Array, Array} - Main search, ingredients, appliance and ustensils (string arrays)
 */
function parseData(myRecipe){

    let recipeMainSearch;
    let recipeIngredientsSearch = [];
    let recipeApplianceSearch;
    let recipeUstensilsSearch = [];

    recipeMainSearch = lightText(myRecipe.name +" " + myRecipe.description);
    recipeApplianceSearch = lightText(myRecipe.appliance);

    myRecipe.ingredients.forEach(ingredient => {
        recipeIngredientsSearch.push(sanitizeString(ingredient.ingredient));
    });
    myRecipe.ustensils.forEach(ustensil => {
        recipeUstensilsSearch.push(sanitizeString(ustensil));
    });

    return [recipeMainSearch, recipeIngredientsSearch, recipeApplianceSearch, recipeUstensilsSearch]

}