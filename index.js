const add = document.getElementById('add')
const title = document.getElementById('title')
const author = document.getElementById('author')
const bookList = document.getElementById('book-list')

class Book {
    constructor(Title, Author) {
        this.Title = Title
        this.Author = Author
    }
}