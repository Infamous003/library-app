import { myLibrary } from "../data/library.js";

function Book(title, author, description, pages, haveRead){
  this.title = title;
  this.author = author;
  this.description = description;
  this.pages = pages;
  this.haveRead = haveRead;
}

const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
const btnClose = document.querySelector(".btn-close")

//Preventing the default behaviour of the submit button, it sends the form data to the server by default. We dont want that to happen in our case since we're not really dealing with server ATM
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(getBookData());
  form.reset();
  btnClose.click();
  showBooks();
});

function getBookData(){
  let formData = new FormData(form);
  let bookData = {}
  console.log(formData.keys)
  for (const [key, value] of formData) {
    bookData[key] = value;
  }
  return bookData;
}

function addBookToLibrary(book){
  const bookExists = myLibrary.some(b => {
    return b.title == book.title
  });
  if (!bookExists) myLibrary.push(book);
}


function showBooks(){
  let bookGridHTML = ``;
  myLibrary.forEach((book) => {
    let readStatus = ""
    if (book.haveRead){
      readStatus = "Read";
    }else{
      readStatus = "Not Read";
    }
    bookGridHTML += `
      <div class="col-md-4 js-card css-card">
        <div class="card p-3">
            <div class="d-flex flex-row mb-3" style="justify-content: space-between">
                <div class="d-flex flex-column ml-2">
                  <h6>${book.title}</h6>
                  <span class="text-muted">${book.author}</span>
                </div>
                <button type="button" class="btn-close js-close-btn" aria-label="Close" data-book-id="${book.id}"></button>
            </div>
            <p>
              ${book.description || 'NA'}
            </p>
            <div class="d-flex justify-content-between install mt-3">
              <span>Pages: ${book.pages || 'NA'}</span>
              <span class="text-primary"></span>

              <button type="button" class="btn btn-success read-status-btn">${readStatus}</button>
            </div>
        </div>
      </div>
    `;
  });
  document.querySelector(".js-card-container").innerHTML = bookGridHTML;
}

showBooks();

function removeBookFromLibrary(bookId) {
  const filteredLibrary = myLibrary.filter(bookInLibrary => bookInLibrary.id != bookId); // Stores every book other than the one with bookId

  myLibrary.length = 0; // since myLibrary is imported, it is read only
  // To solve that, we are emptying the array while maintaining it's reference
  filteredLibrary.forEach(book => myLibrary.push(book));
  showBooks();
}
// refer event delegation. Events are added when the document is first loaded, but when new cards are added, they dont have event listeners attached to them, so event delegation ig
document.querySelector(".js-card-container").addEventListener("click", (event) => {
  if (event.target.matches(".js-close-btn")){
    const bookId = event.target.dataset.bookId;
    removeBookFromLibrary(bookId);
  }
  // if (event.target.matches(".read-status-btn")) {
  //   if (event.target.textContent == "Read"){
  //     event.target.textContent = "Not Read";
  //   }else{
  //     event.target.textContent = "Read";
  //   }
  // }
});

function toggleReadStatus(){
  let readStatus = document.querySelector(".read-status-btn");
  // console.log(readStatus.textContent == "Not Read")
  readStatus.addEventListener("click", () => {
    if (readStatus.textContent == "Have Read"){
      readStatus.textContent = "Not Read";
    }else{
      readStatus.textContent = "Have Read";
    }
  });
}