import {getFiltered, getRecipes, reloadSearchEngine} from "./filters";
import {displayRecipes, removeNodesRecipes, onlyUnique} from "./recipes";
import data from "../data/data";
import {setComportmentForSelects} from "./customs-select";
//import {init} from "/main";


let recipesFiltered = [];


export function searching(){
    //getFiltered();
    //console.log(getFiltered());
    //console.log(getRecipes());

    const filtered = getFiltered();    

    recipesFiltered = [];
    //console.log(filtered);
    //console.log(recipes);
    //console.log(recipesFiltered);

    data.recipes.forEach( recipe => {
        filtered.forEach(filter => {


            if (normalizeString(recipe.name).includes(filter.value)) {
                recipesFiltered.push(recipe);
                
            }
            if (normalizeString(recipe.description).includes(filter.value)) {
                recipesFiltered.push(recipe);

            }
            recipe.ingredients.forEach(ingredient => {
                if (normalizeString(ingredient.ingredient).includes(filter.value)) {
                    recipesFiltered.push(recipe);

                }
            })

        })
    });
    removeNodesRecipes();
    recipesFiltered = recipesFiltered.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
    //console.log(recipesFiltered);
    //console.log(filtered);
    let filters = displayRecipes(recipesFiltered);
    //console.log(filters)

    reloadSearchEngine(filters[0], filters[1], filters[2], recipesFiltered);



}

export function resetSearching(){
    //console.log("reset");
}

function normalizeString(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return string.toLowerCase();
}

