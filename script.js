/*******************************************************************************
 * Element object declarations start here.
 ******************************************************************************/

const menu = document.querySelector("menu");
const addBtnDefault = document.querySelector(".default");

const addBtnDefaultProps = window.getComputedStyle(addBtnDefault);
const mediaQuery = window.matchMedia("(max-width: 600px)");

/*******************************************************************************
 * Function declarations start here.
 ******************************************************************************/

/**
 * Creates a smaller "Add new book" button at the top right
 * section of the header.
 */
function createSmallAddBtn() {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const img = document.createElement("IMG");
    button.type = "button";
    button.classList.add = "small";
    img.src = "img/plus.svg";
    img.alt = "Plus icon";
    button.appendChild(img);
    li.appendChild(button);
    menu.appendChild(li);
}

/*******************************************************************************
 * Event listeners start here.
 ******************************************************************************/

window.addEventListener("pageshow", e => {
    if (mediaQuery.matches) createSmallAddBtn();
});

window.addEventListener("resize", e => {
    if (mediaQuery.matches && menu.childElementCount < 2) createSmallAddBtn();
    else if (
        !mediaQuery.matches &&
        menu.childElementCount === 2 &&
        addBtnDefaultProps.getPropertyValue("display") === "flex"
    ) {
        menu.removeChild(menu.lastElementChild);
    }
});