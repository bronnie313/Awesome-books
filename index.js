import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const displayDate = () => {
  const date = document.getElementById('date');
  date.innerHTML = DateTime.now();
};

displayDate();

const add = document.getElementById('add');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookList = document.getElementById('book-list');

class BookBinding {
  constructor() {
    this.awesomeBooks = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
  }

  add(title, author) {
    const book = new Book(title.value, author.value);
    if (title.value.length && author.value.length) {
      this.awesomeBooks.push(book);
    }
    localStorage.setItem('Books', JSON.stringify(this.awesomeBooks));
    title.value = '';
    author.value = '';
  }

  removeBook(index) {
    this.awesomeBooks.splice(index, 1);
    localStorage.setItem('Books', JSON.stringify(this.awesomeBooks));
  }

  static update() {
    const awesomeBooks = JSON.parse(localStorage.getItem('Books'));
    const bookElement = document.createElement('bookElement');
    bookList.innerHTML = '';
    awesomeBooks.forEach((book, i) => {
      let color;
      if (i % 2 === 0) {
        color = 'bg-light';
      } else {
        color = '';
      }
      bookElement.innerHTML += `
            <div id="items" class="d-flex justify-content-between align-items-center ${color}">
                <p class="m-0">"${book.Title}" by ${book.Author}</p>
                <button type="button" class="removeBtn btn btn-outline-dark p-1" data-index="${i}">Remove</button>
            </div>
            `;
      bookList.appendChild(bookElement);
    });
  }
}

const bookBinding = new BookBinding();

// adds a click event listener to the parent container of the remove Btn
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBtn')) {
    const index = parseInt(event.target.dataset.index, 10);
    bookBinding.removeBook(index);
    BookBinding.update();
  }
});

// adds a click event listener to add Btn
add.addEventListener('click', (e) => {
  e.preventDefault();
  bookBinding.add(title, author);
  BookBinding.update();
});

BookBinding.update();

// implement single page application
const a = document.querySelectorAll('a');
const s = document.querySelectorAll('section');

a.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    s.forEach((section) => {
      if (section.id === link.getAttribute('href').substring(1)) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
});

document.querySelector('section').style.display = 'block'; 