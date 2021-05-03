import './assets/scss/style.scss'
import {displayRecipes, parseData} from "./assets/js/components/recipes";
import {setComportmentForSelects} from "./assets/js/components/customs-select";
import {launchSearchEngine} from "./assets/js/components/filters";
import {delegateEvents} from "./assets/js/components/utils";
import data from "./assets/js/data/data";


    // Display recipe affiche les recettes depuis un tableau de recettes, et renvoie les filtres tirés de ses recettes triées

    let filters = displayRecipes(data.recipes);
    setComportmentForSelects();
    delegateEvents();
    launchSearchEngine(filters[0], filters[1], filters[2], data.recipes);

    data.recipes.forEach( recipe => {
        parseData(recipe);
    });




