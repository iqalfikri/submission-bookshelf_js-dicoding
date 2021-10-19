const unfinishedListBook = document.querySelector('.unfinished-list');
const finishedListBook = document.querySelector('.finished-list');
const ITEM_ID = 'itemId';


const inputBook = () => {
    const bookTitle = document.getElementById('title');
    const bookAuthor = document.getElementById('author');
    const bookYear = document.getElementById('year');
    const bookYearFirstNumber = bookYear.value.split('')[0];
     
    if (bookTitle.value != '' && bookAuthor.value != '' && bookYear.value != '') {
        if (bookYearFirstNumber !=0) {
            const book = makeBook(bookTitle.value, bookAuthor.value, bookYear.value);
            const bookObject = composeBookObject(bookTitle.value, bookAuthor.value, bookYear.value, false);

            book[ITEM_ID] = bookObject.id;
            books.push(bookObject);

            bookTitle.value = '';
            bookAuthor.value = '';
            bookYear.value = '';

            unfinishedListBook.append(book);
            updateStorageData();

            Swal.fire({
				title: 'Success!',
				text: 'Book added to the list',
				icon: 'success',
				confirmButtonText: 'OK',
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn btn-success swal-btn',
				},
			});
        } else {
            Swal.fire({
				title: 'Invalid Input',
				text: 'Published year first number cannot be 0',
				icon: 'warning',
				confirmButtonText: 'OK',
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn btn-success swal-btn',
				},
			});
        }
    }else{
        Swal.fire({
			title: 'Empty Field',
			text: 'Please fill out the form',
			icon: 'warning',
			confirmButtonText: 'OK',
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn btn-success swal-btn',
			},
		});
    }
};

const makeBook = (title, author, year, isFinished) => {
    const containerBody = document.createElement('div');
    containerBody.classList.add('card-body');
    containerBody.innerHTML = `<h3 class='title mb-3'>${title}</h3>
    <p class='author'>Author : ${author}</p>
    <p class='year'>Published : ${year}</p>`;

    const container = document.createElement('div');
    container.classList.add('card', 'mb-2');
    container.append(containerBody);

    const containerFooter = document.createElement('div');
    containerFooter.classList.add('card-footer');

    if (isFinished) {
        containerFooter.append(unfinishedBtn(), removeBtn());
    } else {
        containerFooter.append(finishedBtn(), removeBtn());
    }

    container.append(containerFooter);

    return container;
};

const createButton = (classType, isFinished, eventListener) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', classType, 'me-2');

    if (isFinished) {
        btn.innerText = `UnFinished`;
    } else {
        btn.innerText = `Finished`;
    }

    if (classType == 'btn-danger') {
        btn.innerText = `Remove`;
    }

    btn.addEventListener('click', (event) =>{
        eventListener(event);
    });

    return btn;
}

const finishedBtn = () =>{
    return createButton('btn-success',false, (event) =>{
        addToFinished(event.target .parentElement.parentElement);
    });
};

const unfinishedBtn = () =>{
    return createButton('btn-warning', true, (event) =>{
        addToUnfinished(event.target .parentElement.parentElement);
    });
};

const removeBtn = () =>{
    return createButton('btn-danger',true, (event) =>{
        removeBook(event.target .parentElement.parentElement);
    });
};


const addToFinished = (bookElement) =>{
    const title = bookElement.querySelector('.title').innerText;
    const author = bookElement.querySelector('.author').innerText.split(':').slice(1);
    const year = bookElement.querySelector('.year').innerText.split(':').slice(1);

    //add to function makeBook
    const newBook = makeBook(title, author, year, true);
    const book = findBook(bookElement[ITEM_ID]);

    book.isFinished = true;
    newBook[ITEM_ID] = book.id;

    finishedListBook.append(newBook);
    bookElement.remove();
    updateStorageData();
};

const addToUnfinished = (bookElement) => {
    const title = bookElement.querySelector('.title').innerText;
    const author = bookElement.querySelector('.author').innerText.split(':').slice(1);
    const year = bookElement.querySelector('.year').innerText.split(':').slice(1);

    //add to function makeBook
    const newBook = makeBook(title, author, year, false);
    const book = findBook(bookElement[ITEM_ID]);

    book.isFinished = false;
    newBook[ITEM_ID] = book.id;

    unfinishedListBook.append(newBook);
    bookElement.remove();
    updateStorageData();
};

const removeBook = (bookElement) => {
    const bookPosition = findBookIndex(bookElement[ITEM_ID]);

    Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to delete this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Delete Book',
		buttonsStyling: false,
		reverseButtons: true,
		customClass: {
			cancelButton: 'btn btn-secondary me-2 swal-btn',
			confirmButton: 'btn btn-danger swal-btn',
		},
	}).then((result)=>{
        if (result.isConfirmed){
            Swal.fire({
				title: 'Deleted!',
				text: 'Book deleted from the shelf!',
				icon: 'success',
				confirmButtonText: 'OK',
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn btn-success swal-btn',
			},
        });

        books.splice(bookPosition, 1);
        bookElement.remove();
        updateStorageData();
    }
    });
};

const searchByTitle = () => {
    let searchInput = document.querySelector('#searchForm input');
    const unfinishedBooks = document.querySelectorAll('.unfinished-list .card');
    const finishedBooks = document.querySelectorAll('.finished-list .card');

    finishedBooks.forEach((e) => e.remove());
    unfinishedBooks.forEach((e) => e.remove());

    searchBooks(searchInput);
};

const maxPublishedYear = () => {
    const publishedYearInput = document.getElementById('year');
    const date = new Date();
    const year = date.getFullYear();

    publishedYearInput.setAttribute('min', 0);
    publishedYearInput.setAttribute('max', year);
};

const unfinishedAccordion = () => {
    const unfinishedIcon = document.querySelector('.unfinished-accordion-btn');
    unfinishedIcon.addEventListener('click', () => {
        unfinishedIcon.classList.toggle('fa-chevron-down');
        unfinishedIcon.classList.toggle('fa-chevron-up');
    });
};

const finishedAccordion = () => {
	const finishedIcon = document.querySelector('.finished-accordion-btn');
	finishedIcon.addEventListener('click', () => {
		finishedIcon.classList.toggle('fa-chevron-down');
		finishedIcon.classList.toggle('fa-chevron-up');
	});
};

const backToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
    });
};