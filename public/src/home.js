function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  for (const book of books) {
    const { borrows } = book;
    const borrowed = borrows.some((borrow) => !borrow.returned);
    if (borrowed) {
      counter++;
    }
  }
  return counter;
}


function getMostCommonGenres(books) {
  const genreCounts = {};

  for (const book of books) {
    const genre = book.genre;
    if (genreCounts[genre]) {
       genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  }

   const sortedGenres = [];
  for (const genre in genreCounts) {
    sortedGenres.push([genre, genreCounts[genre]]);
  }

  sortedGenres.sort(([, countA], [, countB]) => countB - countA);

  const mostCommonGenres = sortedGenres.reduce((result, [genre, count], index) => {
    if (index < 5) {
      result.push({ name: genre, count });
    }
    return result;
  }, []);

  return mostCommonGenres;
}

function getMostPopularBooks(books) {
  const sortedBooks = books.sort(
    (bookA, bookB) => bookB.borrows.length - bookA.borrows.length
  );

  const mostPopularBooks = [];
  const length = sortedBooks.length < 5 ? sortedBooks.length : 5;
  for (let i = 0; i < length; i++) {
    const book = sortedBooks[i];
    mostPopularBooks.push({
      name: book.title,
      count: book.borrows.length
    });
  }

  return mostPopularBooks;
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};
  for (const book of books) {
    const authorId = book.authorId;
    if (!authorBorrowCounts[authorId]) {
      authorBorrowCounts[authorId] = 0;
    }
    authorBorrowCounts[authorId] += book.borrows.length;
  }

  const popularAuthors = [];
  for (const author of authors) {
    const { first, last } = author.name;
    const authorId = author.id;
    const count = authorBorrowCounts[authorId] || 0;
    popularAuthors.push({ name: `${first} ${last}`, count });
  }

  popularAuthors.sort((a, b) => b.count - a.count);

  const topAuthors = [];
  const maxLength = popularAuthors.length < 5 ? popularAuthors.length : 5;
  for (let i = 0; i < maxLength; i++) {
    topAuthors.push(popularAuthors[i]);
  }

  return topAuthors;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
