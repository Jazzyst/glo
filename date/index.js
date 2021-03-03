'use strict';

let dateNow = new Date().getTime(),
  finishDate = new Date('01 january 2022').getTime(),
  timeRemaining = (finishDate - dateNow) / 1000,
  daysToNY = Math.floor(timeRemaining / 60 /60 / 24);

let date = new Date(),
  time = date.toLocaleTimeString('en'),
  daysArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let day = daysArr[date.getDay()-1];

let hours = date.getHours();
console.log(hours)

let goodDay = null
switch (true) {
  case hours > 5 && hours <= 10:
    goodDay = 'Доброе утро';
    break;
  case hours > 10 && hours <= 17:
    goodDay = 'Добрый день';
    break;
  case hours >17 && hours <= 22:
    goodDay = 'Добрый вечер';
    break;
  case hours >22 && hours <= 24 || hours >=1 && hours <= 5:
    goodDay = 'Доброй ночи';
    break;
}






let dateString = `<div>${goodDay}</div>
<div>Сегодня: ${day}</div>
<div>Текущее время: ${time}</div>
<div>До нового года осталось ${daysToNY} дней</div>`

let wrap = document.createElement('div');
wrap.innerHTML = dateString;



document.body.append(wrap)
