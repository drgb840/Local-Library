function findAccountById(accounts, id) {
  let found = null;
  for (let i=0; i<accounts.length; i++){
    const accountsIndex = accounts[i]
    if (accountsIndex.id === id){
      return accountsIndex
    }
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(compareLastNames);
}
//helper function is above ^^^

function compareLastNames(alpha, beta) {
  const lastNameA = alpha.name.last.toLowerCase();
  const lastNameB = beta.name.last.toLowerCase();

  if (lastNameA < lastNameB) {
    return -1;
  }
  if (lastNameA > lastNameB) {
    return 1;
  }
  return 0;
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let total = 0;
  for (let book of books) {
    const { borrows } = book;
    borrows.forEach((element) => {
      if (element.id === id) {
        total++;
      }
    });
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];

  for (const book of books) {
    const { borrows, authorId } = book;
    const borrowed = borrows.some((borrow) => borrow.id === account.id && !borrow.returned);

    if (borrowed) {
      const author = authors.find((author) => author.id === authorId);
      const bookWithAuthor = { ...book, author };
      borrowedBooks.push(bookWithAuthor);
    }
  }

  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
