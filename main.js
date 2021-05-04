import './assets/scss/style.scss'
import {displayRecipes} from "./assets/js/components/recipes";
import {setComportmentForSelects} from "./assets/js/components/customs-select";
import {launchSearchEngine} from "./assets/js/components/filters";
import {delegateEvents} from "./assets/js/components/utils";
import data from "./assets/js/data/data";


let filters = displayRecipes(data.recipes);
setComportmentForSelects();
delegateEvents();
launchSearchEngine(filters[0], filters[1], filters[2], data.recipes);


