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

        // TODO TEST
        console.log(searchAlgo(recipe, newFilters))

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

    // Pour chaque filtre...Every test si TOUS les elements du tableau vérifie une condition
    return filtersArray.every(function(filter){

        //const filterEstDansLeNomDeLaRecette = normalizeString(myRecipe.name).includes(filter);
        const filterEstDansLeNomDeLaRecette = normalizeString(myRecipe.name).indexOf(filter)>-1;
        const filterEstDansLaDescription = normalizeString(myRecipe.description).indexOf(filter)>-1;
        const filterEstDansAppliance = normalizeString(myRecipe.appliance).indexOf(filter)>-1;
        const filterEstDansIngredients = myRecipe.ingredients.filter(ingredient => normalizeString(ingredient.ingredient).indexOf(filter) > -1).length > 0;
        const filterEstDansUstensils = myRecipe.ustensils.filter(ustensil => normalizeString(ustensil).indexOf(filter) > -1).length > 0;

        // Si au moins une des conditions ci dessus/dessous est bonne, la recette correspond au filtre demandé
        return (
            // retourne la position de l'élément dans le tableau, si - 1 il est pas dedans donc false
            filterEstDansLeNomDeLaRecette
            || filterEstDansLaDescription
            || filterEstDansAppliance
            || filterEstDansIngredients
            || filterEstDansUstensils
        )
    })
}

// NEW ALGO
function searchAlgo(myRecipe, filtersArray){

    let recipeContainsFilters = false;

    filtersArray.forEach(filter => {


        if (    normalizeString(myRecipe.name).includes(filter)
                || normalizeString(myRecipe.description).includes(filter)
                || normalizeString(myRecipe.appliance).includes(filter)
        ){

            return recipeContainsFilters = true;

        }

        myRecipe.ingredients.forEach(ingredient => {
        if (ingredient.ingredient.includes(filter)){
            return recipeContainsFilters = true;
            }
        })

        myRecipe.ustensils.forEach(ustensil => {
            if (ustensil.includes(filter)){
                return recipeContainsFilters = true;
            }
        })

    })

    return recipeContainsFilters;


}

// myRecipe.ingredients.forEach(ingredient => {
//     if (ingredient.ingredient.includes(filter)){
//         filterFound = true
//     }
// })
// LA
/*myRecipe.ustensils.forEach(ingredient => {
    if (ingredient.ingredient.includes(filter)){
        filterFound = true
    }
})*/

///return recipeContainsAllFilters = true;