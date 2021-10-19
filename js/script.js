window.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('formbook');
    bookForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        inputBook(); 
    });

    const searchTitle = document.getElementById('searchForm');
    searchTitle.addEventListener('submit', (event) => {
        event.preventDefault();
        searchByTitle();
    });

    const backToTopBtn = document.querySelector('.back-to-top-btn');
    backToTopBtn.addEventListener('click', () => {
        backToTop();
    });

    window.addEventListener('scroll', () => {
        const scrollHeight = window.scrollY;

        if (scrollHeight > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    maxPublishedYear();
    unfinishedAccordion();
    finishedAccordion();

    if (isStorageExist()) {
        loadStorageData();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Data berhasil disimpan');
});

document.addEventListener('ondataloaded', () => {
    console.log('Data berhasil diload');
    refreshDataFromBooks();
});