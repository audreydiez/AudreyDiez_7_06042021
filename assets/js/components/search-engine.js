import {reloadSearchEngine} from "./filters";
import {displayRecipes, getRecipes, parsedRecipes} from "./recipes";
import {sanitizeString, addFilterID, removeNodes} from "./utils";
import data from "../data/data";

let recipesFiltered = [];


/**
 * Searching algorithm for main search input and custom select
 * @param { array } filtered
 */
export function searching(filtered){

    document.getElementById("no-results").classList.add("hide");


    // If filtered is empty, reset search
    if (filtered.length === 1 && filtered[0].value === null){
        let filters = displayRecipes(data.recipes);
        reloadSearchEngine(filters[0], filters[1], filters[2], data.recipes);
        return
    }

    recipesFiltered = [];
    let recipeID = [];

    // Set filters Array
    const searchFilters = splitArrays(filtered);

    // Launch algo
    // If main Input id filled
    if (searchFilters[0][0] != null){
        // get ID who matched
        recipeID = searchAlgoMainInput(searchFilters);
    }
    // If main input is null, get all ID ( if not, we can't search in tag with ID empty)
    else {
        parsedRecipes.forEach(recipe => {
            recipeID.push(recipe.id);
        })
    }

    // If filter ingredient exists
    if (searchFilters[1][0] != null){
        // get ID who matched from precedent ID array received
        recipeID = searchAlgoCustomSelect(recipeID, searchFilters[1], "ingredients");
    }

    // if filter appliance is filled
    if (searchFilters[2][0] != null){
        // get ID who matched from precedent ID array received
        recipeID = searchAlgoCustomSelect(recipeID, searchFilters[2], "appliance");
    }

    // if filter ustensils is filled
    if (searchFilters[3][0] != null){
        // get ID who matched from precedent ID array received
        recipeID = searchAlgoCustomSelect(recipeID, searchFilters[3], "ustensils");
    }

    // Build recipe Array (from recipe ID received) and display recipes
    const recipesMatched = getRecipes(recipeID);

    removeNodes("recipe-container");
    let filters = displayRecipes(recipesMatched);
    reloadSearchEngine(filters[0], filters[1], filters[2], recipesMatched);

    if (recipesMatched.length === 0) {
        document.getElementById("no-results").classList.remove("hide");
    }

}

/**
 * For main input - search if all filters are presents
 * @param { array } searchFilters - filters entered by user
 * @returns { array } recipeID - ID who matched
 */
function searchAlgoMainInput(filtersArray){

    const recipeID = [];

    Array.from(parsedRecipes).forEach(recipe => {

        let filterFoundArray = [];

        // Main search filters
        if (filtersArray[0][0] != null){
            filtersArray[0].forEach(filter => {
                let foundInRecipe = false;

                if (recipe.mainSearch.includes(filter)){
                    foundInRecipe = true;
                }
                if (recipe.ingredients.includes(filter)){
                    foundInRecipe = true;
                }
                filterFoundArray.push(foundInRecipe);
            })
        }

        if (filterFoundArray.includes(false)){
            return;
        }
        else {
            const test = recipeID.filter(id => id.toString() === recipe.id);

            if (test.length <= 0) {
                recipeID.push(recipe.id);
            }
        }

    })

    return recipeID;
}

/**
 * search in custom selects - from ID founded previously, search if all filters are presents
 * @param { array } recipeIDFound - recipe ID founded previously
 * @param { array } searchFilters - filters entered by user
 * @param { String } tagType - Type of custom select (for searching with the right key in recipes)
 * @returns { array } recipeID - ID who matched
 */
function searchAlgoCustomSelect(recipeIDFound, searchFilters, tagType){

    let recipeID = [];

    // For each existing recipes
    Array.from(parsedRecipes).forEach(recipe => {

        let filterFoundArray = [];

        // if recipeIDFound is included in parsedRecipes, search the filter( if not, don't search into it => return)
        if (recipeIDFound.includes(recipe.id.toString())){

            // For each filter, if founded, push true, else false
            searchFilters.forEach(filter => {
                let foundInRecipe = false;

                if (recipe[tagType].includes(filter)){
                    foundInRecipe = true;

                }
                else{
                    foundInRecipe = false;
                    //console.log(filter)
                }
                filterFoundArray.push(foundInRecipe);
            })
        }
        else {
            return;
        }

        // If all filters founded, push id recipe
        if (filterFoundArray.includes(false)){
            return;
        }
        else {
            recipeID.push(recipe.id.toString());
        }
    })

    return recipeID;
}


/**
 * Organize filter from search entries to practical array -
 * @param { array } filtersArray
 * @returns { array },{ array },{ array },{ array } words, ingredients, appliances, ustensils
 */
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
