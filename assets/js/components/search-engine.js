import {getFiltered, reloadSearchEngine} from "./filters";
import {displayRecipes, removeNodesRecipes} from "./recipes";
import data from "../data/data";

let recipesFiltered = [];


/**
 * Searching algorithm for main search input and custom select
 */
export function searching(){
    document.getElementById("no-results").style.display = "none";

    const filtered = getFiltered();

    // If filtered is empty, reset search
    if (filtered.length === 1 && filtered[0].value === null){
        let filters = displayRecipes(data.recipes);
        reloadSearchEngine(filters[0], filters[1], filters[2], data.recipes);
        return
    }

    recipesFiltered = [];

    // Set an array of filters from filtered array
    let newFilters = [];
    filtered.forEach(filter => {
        if(filter.value != null){
            newFilters.push(filter.value);
        }
    })

    // For each recipe, if return true, push recipe in RecipesFiltered
    data.recipes.forEach( recipe => {
        if (searchAllAvailable(recipe, newFilters)){
            recipesFiltered.push(recipe);
        }

    });

    removeNodesRecipes();

    // Remove duplicate recipes
    recipesFiltered = recipesFiltered.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    // Load recipes in index.html
    let filters = displayRecipes(recipesFiltered);
    reloadSearchEngine(filters[0], filters[1], filters[2], recipesFiltered);

    if (recipesFiltered.length === 0) {
        document.getElementById("no-results").style.display = "flex";
    }



}


/**
 * Remove accents and return lowercase string
 * @param {string} string
 * @returns {string}
 */
export function normalizeString(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return string.toLowerCase();
}

/**
 * Search in object Recipe if contains all elements of the filtersArray -
 * @param { object } myRecipe
 * @param { array } filtersArray
 * @returns {boolean}
 */
function searchAllAvailable (myRecipe, filtersArray){

    return filtersArray.every(function(filter){
        //console.log(filter)
        return (
            normalizeString(myRecipe.name).indexOf(filter)>-1
            || normalizeString(myRecipe.description).indexOf(filter)>-1
            || normalizeString(myRecipe.appliance).indexOf(filter)>-1
            || myRecipe.ingredients.filter(ingredient => normalizeString(ingredient.ingredient).indexOf(filter) > -1).length > 0
            || myRecipe.ustensils.filter(ustensil => normalizeString(ustensil).indexOf(filter) > -1).length > 0
        )
    })
}
