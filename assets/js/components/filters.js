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

    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    setMainInput();

    recipes = recipesArray;
    setCustomSelectInput();
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


    // remove filter already put in tag
    let tagsElements = document.getElementsByClassName("tag");
    //console.log(tagsElements)
    Array.from(tagsElements).forEach(elt => {
        let id = elt.getAttribute("id")+"-filters";
        let filterToRemove = document.getElementById(id);

        if (filterToRemove != null){
            filterToRemove.remove();
        }

    })

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


        let filter = `<a href="#" class="filter" id="${id}" data-type="${selectType}" data-tagID="${idTag}">
                    ${elt}
                   </a>`;

        parentElt.insertAdjacentHTML('beforeend', filter);

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
            let tagsElements = document.getElementsByClassName("tag");

            // If a tag exists, don't init recipe
            if (tagsElements != null){
                searching();
            }
            else {
                reloadRecipes();
            }
            return;
        }

        // If > 2
            let valuesInput = inputSearch.value.split(" ");
            let valuesToSearch =[];

            valuesInput.forEach(value => {
                 if (value.length > 2) {
                     // A voir
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

    })
}

/**
 * Set up the custom select input search
 */
function setCustomSelectInput(){
    const customInput = document.getElementsByClassName("custom-input");

    Array.from(customInput).forEach( input => {
        input.addEventListener("input", e => {
            const typeOfInput = input.className.substring(input.className.indexOf(" ") + 1) + "-filters";
            let container = document.getElementById(typeOfInput);
            let filters = container.querySelectorAll("a");


            filters.forEach(filter => {
                filter.style.display = "none";
                if (normalizeString(filter.innerText).includes(normalizeString(input.value))){
                    filter.style.display = "flex";
                }
            })

        });
    });


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
export function createTag(elt, eltType, eltID){
    let parentElt =  document.getElementById("tag-container");
    let dataType = eltType.substr(0, eltType.lastIndexOf("-"));


    let tag = `<a href="#" class="tag ${eltType}" id="${eltID}" data-type="${dataType}">
                    <span>${elt}</span><em class="far fa-times-circle"></em>
               </a>`;

    parentElt.insertAdjacentHTML('beforeend', tag);

    filtered.push({
        type : dataType,
        id : eltID,
        value: normalizeString(elt)
    });

    searching();
}

/**
 * Remove HTML tag and re-push it in custom select
 * @param eltID
 * @param type
 * @param text
 */
export function removeTagNodeByID(eltID, type, text){

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