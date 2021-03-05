'use strict';

let dateNow = new Date().getTime(),
  finishDate = new Date('01 january 2022').getTime(),
  timeRemaining = (finishDate - dateNow) / 1000,
  daysToNY = Math.floor(timeRemaining / 60 /60 / 24);

let date = new Date(),
  daysArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let day = daysArr[date.getDay()-1];

let hours = date.getHours();

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

let curTime = document.querySelector('.current-time');
let curDate = document.querySelector('.current-date');


let wrap = document.createElement('div');
document.body.append(wrap)

const curTimeDate = () =>{
  let date = new Date(),
    time = date.toLocaleTimeString('en'),
    currentDate = date.toLocaleDateString('en');
  return{time, currentDate}
}

setInterval( () => {
  let {time, currentDate} = curTimeDate(),
   dateString = `<div>${goodDay}</div>
<div>Сегодня: ${day}</div>
<div class="current-date">Текущее время: ${time}</div>
<div class="current-time">Текущая дата: ${currentDate}</div>
<div>До нового года осталось ${daysToNY} дней</div>`;

  wrap.innerHTML = dateString;

},1000)












