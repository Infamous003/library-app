import { myLibrary } from "../data/library.js";

function Book(title, author, pages, haveRead){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.haveRead = haveRead
}

const myBook = new Book("Hunter X Hunter", "Yoshihiro Togashi", "4238", true);

function addBookToLibrary(book){
  const bookExists = myLibrary.some(b => {
    return b.title == book.title
  });
  if (!bookExists) myLibrary.push(book);
}

let bookGridHTML = ``;
function showBooks(){
  myLibrary.forEach((book) => {
    bookGridHTML += `
      <div class="col-md-4 js-card">
              <div class="card p-3">
                  <div class="d-flex flex-row mb-3">
                      <div class="d-flex flex-column ml-2">
                        <h6>${book.title}</h6>
                        <span class="text-muted">${book.author}</span>
                      </div>
                  </div>
                  <p>
                    ${book.description}
                  </p>
                  <div class="d-flex justify-content-between install mt-3">
                    <span>${book.pages} Pages</span>
                    <span class="text-primary">
                      View&nbsp;
                      <i class="fa fa-angle-right"></i>
                    </span>
                  </div>
              </div>
      </div>
    `;
    console.log(bookGridHTML);
  });
  document.querySelector(".js-card-container").innerHTML = bookGridHTML;
}

showBooks();

addBookToLibrary(myBook);
addBookToLibrary(myBook);