let money, income, addExpenses, deposit, mission, period, splittedStr, budgetDay, expenses1, expenses2, amount1, amount2, budgetMonth, missionComplited;

money = prompt('Ваш месячный доход?');
income = 'Freelance income';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 100000;
period = 12;
expenses1 = prompt('Введите обязательную статью расходов №1?');
expenses2 = prompt('Введите обязательную статью расходов №2?');
amount1 = prompt('Во сколько это обойдется №1?');
amount2 = prompt('Во сколько это обойдется №2?');



console.log( 'money:' + typeof money, 'income:' + typeof income, 'deposit:' + typeof deposit);
console.log('AddExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

splittedStr = addExpenses.toLowerCase().split(', ');
console.log(splittedStr);

budgetMonth = money - (+amount1 + +amount2);
missionComplited = Math.ceil(mission / budgetMonth);
console.log('Бюджет на месяц: ', budgetMonth);
console.log(`Цель будет достигнкта через ${missionComplited} месяцев(-а)` );


budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

switch (true) {
  case budgetDay >= 1200:
    console.log('У вас высокий уровень дохода');
    break;
  case budgetDay >= 600 && budgetDay < 1200:
    console.log('У вас средний уровень дохода');
    break;
  case budgetDay  <=600 && budgetDay >=0:
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  case budgetDay < 0:
    console.log('Что то пошло не так')
    break;
  default:
    console.log('Я еще не видел таких денег');
}

