/*******************************************************************************
 * Element object declarations start here.
 ******************************************************************************/

const menu = document.querySelector("menu");
const addBtn = document.querySelector(".default");

const main = document.querySelector("main");
const form = document.querySelector("form");
const closeBtn = document.querySelector(".close");

const addBtnProps = window.getComputedStyle(addBtn);

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
    button.type = "button";
    button.classList.add = "small";

    const img = document.createElement("IMG");
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
    form.style.display = "none";
    if (mediaQuery.matches) createSmallAddBtn();
});

window.addEventListener("resize", e => {
    if (mediaQuery.matches && menu.childElementCount < 2) createSmallAddBtn();
    else if (
        !mediaQuery.matches &&
        menu.childElementCount === 2 &&
        addBtnProps.getPropertyValue("display") === "flex"
    ) {
        menu.removeChild(menu.lastElementChild);
    }
});

addBtn.addEventListener("click", e => {
    form.style.display = "flex";
});

closeBtn.addEventListener("click", e => {
    form.style.display = "none";
});