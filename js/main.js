let bookmarkName = document.getElementById("bookmarkName")
let bookmarkURL = document.getElementById("bookmarkURL")
let submitBtn = document.getElementById("submitBtn")
let tableContent = document.getElementById("tableContent")
let closeBtn = document.getElementById("closeBtn")
let boxModal = document.querySelector(".box-info");
let deleteBtns;
let visitBtns;
let bookmarks = []


if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark()
}

submitBtn.addEventListener("click", makeBookmark)

// RegExp

function validateInputUrl(value) {
    var regexUrl = new RegExp(/^(https?:\/\/)?((([a-zA-Z0-9$_.+!*'(),;?&=-]+)(:[a-zA-Z0-9$_.+!*'(),;?&=-]*)?@)?((\[[0-9a-fA-F:.]+\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})))((\/[a-zA-Z0-9$_.+!*'(),;:@&=-]*)*(\/[a-zA-Z0-9$_.+!*'(),;:@&=-]+)(\/[a-zA-Z0-9$_.+!*'(),;:@&=-]*)*(\?[a-zA-Z0-9$_.+!*'(),;:@&=-]*)?)?(#[a-zA-Z0-9$_.+!*'(),;:@&=-]*)?$/, "gm")
    return regexUrl.test(bookmarkURL.value)
}
function validateInputName(value) {
    var regexName = new RegExp(/^(\w| |,|\.|\/){3,30}$/, "gm")
    return regexName.test(value)
}

// Make Bookmark

function makeBookmark() {
    if (validateInputName(bookmarkName.value) && validateInputUrl(bookmarkURL.value)) {
        let bookmark = {
            name: bookmarkName.value,
            url: bookmarkURL.value
        }

        bookmarks.push(bookmark)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        clearInputs()
        displayBookmark()
    }
    else {
        boxModal.classList.remove("d-none");
    }
}

function displayBookmark() {
    let newBookmark = ""
    for (let i = 0; i < bookmarks.length; i++) {
        newBookmark += `
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>              
        <td>
        <button data-title="${bookmarks[i].url}" class="btn btn-visit" data-index="${i}">
            <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </td>
        <td>
        <button class="btn btn-delete pe-2" data-index="${i}">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button>
        </td>
    </tr>
        `
    }
    tableContent.innerHTML = newBookmark
    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }
    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (let i = 0; i < visitBtns.length; i++) {
            let btn = visitBtns[i]
            btn.addEventListener("click", function (e) {
                visitWebsite(e);
            })
            btn.addEventListener("mouseenter", () => {
                btn.classList.add("tooltip-top")
            })
            btn.addEventListener("mouseleave", () => {
                btn.classList.remove("tooltip-top")
            })
        }
    }


}

function clearInputs() {
    bookmarkName.value = ""
    bookmarkURL.value = ""
}

// Buttons

function deleteBookmark(e) {
    let index = e.target.dataset.index
    bookmarks.splice(index, 1)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    displayBookmark()
}
function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    console.log(websiteIndex)
    console.log(bookmarks)
    open(`${bookmarks[websiteIndex].url}`);
}

// Close Modal

function closeModal() {
    boxModal.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});