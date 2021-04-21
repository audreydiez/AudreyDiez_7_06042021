import data from "../data/data";
import {searching, normalizeString} from "./search-engine";
import {displayRecipes, removeNodesRecipes} from "./recipes";
import {setComportmentForSelects} from "./customs-select";

let recipes = [];
let filtered = [
        {   type: "searchbar",
            id : "searchbar",
            value : null
        }
    ];

/**
 * Getter for filter pushed into Filtered array (filters entered by user)
 * @returns {[{id: string, type: string, value: null}]} filtered - Array of filters
 */
export function getFiltered(){
    return filtered;
}

/**
 * Set up the search engine for first launch, reset the filters of selects, fill selects and set comportement for input search
 * @param {Array} ingredientsArray
 * @param {Array} appliancesArray
 * @param {Array} ustensilsArray
 * @param {Array.<Object>} recipesArray
 */
export function launchSearchEngine(ingredientsArray, appliancesArray, ustensilsArray, recipesArray){
    removeAllFilterNodes();
    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    setMainInput();
    recipes = recipesArray;
}
/**
 * Reload the search when user add an entrie, reset the filters of selects, fill selects
 * @param {Array} ingredientsArray
 * @param {Array} appliancesArray
 * @param {Array} ustensilsArray
 * @param {Array.<Object>} recipesArray
 */
export function reloadSearchEngine (ingredientsArray, appliancesArray, ustensilsArray, recipesArray){
    removeAllFilterNodes();
    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    recipes = recipesArray;

}


/**
 * Fill the custom select with appropriate filters
 * @param { String } selectType - type of select
 * @param { String } type - type of select for create ID unique
 * @param { array }  filters array
 */
function fillSelect(selectType, type, array){
    let parentElt =  document.getElementById(selectType);
    let childrenElt = ``;

    array.forEach(elt => {

        let id = addFilterID(elt)+"-"+selectType;
        let idTag = addFilterID(elt)+"-"+type;

        elt = elt.charAt(0).toUpperCase() + elt.slice(1);

        let childElt = document.createElement("a");
        childElt.setAttribute("href", "#");
        childElt.classList.add("filter");

        childElt.setAttribute("id", id);
        childElt.setAttribute("type", selectType);
        childElt.innerHTML =elt;

        parentElt.appendChild(childElt);
        childElt.addEventListener('click', e => {
            e.preventDefault();
            createTag(childElt.innerHTML, childElt.getAttribute("type"), idTag);
            removeFilterNodeByID(idTag);
        })

    });


}

/**
 * Remove all filters for each custom select
 */
function removeAllFilterNodes() {
    let elts = document.getElementsByClassName("filter");
    Array.from(elts).forEach(elt => {
        elt.remove();
    })
}

/**
 * Remove filter (from custom select) by his ID
 * @param id
 */
function removeFilterNodeByID(id){
    let elt = id +"-filters";
    document.getElementById(elt).remove();
}


/**
 * Set up the main input search
 */
function setMainInput() {
    const inputSearch = document.getElementById("searchbar");
    inputSearch.addEventListener("input", e => {

        if (inputSearch.value.length < 3) {
            // Reset array
            filtered = filtered.filter(function( value ) {
                return value.id !== "searchbar";
            });

            filtered.unshift({
                type: "searchbar",
                id : "searchbar",
                value : null
            })
            // RE - init recipes
            reloadRecipes();

        }
        if (inputSearch.value.length > 2) {

            let valuesInput = inputSearch.value.split(" ");
            let valuesToSearch =[];

            valuesInput.forEach(value => {
                 if (value.length > 2) {
                     value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                     if (/\s/.test(value) || value === "") {
                     }
                     else{
                         valuesToSearch.push(value.toLowerCase());
                     }
                 }
            })

            filtered = filtered.filter(function( value ) {
                return value.id !== "searchbar";
            });

            valuesToSearch.forEach( value => {
                filtered.unshift({
                    type: "searchbar",
                    id : "searchbar",
                    value : value
                })
            })
            searching();
        }
    })
}

/**
 * Create an ID unique from a string and normalize it
 * @param { String } elt
 * @returns { String }
 */
function addFilterID (elt){
    let test =elt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return test.replace(/[^A-Z0-9]/ig, "");
}

/**
 * Create a tag HTML element when user select a filter, display it under main search input, and remove it from custom select
 * @param { String } elt
 * @param { String } eltType
 * @param { String } eltID
 */
function createTag(elt, eltType, eltID){
    let parentElt =  document.getElementById("tag-container");
    let type = eltType.substr(0, eltType.lastIndexOf("-"));

    let childrenElt = document.createElement("a");
    childrenElt.setAttribute("href", "#");
    childrenElt.classList.add("tag");
    childrenElt.classList.add(eltType);
    childrenElt.setAttribute("id", eltID);
    childrenElt.setAttribute("type", type);
    childrenElt.innerHTML =`<span>${elt}</span> 
                             <em class="far fa-times-circle"></em>
                            `;

    parentElt.appendChild(childrenElt);

    filtered.push({
        type : eltType,
        id : eltID,
        value: normalizeString(elt)
    });

    childrenElt.addEventListener('click', e => {
        e.preventDefault();
        removeTagNodeByID(eltID, type, childrenElt.getElementsByTagName("span")[0].innerText);
        searching();

    });

    searching();

}

/**
 * Remove HTML tag and re-push it in custom select
 * @param eltID
 * @param type
 * @param text
 */
function removeTagNodeByID(eltID, type, text){

    let elt = document.getElementById(eltID);

    document.getElementById(eltID).remove();
    filtered = filtered.filter(function( tag ) {
        return tag.id !== eltID;
    });

    let array = [text];
    array = new Set(array);
    // Refill select custom
    fillSelect(type+"-filters",type, array);

}


/**
 * Remove all recipes reload recipes from origin
 */
function reloadRecipes(){
    removeNodesRecipes();
    let filters = displayRecipes(data.recipes);
    reloadSearchEngine(filters[0], filters[1], filters[2], data.recipes);
}