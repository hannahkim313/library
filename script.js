/*******************************************************************************
 * Element object declarations start here.
 ******************************************************************************/

const menu = document.querySelector("menu");
const addBtn = document.querySelector(".default");

const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");

const totalBooks = document.querySelector(".total");
const read = document.querySelector(".read");
const unread = document.querySelector(".unread");

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
const readingLog = {
    totalBooks: 3,
    read: 2,
    unread: 1
};

/*******************************************************************************
 * Constructors start here.
 ******************************************************************************/

/**
 * Constructs a book object.
 * @param {String} title - Title of book.
 * @param {String} author - Author of book.
 * @param {String} pages - Number of pages of book.
 * @param {Boolean} hasRead - True if user has read the book.
 */
function Book(title, author, pages, hasRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.hasRead = hasRead
}

/*******************************************************************************
 * Prototype declarations start here.
 ******************************************************************************/

/**
 * Changes the read status of a book at a given index of library array.
 * @param {Number} index - Index number.
 */
Book.prototype.changeReadStatus = function(index) {
    this.hasRead = this.hasRead ? false : true;
};

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
        if (input.id !== "pages" && input.value.length !== 0) filled++;
        if (input.id === "pages" && input.value > 0) filled++;
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
 * @param {Boolean} isUserInput - True if book information is from user input.
 * @param {Object} checkbox - Checkbox element object that the user selected.
 */
function addBookToLibrary(isUserInput, checkbox) {
    if (!isUserInput) {
        const bookOne = new Book("The Da Vinci Code", "Dan Brown", "689", true);
        const bookTwo = new Book("To Kill a Mockingbird", "Harper Lee", "281", true);
        const bookThree = new Book("The Giver", "Lois Lowry", "240", false);
        library.push(bookOne, bookTwo, bookThree);
    }
    else if (checkbox) {
        const index = checkbox.closest(".book").getAttribute("data-index");
        const currentBook = library[index];
        const newBook = new Book(
            currentBook.title,
            currentBook.author,
            currentBook.pages,
            currentBook.hasRead
        );
        newBook.changeReadStatus();
        library.splice(index, 1, newBook);
        if (newBook.hasRead) {
            readingLog.read++;
            readingLog.unread--;
        } else {
            readingLog.read--;
            readingLog.unread++;
        }
    }
    else {
        const book = new Book(
            formInputs[0].value,
            formInputs[1].value,
            formInputs[2].value,
            formInputs[3].checked
        );
        library.push(book);
        readingLog.totalBooks++;
        if (book.hasRead) readingLog.read++;
        else readingLog.unread++;
    }
    updateReadingLog();
}

/**
 * Displays newly added book into "My Library."
 * @param {Boolean} isUserInput - True if book information is from user input.
 */
function displayBook(isUserInput) {
    for (let i = 0; i < library.length; i++) {
        if (isUserInput) i = library.length - 1;
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
        article.setAttribute("data-index", `${i}`);
        info.setAttribute("class", "info");
        action.setAttribute("class", "action");

        checkboxContainer.setAttribute("class", "checkbox-container");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "read_status");
        checkbox.setAttribute("class", "checkbox");
        if (library[i].hasRead) checkbox.setAttribute("checked", "true");
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

/**
 * Removes the book at a given index of library array.
 * @param {Number} index - Index number.
 */
function removeBookFromLibrary(index) {
    if (library[index].hasRead) readingLog.read--;
    else readingLog.unread--;
    readingLog.totalBooks--;
    updateReadingLog();
    library.splice(index, 1);
}

/**
 * Removes all child nodes of a given parent node.
 * @param {Object} parent - Parent element object to remove child nodes from.
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Displays a message when the library is currently empty.
 */
 function displayEmptyMessage() {
    const article = document.createElement("article");
    const message = document.createElement("p");
    
    booksContainer.style.alignItems = "center";
    booksContainer.style.gridTemplateColumns = "auto";
    booksContainer.style.gridTemplateRows = "auto";

    article.style.gridColumn = "auto";
    article.style.gridRow = "auto";

    message.textContent = "There are currently no books in your library."
    message.style.textAlign = "center";

    article.appendChild(message);
    booksContainer.appendChild(article);
}

/**
 * Resets the grid layout of "My Books" to its default styling.
 */
function resetLibraryGrid() {
    if (library.length === 1) {
        booksContainer.style.alignItems = "initial";
        booksContainer.style.gridTemplateColumns = "repeat(auto-fit, 300px)";
        booksContainer.style.gridTemplateRows = "150px";
    }
}

/**
 * Updates the values of the reading log.
 */
function updateReadingLog() {
    totalBooks.textContent = `${readingLog.totalBooks}`;
    read.textContent = `${readingLog.read}`;
    unread.textContent = `${readingLog.unread}`;
}

/*******************************************************************************
 * Event listeners start here.
 ******************************************************************************/

window.addEventListener("pageshow", e => {
    addBookToLibrary(false);
    displayBook(false);
    overlay.style.display = "none";
    form.style.display = "none";
    if (mediaQuery.matches) makeButtonSmall();
});

window.addEventListener("resize", e => {
    if (mediaQuery.matches) makeButtonSmall();
    else addBtn.textContent = "+ Add new book";
});

addBtn.addEventListener("click", e => {
    overlay.style.display = "initial";
    form.style.display = "flex";
    clearForm();
});

closeBtn.addEventListener("click", e => {
    overlay.style.display = "none";
    form.style.display = "none";
});

submitBtn.addEventListener("click", e => {
    if (library.length === 0) booksContainer.firstElementChild.remove();
    if (validateForm()) {
        addBookToLibrary(true);
        resetLibraryGrid();
        displayBook(true);
        e.preventDefault();
        overlay.style.display = "none";
    }
});

booksContainer.addEventListener("click", e => {
    if (e.target.tagName === "LABEL") {
        const checkbox = e.target.previousElementSibling;
        addBookToLibrary(true, checkbox);
        if (checkbox.checked) checkbox.removeAttribute("checked");
        else checkbox.setAttribute("checked", "true");
    }
    if (e.target.tagName === "IMG") {
        const deleteBtn = e.target;
        const index = parseInt(deleteBtn.closest(".book").getAttribute("data-index"));
        removeBookFromLibrary(index);
        removeAllChildNodes(booksContainer);
        displayBook(false);
        if (booksContainer.childElementCount === 0) displayEmptyMessage();
    }
});