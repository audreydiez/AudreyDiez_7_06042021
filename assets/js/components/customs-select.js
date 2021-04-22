const customsSelect = document.getElementsByClassName("custom-select");


const selectIngredientsInput = document.getElementById('ingredients-input');
const selectAppliancesInput = document.getElementById('appliance-input');
const selectUstensilsInput = document.getElementById('ustensils-input');


/**
 * Set event listenner for each custom select of index.html
 */
export function setComportmentForSelects (){
    Array.from(customsSelect).forEach(select => {
        select.addEventListener('click', e => {
            e.preventDefault();
            toggleSelect(select);
        })
    })
}

/**
 * Set comportment for filter container under the custom select
 * @param { Element } select - HTML node
 */
function toggleSelect(select){
    let selectType = select.getAttribute("id") + "-filters";
    let filtersContainer = document.getElementById(selectType);

    let selectInput = "custom-input " + select.getAttribute("id");
    let iconInput = "fa-chevron-" + select.getAttribute("id");

    // RESET all
    resetCSSSelect(selectType, select);
    moveSelectLeft(selectType);

    // expand / collapse filters
    if(filtersContainer.getAttribute("data-state") === "collapsed"){

        moveSelectRight(selectType);

        filtersContainer.style.display = "flex";
        filtersContainer.setAttribute("data-state", "expanded");


        Array.from(document.getElementsByClassName(selectInput)).forEach(elt => {
            elt.style.width = "200px";
        })



        document.getElementById(iconInput).style.transform = "rotate(180deg)";

        // Set responsive rules
        if (getWidth() < 992){
            select.style.minWidth ="100%";
        }
        else if (getWidth() < 1200){
            select.style.minWidth ="400px";
        }
        else {
            select.style.minWidth ="600px";
        }

    }
    else{
        // back to normal state

        filtersContainer.style.display = "none"
        filtersContainer.setAttribute("data-state", "collapsed");
        select.style.minWidth ="";

        Array.from(document.getElementsByClassName(selectInput)).forEach(elt => {
            elt.style.width = "";
        })

    }
}

/**
 *  On second click, reset the custom select to his primary position
 * @param { Element } selectTypeExpanded - Container filters expanded
 * @param { Element } select - select parent element
 */
function resetCSSSelect (selectTypeExpanded, select){

    let iconInput = "fa-chevron-" + select.getAttribute("id");
    document.getElementById(iconInput).style.transform = "rotate(0deg)";

    Array.from(customsSelect).forEach(select => {

        let selectType = select.getAttribute("id") + "-filters";


        if (selectType != selectTypeExpanded){
            document.getElementById(selectType).style.display = "none";
            document.getElementById(selectType).setAttribute("data-state", "collapsed");
            select.style.minWidth ="";

        }
    })
}

/**
 * On click, custom select expand to the right
 * @param { Element } selectTypeExpanded - HTML Node expanded
 */
function moveSelectRight(selectTypeExpanded) {

    Array.from(customsSelect).forEach(select => {

        let selectInput = "custom-input " + select.getAttribute("id") + "-input";
        let className = "custom-input " + select.getAttribute("id");


        Array.from(document.getElementsByClassName(className)).forEach(elt => {
            elt.style.width = "110px";
            }
        )




        let selectValue = select.getAttribute("value")+"-filters";

        if (getWidth() <= 992){
            if (selectTypeExpanded === "ingredients-filters"){
                document.getElementById(selectTypeExpanded).parentElement.style.zIndex = 2;
            }
            if (selectTypeExpanded === "appliances-filters"){
                document.getElementById(selectTypeExpanded).parentElement.style.zIndex = 2;
            }

        }
        else if (getWidth() < 1200 && getWidth() >992){
            if (selectTypeExpanded === "ingredients-filters"){
                customsSelect[1].style.left = "420px";
                customsSelect[2].style.left = "610px";
            }
            if (selectTypeExpanded === "appliances-filters"){
                customsSelect[1].style.left = "";
                customsSelect[2].style.left = "620px";
            }
        }
        else {
            if (selectTypeExpanded === "ingredients-filters"){
                customsSelect[1].style.left = "620px";
                customsSelect[2].style.left = "810px";
            }
            if (selectTypeExpanded === "appliances-filters"){
                customsSelect[1].style.left = "";
                customsSelect[2].style.left = "820px";
            }
        }


    })
}

/**
 * reset positionto the left if custom select was expanded
 * @param { Element } selectTypeExpanded - HTML Node expanded
 */
function moveSelectLeft(selectTypeExpanded) {


    Array.from(customsSelect).forEach(select => {

        let iconInput = "fa-chevron-" + select.getAttribute("id");
        document.getElementById(iconInput).style.transform = "rotate(0deg)";

        let selectValue = select.getAttribute("data-value")+"-filters";

        if (selectTypeExpanded === "ingredients-filters"){
            customsSelect[1].style.left = "";
            customsSelect[2].style.left = "";
            customsSelect[0].style.zIndex = "0";
            customsSelect[1].style.zIndex = "0";
        }
        if (selectTypeExpanded === "appliances-filters"){
            customsSelect[1].style.left = "";
            customsSelect[2].style.left = "";
            customsSelect[0].style.zIndex = "0";
            customsSelect[1].style.zIndex = "0";
        }
        if (selectTypeExpanded === "ustensils-filters"){
            customsSelect[1].style.left = "";
            customsSelect[2].style.left = "";
        }

    })
}


/**
 * Get screen width for responsive adaptation
 * @returns {number} - screen width in px
 */
function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}