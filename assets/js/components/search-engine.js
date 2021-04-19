import {getFiltered, getRecipes, launchSearchEngine} from "./filters";
import {displayRecipes, removeNodesRecipes, onlyUnique} from "./recipes";
import {setComportmentForSelects} from "./customs-select";
//import {init} from "/main";





export function searching(){
    //getFiltered();
    //console.log(getFiltered());
    //console.log(getRecipes());

    const filtered = getFiltered();
    const recipes = getRecipes();
    let recipesFiltered = [];

    console.log(filtered);

    filtered.forEach( filter => {
        recipes.forEach(recipe => {


            if (
                normalizeString(recipe.name).includes(filter.value)
                || normalizeString(recipe.description).includes(filter.value)
            ){
                console.log(filter.value);
                recipesFiltered.push(recipe);
            }

            recipe.ingredients.forEach(ingredient => {
                if (
                    normalizeString(ingredient.ingredient).includes(filter.value)
                ){
                    //console.log(normalizeString(ingredient.ingredient), filter.value)
                    console.log(filter.value);
                    recipesFiltered.push(recipe);

                }
            })

        });
        console.log(recipesFiltered);
        recipesFiltered = recipesFiltered.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        console.log(recipesFiltered)

    });
    //console.log(recipesFiltered)

    //console.log(recipesFiltered);

    //init(recipesFiltered);
    // afficher les recettes
// remove recettes
    removeNodesRecipes();
    let filters = displayRecipes(recipesFiltered);
    //console.log(filters)
    //setComportmentForSelects();
    launchSearchEngine(filters[0], filters[1], filters[2], recipesFiltered);

    //console.log(recipesFiltered)

}

export function resetSearching(){
    //console.log("reset");
}

function normalizeString(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return string.toLowerCase();
}

