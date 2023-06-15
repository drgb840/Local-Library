function findAuthorById(authors=[], id) {
 return authors.find((authorsObj)=> authorsObj.id === id)

 return result;
}

function findBookById(books, id) {
  return books.find((booksObj)=> booksObj.id === id)

 return result;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];
  
  for (const book of books) {
    const { borrows } = book;
    const borrowed = borrows.some((borrow) => !borrow.returned);
    if (borrowed) {
      borrowedBooks.push(book);
    } else {
      returnedBooks.push(book);
    }
  }
  
  return [borrowedBooks, returnedBooks];
}


function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  const borrows = book.borrows;
  
  let count = 0;
  for (const element1 of borrows) {
    const account = accounts.find((element2) => element2.id === element1.id);
    const { id, returned } = element1;
    const { name, picture, age, company, email, registered } = account;
    const borrower = {
      id,
      returned,
      name,
      picture,
      age,
      company,
      email,
      registered
    };
    borrowers.push(borrower);
    count++;
    if (count === 10) {
      break;
    }
  }
  
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
