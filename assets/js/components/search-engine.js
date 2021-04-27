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

    // For each recipe, if return true, push recipe in RecipesFiltered
    data.recipes.forEach( recipe => {

        if ( searchAlgo(recipe, newFilters)
            //searchAllAvailable(recipe, newFilters)
        ){
            recipesFiltered.push(recipe);
        }

        // TODO TEST
        //console.log(searchAlgo(recipe, newFilters))

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
function searchAllAvailable (myRecipe, filtersArray){

    // Pour chaque filtre...Every test si TOUS les elements du tableau vérifie une condition
    return filtersArray.every(function(filter){

        //const filterEstDansLeNomDeLaRecette = normalizeString(myRecipe.name).includes(filter);
        const filterEstDansLeNomDeLaRecette = sanitizeString(myRecipe.name).indexOf(filter)>-1;
        const filterEstDansLaDescription = sanitizeString(myRecipe.description).indexOf(filter)>-1;
        const filterEstDansAppliance = sanitizeString(myRecipe.appliance).indexOf(filter)>-1;
        const filterEstDansIngredients = myRecipe.ingredients.filter(ingredient => sanitizeString(ingredient.ingredient).indexOf(filter) > -1).length > 0;
        const filterEstDansUstensils = myRecipe.ustensils.filter(ustensil => sanitizeString(ustensil).indexOf(filter) > -1).length > 0;

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

    let filterFoundArray = [];

    let foundInRecipe = false;
    // Pour chaque filtre, push la valeur trouvé ou non dans le tableau. A la fin si le tableau contient un seul non, retourne false

    filtersArray.forEach(filter => {

        if (    sanitizeString(myRecipe.name).includes(filter)
                || sanitizeString(myRecipe.description).includes(filter)
                || sanitizeString(myRecipe.appliance).includes(filter)
        ){

            foundInRecipe = true;

        }

        myRecipe.ingredients.forEach(ingredient => {
            if (sanitizeString(ingredient.ingredient).includes(filter)){

                foundInRecipe = true;
                }
        })

        myRecipe.ustensils.forEach(ustensil => {
            if (sanitizeString(ustensil).includes(filter)){
                foundInRecipe = true;
            }
        })
        filterFoundArray.push(foundInRecipe);
    })

    console.log(filterFoundArray)

    if (filterFoundArray.includes(false)){
        return false;
    }
    else {
        return true;
    }






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