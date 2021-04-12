const customsSelect = document.getElementsByClassName("custom-select");


const selectIngredientsInput = document.getElementById('ingredients-input');
const selectAppliancesInput = document.getElementById('appliance-input');
const selectUstensilsInput = document.getElementById('ustensils-input');



 /* Set comportment for customs select
 * @param   {}
 * @return  {}
 */
export function setComportment (){
    Array.from(customsSelect).forEach(select => {
        select.addEventListener('click', e => {
            e.preventDefault();
            toggleSelect(select);
        })
    })


}
/* toggle filter under select
* @param   {}
* @return  {}
*/
function toggleSelect(select){
    let selectType = select.getAttribute("value") + "-filters";
    let filtersContainer = document.getElementById(selectType);


    // RESET all
    resetCSSSelect(selectType);
    moveSelectLeft(selectType);

    // expand / collapse filters
    if(filtersContainer.getAttribute("state") === "collapsed"){

        moveSelectRight(selectType);

        filtersContainer.style.display = "flex"
        filtersContainer.setAttribute("state", "expanded");


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
        filtersContainer.setAttribute("state", "collapsed");
        select.style.minWidth ="";

    }
}

function resetCSSSelect (selectTypeExpanded){
    Array.from(customsSelect).forEach(select => {

        let selectType = select.getAttribute("value") + "-filters";

        if (selectType != selectTypeExpanded){
            document.getElementById(selectType).style.display = "none";
            document.getElementById(selectType).setAttribute("state", "collapsed");
            select.style.minWidth ="";
        }
    })
}

function moveSelectRight(selectTypeExpanded) {

    Array.from(customsSelect).forEach(select => {

        let selectValue = select.getAttribute("value")+"-filters";

        if (getWidth() <= 992){
            if (selectTypeExpanded === "ingredients-filters"){
                document.getElementById(selectTypeExpanded).parentElement.style.zIndex = "2"
            }
            if (selectTypeExpanded === "appliances-filters"){
                document.getElementById(selectTypeExpanded).parentElement.style.zIndex = "2"
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

function moveSelectLeft(selectTypeExpanded) {


    Array.from(customsSelect).forEach(select => {

        let selectValue = select.getAttribute("value")+"-filters";

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


function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}