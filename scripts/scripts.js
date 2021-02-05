let money, income, addExpenses, deposit, mission, period, splittedStr, budgetDay, expenses, missionComplited;

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

income = 'Freelance income';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 100000;
period = 12;

const start = () => {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money))
};
start();

const showTypeOf = (data) => {
  console.log(data, typeof (data))
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

expenses = [];
splittedStr = addExpenses.toLowerCase().split(', ');

const getExpensesMonth = () => {
  let sum;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt(`Введите обязательную статью расходов №${i + 1}?`);
    do {
      sum = prompt(`Во сколько это обойдется?`);
    } while (!isNumber(sum))
    sum = +sum + +sum;
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth()

console.log('Расходы за месяц: ', expensesAmount);
console.log('Возможные расходы: ', splittedStr);

const getAccumulatedMonth = (monthIncome) => {
  return monthIncome - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth(money);
console.log('accumulatedMonth', accumulatedMonth);

const getTargetMonth = (mission, accumMonth) => {
  if (accumMonth > 0) {
    missionComplited = Math.ceil(mission / accumMonth);
    return `Цель будет достигнута через ${missionComplited} месяцев(-а)`;
  }
  return `Цель не будет достигнута, у Вас нет доходов`;
}
console.log(getTargetMonth(mission, accumulatedMonth))

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = () => {
  switch (true) {
    case budgetDay >= 1200:
      return 'У вас высокий уровень дохода';
      break;
    case budgetDay >= 600 && budgetDay < 1200:
      return 'У вас средний уровень дохода';
      break;
    case budgetDay <= 600 && budgetDay >= 0:
      return 'К сожалению у вас уровень дохода ниже среднего';
      break;
    case budgetDay < 0:
      return 'Что то пошло не так';
      break;
    default:
      return 'Я еще не видел таких денег';
  }
}
console.log(getStatusIncome());







