const myLibrary = [
  {
    title: "Jojo's Bizarre Adventure: Steel Ball Run",
    author: "Hirohiko Araki",
    pages: 1190,
    haveRead: false
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 1948,
    haveRead: true
  },
  {
    title: "Batman: The Long Haloween",
    author: "Jeph Loeb",
    pages: 314,
    haveRead: true
  },
  {
    title: "The kite Runner",
    author: "Khaled Hosseini",
    pages: 299,
    haveRead: true
  }
]

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

function showBooks(){
  myLibrary.forEach((book) => {
    console.log(book);
  })
}

showBooks()

addBookToLibrary(myBook);
addBookToLibrary(myBook);