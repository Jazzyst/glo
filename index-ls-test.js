'use strict';

//=========Local Storage===============


// const inputText = document.getElementById('myText'),
//   myBtn = document.getElementById('myBtn'),
//   text = document.getElementById('text');
//
//
// const showText = function(){
//   text.textContent = localStorage.getItem('memory');
// }
//
// myBtn.addEventListener('click', function () {
//   localStorage.setItem('memory', inputText.value)
//   showText();
// });
//
// localStorage.removeItem('myText');
// showText();



//==========Cookies================


// function setCookie(key, value, year, month, day, path, domain, secure){
//   let cookieStr = `${encodeURI(key)}=${encodeURI(value)}`;
//   if(year){
//     const expires = new Date(year, month-1, day);
//     cookieStr += `; expires=${expires.toGMTString()}`
//   }
//
//   cookieStr += path ? `; path=${encodeURI(path)}` : '';
//   cookieStr += domain ? `; domain=${encodeURI(domain)}` : '';
//   cookieStr += secure ? `; secure` : '';
//
//   document.cookie =cookieStr;
// }
//
// setCookie('hi', 'world');
// setCookie('hi2', 'world2', 2022, 1,1);
//
// console.log(decodeURI(document.cookie));
