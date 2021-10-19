const KEY_STORAGE = 'BOOKS';
let books = [];

const isStorageExist = () => {
    if (typeof Storage === undefined) {
        alert('Maaf Browser Anda Tidak Mendukung Web Storage');
        return false;
    }

    return true;
};

const saveBookData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(KEY_STORAGE, parsed);

    document.dispatchEvent(new Event('ondatasaved'));
};

const loadStorageData = () => {
    const serializedData = localStorage.getItem(KEY_STORAGE);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        books = data;

        document.dispatchEvent(new Event('ondataloaded'));
    }
};

const updateStorageData = () => {
    if(isStorageExist())saveBookData();
};

function composeBookObject(title, author, year, isFinished) {
    return{
        id: +new Date(),
        title,
        author,
        year,
        isFinished,
    };
}

const findBook = (bookId) => {
    for (book of books) {
		if (book.id === bookId) return book;
	}

	return null;
};

const findBookIndex = (bookId) => {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;
        
        index++;
    }

    return -1;
};

const refreshDataFromBooks = () => {
    for (book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isFinished);
        newBook[ITEM_ID] = book.id;

        if (book.isFinished) {
            finishedListBook.append(newBook);
        }else{
            unfinishedListBook.append(newBook);
        }
    }
};

const searchBooks = (bookTitle) => {
    books.filter((book) => {
        if (book.title.toLowerCase().match(bookTitle.value.toLowerCase())) {
            if (book.isFinished) {
                const searchedBooks = makeBook(book.title, book.author, book.year, true);
                finishedListBook.append(searchedBooks);
            } else {
                const searchedBooks = makeBook(book.title, book.author, book.year, false);
                unfinishedListBook.append(searchedBooks);
            }
        }
    });
};