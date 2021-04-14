import data from "../data/data";

const filtered = [];

export function getFilters(){
    return filtered;
}

export function setFilters(){

    fillSelect("ingredients-filters", getIngredients());
    fillSelect("appliances-filters", getAppliances());
    fillSelect("ustensils-filters", getUstensils());
    addClickEventOnFilters();
}


/**
 * Get all ingredients for filters
 * @return  {Array}    Ingredients (unique)
 */
function getIngredients(){
    let ingredients = [];

    data.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase());
        })
    });
    return new Set(ingredients);
}

/**
 * Get all appliances for filters
 * @return  {Array}    appliances (unique)
 */
function getAppliances(){
    let appliances = [];

    data.recipes.forEach( recipe => {
        recipe.appliance
        appliances.push(recipe.appliance.toLowerCase())
    });
    return new Set(appliances);
}

/**
 * Get all ustensils for filters
 * @return  {Array}    ustensils (unique)
 */
function getUstensils(){
    let ustensils = [];

    data.recipes.forEach( recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil.toLowerCase());
        })
    });
    return new Set(ustensils);
}


function fillSelect(selectType, array){
    let parentElt =  document.getElementById(selectType);
    let childrenElt = ``;

    array.forEach(elt => {

        let id = addFilterID(elt);

        elt = elt.charAt(0).toUpperCase() + elt.slice(1);

        childrenElt += `<a href="#" class="filter" id="${id}" type="${selectType}">${elt}</a>`;

    });
    parentElt.insertAdjacentHTML('beforeend', childrenElt);

}


function addClickEventOnFilters(){
    let filters = document.querySelectorAll('a[class="filter"]');

    Array.from(filters).forEach( elt => {
        //console.log(elt)
        elt.addEventListener( 'click',e => {
            e.preventDefault()
            createTag(elt.innerHTML, elt.getAttribute("type"));
        })
    })
}

function addFilterID (elt){
    let test =elt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return test.replace(/[^A-Z0-9]/ig, "");
}

function createTag(elt, eltType){
    let parentElt =  document.getElementById("tag-container");

    let childrenElt = `<div class="filter ${eltType}">
                            <span>${elt} </span>
                            <em class="far fa-times-circle"></em>
                       </div>`;
    parentElt.insertAdjacentHTML('beforeend', childrenElt);
    filtered.push({
        key : eltType,
        value: elt
    });
    console.log(filtered)
}

function removeTag(){

}