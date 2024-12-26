import { myLibrary } from "../data/library.js";

function Book(title, author, pages, haveRead){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.haveRead = haveRead
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
    bookGridHTML += `
      <div class="col-md-4 js-card">
        <div class="card p-3">
            <div class="d-flex flex-row mb-3" style="justify-content: space-between">
                <div class="d-flex flex-column ml-2">
                  <h6>${book.title}</h6>
                  <span class="text-muted">${book.author}</span>
                </div>
                <button type="button" class="btn-close js-close-btn" aria-label="Close" data-book-id="${book.id}"></button>
            </div>
            <p>
              ${book.description}
            </p>
            <div class="d-flex justify-content-between install mt-3">
              <span>${book.pages} Pages</span>
              <span class="text-primary">

              </span>
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
  console.log(myLibrary);
  showBooks();
}
// refer event delegation. Events are added when the document is first loaded, but when new cards are added, they dont have event listeners attached to them, so event delegation helps here.
document.querySelector(".js-card-container").addEventListener("click", (event) => {
  if (event.target.matches(".js-close-btn")){
    const bookId = event.target.dataset.bookId;
    removeBookFromLibrary(bookId);
  }
});