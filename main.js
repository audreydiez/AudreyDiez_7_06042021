import './assets/scss/style.scss'
import {displayRecipes} from "./assets/js/components/recipes";
import {setComportmentForSelects} from "./assets/js/components/customs-select";
import {getFilters, setFilters} from "./assets/js/components/filters";

displayRecipes();
setComportmentForSelects();
setFilters();


console.log(getFilters());
