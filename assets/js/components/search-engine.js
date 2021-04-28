import {reloadSearchEngine} from "./filters";
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

    console.log(filtered)

    // NEW FONCTION;
    const searchFilters = splitArrays(filtered);
    console.log(searchFilters)

    // ALGO 1
    data.recipes.forEach( recipe => {

        if ( searchAlgo(recipe, searchFilters)
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

function splitArrays(filtersArray){
    const words = [];
    const ingredients = [];
    const appliances = [];
    const ustensils = [];


    filtersArray.forEach(filter => {
        switch (filter.type) {
            case 'searchbar':
                words.push(filter.value);
                break;
            case 'ingredients':
                ingredients.push(filter.value);
                break;
            case 'ustensils':
                ustensils.push(filter.value);
                break;
            case 'appliances':
                appliances.push(filter.value);
                break;
            default:
                return;
        }
    })
    return [words, ingredients, appliances, ustensils];

}



/**
 * Search in object Recipe if contains all elements of the filtersArray -
 * @param { object } myRecipe
 * @param { array } filtersArray
 * @returns {boolean}
 */
function searchAlgo(myRecipe, filtersArray){

    let filterFoundArray = [];

    // Check main input
    if (filtersArray[0][0] != null){
        filtersArray[0].forEach(filter => {

            let foundInRecipe = false;

            if ( sanitizeString(myRecipe.name).indexOf(filter) > -1
                || sanitizeString(myRecipe.description).indexOf(filter) > -1
            ){

                foundInRecipe = true;
            }

            myRecipe.ingredients.forEach(ingredient => {
                if (sanitizeString(ingredient.ingredient).indexOf(filter) > -1){

                    foundInRecipe = true;

                }
            })

            filterFoundArray.push(foundInRecipe);
        })

    }

    // Check ingredients
    if (filtersArray[1][0] != null){
        filtersArray[1].forEach(filter => {

            let foundInRecipe = false;

            myRecipe.ingredients.forEach(ingredient => {
                if (sanitizeString(ingredient.ingredient).indexOf(filter) > -1){

                    foundInRecipe = true;

                }
            })

            filterFoundArray.push(foundInRecipe);
        })
    }

    // Check appliances
    if (filtersArray[2][0] != null){
        filtersArray[2].forEach(filter => {

            let foundInRecipe = false;

            if ( sanitizeString(myRecipe.appliance).indexOf(filter) > -1
            ){

                foundInRecipe = true;

            }
            filterFoundArray.push(foundInRecipe);
        })
    }

    // Check ustensils
    if (filtersArray[3][0] != null){
        filtersArray[3].forEach(filter => {

            let foundInRecipe = false;

            myRecipe.ustensils.forEach(ustensil => {
                if (sanitizeString(ustensil).indexOf(filter) > -1){

                    foundInRecipe = true;

                }
            })
            filterFoundArray.push(foundInRecipe);
        })
    }


    if (filterFoundArray.includes(false)){
        return false;
    }
    else {

        return true;
    }

}

