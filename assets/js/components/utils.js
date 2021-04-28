import {createTag, removeTagNodeByID, filtered} from "./filters";
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
            if(e.target.tagName.toLowerCase() === 'a'){
                const dataTagID = e.path[0].attributes[4].nodeValue;
                const dataType = e.path[0].attributes[3].nodeValue;
                const innerTxt = e.path[0].innerText;

                createTag(innerTxt, dataType, dataTagID);
            }


        })
    });
}

/**
 * Set event listener on tag container for listening tags click
 */
function delegateTagsListener(){
    document.getElementById('tag-container').addEventListener('click', function(e){
        e.preventDefault();

        if(e.target.tagName.toLowerCase() === 'span' || e.target.tagName.toLowerCase() === 'em'){
            const dataID = e.path[1].attributes[2].nodeValue;
            const dataType = e.path[1].attributes[3].nodeValue;
            const innerTxt = e.path[1].innerText;

            removeTagNodeByID(dataID, dataType, innerTxt);
            searching(filtered);
        }

    });

}

/**
 * Remove accents and return lowercase string
 * @param {string} string
 * @returns {string}
 */
export function sanitizeString(string){
    // remove accent
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    string = string.split('.').join("");
    string = string.split(',').join("");
    return string.toLowerCase();
}

/**
 * Create an ID unique from a string and normalize it
 * @param { String } elt
 * @returns { String }
 */
export function addFilterID (elt){
    let text =sanitizeString(elt)
    return text.replace(/[^A-Z0-9]/ig, "");
}


/**
 * Remove all filters for each custom select
 */
export function removeNodes(className) {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(elt => {
        elt.remove();
    })
}

/**
 * return a lighter texts whithout duplicate, accent, dot, and unnecessary small words
 * @param { String } string
 * @returns { String } string
 */
export function lightText(string){
    string = sanitizeString(string);
    string = string.split(" ");

    string.forEach( function (word, index, array){
        //console.log(word, word.length)
        if (word.length < 3) {
            array.splice(index, 1)
        }
    });

    string = [...new Set(string)];

    return string;
}

