import {getFiltered, reloadSearchEngine} from "./filters";
import {displayRecipes} from "./recipes";
import {sanitizeString, addFilterID, removeNodes} from "./utils";
import data from "../data/data";

let recipesFiltered = [];


/**
 * Searching algorithm for main search input and custom select
 * @param { array } filtered
 */
export function searching(filtered){
    //document.getElementById("no-results").style.display = "none";
    document.getElementById("no-results").classList.add("hide");

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


    // ALGO 1
    data.recipes.forEach( recipe => {

        if ( searchAlgo(recipe, newFilters)
        ){

            recipesFiltered.push(recipe);
        }

    });

    removeNodes("recipe-container");

    // Remove duplicate recipes
    recipesFiltered = recipesFiltered.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    // Load recipes in index.html
    let filters = displayRecipes(recipesFiltered);
    reloadSearchEngine(filters[0], filters[1], filters[2], recipesFiltered);

    if (recipesFiltered.length === 0) {
        //document.getElementById("no-results").style.display = "flex";
        document.getElementById("no-results").classList.remove("hide");
    }

}



/**
 * Search in object Recipe if contains all elements of the filtersArray -
 * @param { object } myRecipe
 * @param { array } filtersArray
 * @returns {boolean}
 */
function searchAlgo(myRecipe, filtersArray){

    let filterFoundArray = [];



    filtersArray.forEach(filter => {
        let foundInRecipe = "no";

        if (    sanitizeString(myRecipe.name).includes(filter)
                || sanitizeString(myRecipe.description).includes(filter)
                || sanitizeString(myRecipe.appliance).includes(filter)
        ){

            foundInRecipe = "yes";

        }

        myRecipe.ingredients.forEach(ingredient => {
            if (sanitizeString(ingredient.ingredient).includes(filter)){
                foundInRecipe = "yes";
                }
        })

        myRecipe.ustensils.forEach(ustensil => {
            if (sanitizeString(ustensil).includes(filter)){
                foundInRecipe = "yes";

            }
        })

        filterFoundArray.push(foundInRecipe);
    })



    if (filterFoundArray.includes("no")){
        return false;
    }
    else {

        return true;
    }

}

