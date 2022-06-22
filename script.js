/*******************************************************************************
 * Element object declarations start here.
 ******************************************************************************/

const menu = document.querySelector("menu");
const addBtn = document.querySelector(".default");

const main = document.querySelector("main");

const form = document.querySelector("form");
const formInputs = document.querySelectorAll(".input-container input");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");

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

function validateForm() {
    let filled = 0;
    for (input of formInputs) {
        if (input.value.length !== 0) filled++;
    }
    if (filled === 3) form.style.display = "none";
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

submitBtn.addEventListener("click", validateForm());