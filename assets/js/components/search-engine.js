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

    if (filtered.length === 1 && filtered[0].value === null){
        let filters = displayRecipes(data.recipes);
        reloadSearchEngine(filters[0], filters[1], filters[2], data.recipes);

        return
    }

    recipesFiltered = [];
    console.log(filtered);
    //console.log(recipes);
    //console.log(recipesFiltered);

    data.recipes.forEach( recipe => {
        filtered.forEach(filter => {
            //console.log(filter.value)

            if (filter.type === "searchbar" || filter.type === "ingredients-filters"){
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
            }

            else if (filter.type === "appliances-filters"){
                if (normalizeString(recipe.appliance).includes(filter.value)) {
                    recipesFiltered.push(recipe);
                }

            }
            else if (filter.type === "ustensils-filters"){
                recipe.ustensils.forEach(ustensil => {
                    if (normalizeString(ustensil).includes(filter.value)) {
                        recipesFiltered.push(recipe);

                    }
                })
            }

        })
    });
    removeNodesRecipes();
    recipesFiltered = recipesFiltered.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
    console.log(recipesFiltered);
    //console.log(filtered);
    let filters = displayRecipes(recipesFiltered);
    //console.log(filters)

    reloadSearchEngine(filters[0], filters[1], filters[2], recipesFiltered);



}

export function resetSearching(){
    //console.log("reset");
}

export function normalizeString(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return string.toLowerCase();
}

