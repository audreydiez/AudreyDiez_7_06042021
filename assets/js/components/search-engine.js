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
    //document.getElementById("no-results").style.display = "none";
    document.getElementById("no-results").classList.add("hide");

    // If filtered is empty, reset search
    if (filtered.length === 1 && filtered[0].value === null){
        let filters = displayRecipes(data.recipes);
        reloadSearchEngine(filters[0], filters[1], filters[2], data.recipes);
        return
    }

    recipesFiltered = [];

    console.log(parsedRecipes)

    // Set filters Array
    const searchFilters = splitArrays(filtered);

    // Launch algo
    const recipeID = newAlgo(searchFilters);

    // Build recipe Array and display
    const recipesMatched = getRecipes(recipeID);
    console.log(recipesMatched)

    removeNodes("recipe-container");
    let filters = displayRecipes(recipesMatched);
    reloadSearchEngine(filters[0], filters[1], filters[2], recipesMatched);


}

/**
 * Searching algorithm for main search input and custom select in all recipes and return array with matched ID
 * @param { array } filters
 * @return { array } recipes ID matched with filters
 */
function newAlgo(filtersArray){
    const recipeNodes = document.getElementsByTagName("article");
    console.log(filtersArray)

    const recipeID = [];

    //console.log(recipeNode)

    Array.from(parsedRecipes).forEach(recipe => {

        let filterFoundArray = [];

        if (filtersArray[0][0] != null){
            filtersArray[0].forEach(filter => {
                let foundInRecipe = false;

                if (recipe.mainSearch.includes(filter)){
                    foundInRecipe = true;
                    console.log(filter)
                }
                if (recipe.ingredients.includes(filter)){
                    console.log(filter)
                    foundInRecipe = true;
                }
                filterFoundArray.push(foundInRecipe);
            })
        }
        if (filtersArray[1][0] != null){
            filtersArray[1].forEach(filter => {
                let foundInRecipe = false;

                if (recipe.ingredients.includes(filter)){
                    foundInRecipe = true;
                }

                filterFoundArray.push(foundInRecipe);
            })
        }
        if (filtersArray[2][0] != null){
            filtersArray[2].forEach(filter => {
                let foundInRecipe = false;

                if (recipe.appliance.includes(filter)){
                    foundInRecipe = true;
                }
                filterFoundArray.push(foundInRecipe);
            })
        }
        if (filtersArray[3][0] != null){
            filtersArray[3].forEach(filter => {
                let foundInRecipe = false;

                if (recipe.ustensils.includes(filter)){

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
