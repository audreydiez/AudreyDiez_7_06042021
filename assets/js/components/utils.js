import {createTag, removeTagNodeByID} from "./filters";
import {searching} from "./search-engine";

export function delegateEvents(){
    delegateFiltersListener();
    delegateTagsListener();
}


/**
 * Set event listener on filter container for listening filters click
 */
function delegateFiltersListener(){
    const container = document.getElementsByClassName("filters-collapsed");
    Array.from(container).forEach(elt => {

        const nodeContainer = document.getElementById(elt.getAttribute("id"));
        nodeContainer.addEventListener("click", function (e){
            e.preventDefault();

            const dataTagID = e.path[0].attributes[4].nodeValue;
            const dataType = e.path[0].attributes[3].nodeValue;
            const innerTxt = e.path[0].innerText;

            createTag(innerTxt, dataType, dataTagID);
        })
    });
}

/**
 * Set event listener on tag container for listening tags click
 */
function delegateTagsListener(){
    document.getElementById('tag-container').addEventListener('click', function(e){
        e.preventDefault();

        const dataID = e.path[1].attributes[2].nodeValue;
        const dataType = e.path[1].attributes[3].nodeValue;
        const innerTxt = e.path[1].innerText;

        removeTagNodeByID(dataID, dataType, innerTxt);
        searching();
    });

}