import data from "../data/data";

export function setFilters(){

    fillSelect("ingredients-filters", getIngredients());
    fillSelect("appliances-filters", getAppliances());
    fillSelect("ustensils-filters", getUstensils());
}


/**
 * Get all ingredients for filters
 * @return  {Array}    Ingredients (unique)
 */
export function getIngredients(){
    let ingredients = [];

    data.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        })
    });
    return new Set(ingredients);
}

/**
 * Get all appliances for filters
 * @return  {Array}    appliances (unique)
 */
export function getAppliances(){
    let appliances = [];

    data.recipes.forEach( recipe => {
        recipe.appliance
        appliances.push(recipe.appliance.toLowerCase())
    });
    return new Set(appliances);
}

/**
 * Get all ustensils for filters
 * @return  {Array}    ustensils (unique)
 */
export function getUstensils(){
    let ustensils = [];

    data.recipes.forEach( recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil.toLowerCase());
        })
    });
    return new Set(ustensils);
}


function fillSelect(selectType, array){
    let parentElt =  document.getElementById(selectType);
    let childrenElt = ``;
    let numberOfElement = 0;

    if (array.length > 1){
        console.log("0")
    }

    array.forEach(elt => {
        elt = elt.charAt(0).toUpperCase() + elt.slice(1);
        if (numberOfElement <= 300 ){
            childrenElt += `<a href="#" class="filter">${elt}</a>`;
            numberOfElement++;
        }
    });

    parentElt.insertAdjacentHTML('beforeend', childrenElt);

}