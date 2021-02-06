
let randomNumber = Math.floor(1 + Math.random() * (100 + 1 - 1));

const getStatusIncome = (userNumber) => {
  userNumber = prompt('Угадай число от 1 до 100');
  console.log(userNumber, randomNumber)
  if(userNumber === null){
    alert('Игра окончена');
    return;
  }

  switch (true) {
    case userNumber > randomNumber:
      alert('Загаданное число меньше');
      getStatusIncome(userNumber)
      break;
    case userNumber < randomNumber:
      alert('Загаданное число больше');
      getStatusIncome(userNumber)
      break;
    case isNaN(userNumber):
      alert('Введи число!');
      getStatusIncome(userNumber)
      break;
    case userNumber == randomNumber:
      alert('Поздравляю, Вы угадали!!!');
      break;
  }
}
getStatusIncome();


