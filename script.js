/*******************************************************************************
 * Element object declarations start here.
 ******************************************************************************/

const menu = document.querySelector("menu");
const addBtn = document.querySelector(".default");

const main = document.querySelector("main");

const booksContainer = document.querySelector(".books-container");

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
 * @returns {Boolean} True if all text inputs are filled.
 */
function validateForm() {
    let filled = 0;
    for (input of formInputs) {
        if (input.id === "read_status") break;
        if (input.value.length !== 0) filled++;
    }
    if (filled === 3) form.style.display = "none";
    return filled === 3 ? true : false;
}

/**
 * Clear input fields of form after each submission.
 */
function clearForm() {
    for (input of formInputs) {
        if (input.id !== "read_status") input.value = "";
        else input.checked = "true";
    }
}

/**
 * Creates a new book object and stores it into library array.
 * @param {Boolean} isUserInput - Is book information from user input or not.
 */
function addBookToLibrary(isUserInput) {
    if (isUserInput === false) {
        const bookOne = new Book("The Da Vinci Code", "Dan Brown", "689", true);
        const bookTwo = new Book("To Kill a Mockingbird", "Harper Lee", "281", true);
        const bookThree = new Book("The Giver", "Lois Lowry", "240", false);
        library.push(bookOne, bookTwo, bookThree);
    } else {
        const book = new Book(
            formInputs[0].value,
            formInputs[1].value,
            formInputs[2].value,
            formInputs[3].checked
        );
        library.push(book);
    }
}

/**
 * Displays newly added book into "My Library."
 * @param {Boolean} isUserInput - Is book information from user input or not.
 */
function displayBook(isUserInput) {
    for (let i = 0; i < library.length; i++) {
        if (isUserInput === true) i = library.length - 1;
        const article = document.createElement("article");
        const info = document.createElement("div");
        const title = document.createElement("h3");
        const em = document.createElement("em");
        const author = document.createElement("p");
        const pages = document.createElement("p");

        const action = document.createElement("div");
        const checkboxContainer = document.createElement("div");
        const text = document.createElement("p");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        const deleteBtn = document.createElement("button");
        const deleteImg = document.createElement("img");

        article.setAttribute("class", "book");
        info.setAttribute("class", "info");
        action.setAttribute("class", "action");

        checkboxContainer.setAttribute("class", "checkbox-container");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "read_status");
        checkbox.setAttribute("class", "checkbox");
        if (library[i].hasRead === true) checkbox.setAttribute("checked", "true");
        label.setAttribute("for", `toggle_${library.length}`);
        label.setAttribute("class", "switch");

        deleteImg.src = "img/delete.svg";
        deleteImg.alt = "Trash can icon";

        em.textContent = `${library[i].title}`;
        author.textContent = `Written by ${library[i].author}`;
        pages.textContent = `${library[i].pages} pages`;
        text.textContent = "Read:";

        title.appendChild(em);
        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(pages);

        checkboxContainer.appendChild(text);
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        deleteBtn.appendChild(deleteImg);
        action.appendChild(checkboxContainer);
        action.appendChild(deleteBtn);

        article.appendChild(info);
        article.appendChild(action);
        booksContainer.appendChild(article);
    }
}

/*******************************************************************************
 * Event listeners start here.
 ******************************************************************************/

window.addEventListener("pageshow", e => {
    addBookToLibrary(false);
    displayBook(false);
    form.style.display = "none";
    if (mediaQuery.matches) makeButtonSmall();
});

window.addEventListener("resize", e => {
    if (mediaQuery.matches) makeButtonSmall();
    else addBtn.textContent = "+ Add new book";
});

addBtn.addEventListener("click", e => {
    form.style.display = "flex";
    clearForm();
});

closeBtn.addEventListener("click", e => form.style.display = "none");

submitBtn.addEventListener("click", e => {
    if (validateForm() === true) {
        addBookToLibrary(true);
        displayBook(true);
        e.preventDefault();
    }
});

/*******************************************************************************
 * Remaining tasks/issues left to resolve.
 ******************************************************************************/

/**
 * 1. Implement a function that toggles a book's read status on
 *    a Book's prototype instance.
 * 2. Display delete confirmation card when delete icon is clicked and,
 *    when confirmed to delete book, remove it from "My Library."
 * 3. Update reading log when new book is added.
 * 4. Update reading log when user changes read status of a book.
 */