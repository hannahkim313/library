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
function makeButtonSmall() {
    addBtn.textContent = "+";
    addBtn.style.padding = "8px 16px";
}

/*******************************************************************************
 * Event listeners start here.
 ******************************************************************************/

window.addEventListener("pageshow", e => {
    form.style.display = "none";
    if (mediaQuery.matches) makeButtonSmall();
});

window.addEventListener("resize", e => {
    if (mediaQuery.matches) makeButtonSmall();
    else addBtn.textContent = "+ Add new book";
});

addBtn.addEventListener("click", e => {
    form.style.display = "flex";
});

closeBtn.addEventListener("click", e => {
    form.style.display = "none";
});