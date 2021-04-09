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
    console.log(select)

    if(filtersContainer.getAttribute("state") === "collapsed"){
        filtersContainer.style.display = "flex"
        filtersContainer.setAttribute("state", "expanded");


        if (getWidth() < 992){
            select.style.maxWidth ="100%";
        }
        else if (getWidth() < 1200){
            select.style.maxWidth ="400px";
        }
        else {
            select.style.maxWidth ="600px";
        }


        /*if(filtersContainer.childElementCount < 3){
            select.style.maxWidth ="600px";
            Array.from(document.getElementsByClassName("filter")).forEach(filter => {
                filter.style.flexBasis = "50%";
            })

        }
        else if(filtersContainer.childElementCount < 2){
            select.style.maxWidth ="600px";
            Array.from(document.getElementsByClassName("filter")).forEach(filter => {
                filter.style.flexBasis = "100%";
            })

        }
        else if(filtersContainer.childElementCount >= 3){
            select.style.maxWidth ="600px";
            Array.from(document.getElementsByClassName("filter")).forEach(filter => {
                filter.style.flexBasis = "33.33333%";
            })

        }
*/
    }
    else{
        filtersContainer.style.display = "none"
        filtersContainer.setAttribute("state", "collapsed");
        select.style.maxWidth ="";
    }

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