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
 * Variable declarations start here.
 ******************************************************************************/

const library = [];

/*******************************************************************************
 * Constructors start here.
 ******************************************************************************/

function Book(title, author, pages, hasRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
}

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

/**
 * Checks that all inputs are filled in before submitting the form.
 */
function validateForm() {
    let filled = 0;
    let index = 0;
    for (input of formInputs) {
        if (index === 3) break;
        if (input.value.length !== 0) filled++;
        index++;
    }
    if (filled === 3) form.style.display = "none";
}

/**
 * Creates a new book object and stores it into library array.
 */
function addBookToLibrary() {
    const book = new Book(
        formInputs[0].value,
        formInputs[1].value,
        formInputs[2].value,
        formInputs[3].checked
    );
    library.push(book);
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

addBtn.addEventListener("click", e => form.style.display = "flex");

closeBtn.addEventListener("click", e => form.style.display = "none");

submitBtn.addEventListener("click", e => {
    validateForm();
    addBookToLibrary();
    e.preventDefault();
});

/*******************************************************************************
 * Remaining tasks/issues left to resolve.
 ******************************************************************************/

/**
 * 1. Display book in "My Library" after new book is added.
 * 2. Implement a function that toggles a book's read status on
 *    a Book's prototype instance.
 * 3. Display delete confirmation card when delete icon is clicked and,
 *    when confirmed to delete book, remove it from "My Library."
 * 4. Update reading log when new book is added.
 * 5. Update reading log when user changes read status of a book.
 */