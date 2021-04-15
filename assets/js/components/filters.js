import data from "../data/data";
import {searching, resetSearching} from "./search-engine";

let filtered = [
        {   type: "searchbar",
            id : "searchbar",
            value : null
        }
    ];

export function getFiltered(){
    return filtered;
}

export function launchSearchEngine(ingredientsArray, appliancesArray, ustensilsArray){

    fillSelect("ingredients-filters", "ingredients", ingredientsArray);
    fillSelect("appliances-filters", "appliances", appliancesArray);
    fillSelect("ustensils-filters","ustensils", ustensilsArray);
    setMainInput();
}


function fillSelect(selectType, type, array){
    let parentElt =  document.getElementById(selectType);
    let childrenElt = ``;
    //console.log(array)
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

function removeFilterNodeByID(id){
    //console.log(id)
    document.getElementById(id).remove()

}

function setMainInput() {
    const inputSearch = document.getElementById("searchbar");
    inputSearch.addEventListener("input", e => {
        if (inputSearch.value.length === 0) {
            filtered[0] ={
                type: "searchbar",
                id : "searchbar",
                value : null
            };
            resetSearching();
        }
        if (inputSearch.value.length > 2) {
            filtered[0] ={
                type: "searchbar",
                id : "searchbar",
                value : inputSearch.value
            };
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

