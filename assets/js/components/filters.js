import data from "../data/data";
import {searching, resetSearching} from "./search-engine";
import {displayRecipes, removeNodesRecipes} from "./recipes";
import {setComportmentForSelects} from "./customs-select";

let recipes = [];
let filtered = [
        {   type: "searchbar",
            id : "searchbar",
            value : null
        }
    ];

export function getFiltered(){
    return filtered;
}
export function getRecipes(){
    return recipes;
}

export function launchSearchEngine(ingredientsArray, appliancesArray, ustensilsArray, recipesArray){
    //console.log(ingredientsArray)
    removeAllFilterNodes();
    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    setMainInput();
    recipes = recipesArray;
}

export function reloadSearchEngine (ingredientsArray, appliancesArray, ustensilsArray, recipesArray){
    console.log(ingredientsArray)
    console.log(appliancesArray)
    console.log(ustensilsArray)
    console.log(recipesArray)
    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    recipes = recipesArray;
}


function fillSelect(selectType, type, array){
    let parentElt =  document.getElementById(selectType);
    let childrenElt = ``;
    //console.log(array)

    //reset


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
            removeFilterNodeByID(id);
        })

    });


}

function removeAllFilterNodes() {
    let elts = document.getElementsByClassName("filter");
    Array.from(elts).forEach(elt => {
        elt.remove();
    })
}

function removeFilterNodeByID(id){
    //console.log(id)
    document.getElementById(id).remove()

}

function setMainInput() {
    const inputSearch = document.getElementById("searchbar");
    inputSearch.addEventListener("input", e => {
    //console.log(inputSearch.value.length)
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
            removeNodesRecipes();
            let filters = displayRecipes(data.recipes);
            //setComportmentForSelects();
            //launchSearchEngine(filters[0], filters[1], filters[2], data.recipes);

            //console.log(filtered)
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

            //console.log(valuesToSearch)
            //resetSearching();
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

            //console.log(filtered)

            searching();
        }

    })
}


function addFilterID (elt){
    let test =elt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return test.replace(/[^A-Z0-9]/ig, "");
}

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
        value: elt
    });

    childrenElt.addEventListener('click', e => {
        e.preventDefault();
        removeTagNodeByID(eltID, type, childrenElt.getElementsByTagName("span")[0].innerText);
    })
    console.log(filtered)

}

function removeTagNodeByID(eltID, type, text){
    //console.log(eltID)
    let elt = document.getElementById(eltID);

    document.getElementById(eltID).remove();
    filtered = filtered.filter(function( tag ) {
        return tag.id !== eltID;
    });

    let array = [text];
    array = new Set(array);
    // Refill select custom
    fillSelect(type+"-filters",type, array);


    console.log(filtered)
}

