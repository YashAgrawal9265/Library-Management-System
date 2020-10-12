console.log("welcome to the library");

// Creating the class-------------------------------------
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

// Creating the Display and various functions-------

class Display {

    // Adding the book in to the table body---------------

    add(book) {

        let bookInfo = localStorage.getItem('bookInfo');
        let bookObj
        if (bookInfo == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(bookInfo);

        }
        let html = "";
        bookObj.forEach(function(element, index) {
            html += `<tr class="tableRow">
          <td class="bookSearch">${element.name}</td>
          <td>${element.author}</td>
          <td>${element.Type}</td>
          <td><button class="btn btn-primary btn-sm" id="${index}"onclick="deleteBook(this.id)">Delete Book</td>
        </tr>`

        });
        let tableBody = document.getElementById("tableBody");
        if (tableBody.length != 0) {
            tableBody.innerHTML = html;
        } else {
            tableBody.innerHTML = `<div><h6>No book is added</h6></div>`
        }
        localStorage.setItem('bookInfo', JSON.stringify(bookObj));


    }

    // CLearing the form tab------------------

    clear() {
            let libraryForm = document.getElementById("libraryForm")
            libraryForm.reset();
        }
        // Allowing to add only valid informatiom---

    validate(book) {
            if (book.name.length < 5 || book.author.length < 3) {
                return false
            } else {
                return true
            }

        }
        // Showing the Alert -----------------------------------
    show(type, sentence, color) {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
        <strong> ${type} </strong> ${sentence}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`

        setTimeout(() => {
            message.innerHTML = "";

        }, 3000);

    }

}

//Delete function for deleting the book-------

function deleteBook(index) {
    let bookInfo = localStorage.getItem('bookInfo');
    if (bookInfo == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(bookInfo);

    }
    bookObj.splice(index, 1);
    localStorage.setItem("bookInfo", JSON.stringify(bookObj));

    // let display = new Display()
    display.add();

}

// For reloading we call this display so that after reloading we get our books-------

let display = new Display()
display.add();

//Submitting the form--------------------------------------------------------

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", formSubmit)

function formSubmit(e) {

    let bookName = document.getElementById("bookName").value;
    let authorName = document.getElementById("authorName").value;
    let fiction = document.getElementById("Fiction")
    let programming = document.getElementById("Programming")
    let cooking = document.getElementById("Cooking")
    let type
    if (fiction.checked) {
        type = fiction.value
    } else if (programming.checked) {
        type = programming.value
    } else if (cooking.checked) {
        type = cooking.value
    }
    let book = new Book(bookName, authorName, type);

    e.preventDefault();

    // Setting the book information in the local storage----------------------------------

    /* This if allow us to store bookinfo in localstorage if and only if book name
       and author name length is more than 5 */

    if (book.name.length > 5 || book.author.legth > 5) {
        let bookInfo = localStorage.getItem('bookInfo');
        if (bookInfo == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(bookInfo);

        }
        let myObj = {
            name: bookName,
            author: authorName,
            Type: type

        }
        bookObj.push(myObj)
        localStorage.setItem('bookInfo', JSON.stringify(bookObj));
        console.log(bookObj);

    }



    // Calling th Display Class-------------------------------------------
    let display = new Display()

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('Success!', 'Your form has been submitted successfully', 'success');


    } else {


        display.show('Error!', 'Your form has not been submitted', 'danger');
    }
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function() {
    let inputval = searchTxt.value;
    let tableRow = document.getElementsByClassName("tableRow");
    Array.from(tableRow).forEach(element => {
        let bookTxt = element.getElementsByClassName("bookSearch")[0].innerText;
        if (bookTxt.includes(inputval)) {
            element.style.display = "block";
            // console.log("hello");


        } else {
            element.style.display = "none";
        }
    });

})