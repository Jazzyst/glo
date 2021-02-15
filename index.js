const booksCollection  = document.querySelector('.books');
const books  = document.querySelectorAll('.book');
console.log(books)
booksCollection.prepend(books[1]);
booksCollection.append(books[2]);
books[4].after(books[3]);
const body = document.querySelector('body')
body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

const book3Heading = books[4].querySelector('h2 a')
book3Heading.textContent = 'Книга 3. this и Прототипы Объектов';


const book2ListItems = books[0].querySelectorAll('ul li');
const book5ListItems = books[5].querySelectorAll('ul li');
const book6ListItems = books[2].querySelectorAll('ul li');


book2ListItems[10].before(book2ListItems[2])
book2ListItems[9].before(book2ListItems[4])
book2ListItems[4].after(book2ListItems[5])
book2ListItems[5].after(book2ListItems[7])


book5ListItems[1].after(book5ListItems[9])
book5ListItems[4].after(book5ListItems[2])
book5ListItems[7].after(book5ListItems[5])

const li = document.createElement('li')
li.textContent = 'Глава 8: За пределами ES6'
book6ListItems[8].after(li)

document.querySelector('.adv').remove()

