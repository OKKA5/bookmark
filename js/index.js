var SiteName = document.getElementById("name");
var SiteURL = document.getElementById("URL");
var bookmarkcontainer = document.getElementById("bookmarkcontainer");
var bookmarklist = [];

if (localStorage.getItem("bookmarks") != null) {
    bookmarklist = JSON.parse(localStorage.getItem("bookmarks"));
}
displayAll();

function addBookmark() {
    var bookmarkName = SiteName.value;
    var bookmarkURL = SiteURL.value;

    if (Validate(Nameregex, SiteName) && Validate(urlregex, SiteURL)) {
        var bookmark = {
            name: bookmarkName,
            url: bookmarkURL
        };

        bookmarklist.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarklist));
        displayBookmarks(bookmarklist.length - 1);
    } else {
        var alertHTML = `

        <div class="first bg-white p-3 " >
                <div class="bg-white d-flex justify-content-between mb-2 br">
                    <div class="d-flex gap-1 ">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <button class="bg-white border-0" onclick="dis()">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
                <p class="pt-sans-caption-bold">
                    Site Name or Url is not valid, Please follow the rules below :
                </p>
                <ul class="p-0">
                    <li><i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 characters</li>
                    <li><i class="fa-regular fa-circle-right"></i> Site URL must be a valid one</li>
                </ul>
            </div>
        `;
        alertcontainer.classList.add("overlay");
        alertcontainer.classList.remove("d-none");
        alertcontainer.innerHTML += alertHTML;
    }
}

function displayBookmarks(index) {
    var bookmarkHTML = `
    <div class="special ">
            <td class="col-3 ">${index}</td>
            <td class="col-3 ">${bookmarklist[index].name}</td>
            <td class="col-3 "><button class="btn btn-success" onclick="redirectTo('${bookmarklist[index].url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td class="col-3 "><button class="btn btn-danger" onclick="deletebookmark(${index})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </div>
    `;
    bookmarkcontainer.innerHTML += bookmarkHTML;
}

function displayAll() {
    bookmarkcontainer.innerHTML = "";
    for (var i = 1; i < bookmarklist.length; i++) {
        displayBookmarks(i)
    }
}
function deletebookmark(index) {
    bookmarklist.splice(index, 1)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarklist));
    displayAll()
}

function dis() {

    alertcontainer.classList.add("d-none");
}
function redirectTo(url) {
    window.location.href = url;
}
var Nameregex = /^[A-Za-z]{3,}.*$/;
var urlregex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
function Validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true;
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false;
    }
}