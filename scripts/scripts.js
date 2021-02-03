let money, income, addExpenses, deposit, mission, period, splittedStr, budgetDay, expenses1, expenses2, amount1, amount2, missionComplited;

money = +prompt('Ваш месячный доход?');
income = 'Freelance income';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 100000;
period = 12;
expenses1 = prompt('Введите обязательную статью расходов №1?');
expenses2 = prompt('Введите обязательную статью расходов №2?');
amount1 = +prompt('Во сколько это обойдется №1?');
amount2 = +prompt('Во сколько это обойдется №2?');

const showTypeOf = (data) =>{
  console.log(data, typeof(data))
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

splittedStr = addExpenses.toLowerCase().split(', ');

const getExpensesMonth = (exp1, exp2) =>{
  return exp1 + exp2;
};

console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log('Возможные расходы: ', splittedStr);

const getAccumulatedMonth = (monthIncome, exp1, exp2) =>{
  return monthIncome - (exp1 + exp2);
}

const accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
console.log('accumulatedMonth', accumulatedMonth);

const getTargetMonth = (mission, accumMonth)=>{
  if(accumMonth >0) {
    missionComplited = Math.ceil(mission / accumMonth);
    return `Цель будет достигнута через ${missionComplited} месяцев(-а)`;
  }
  return `Цель небудет достигнута, у Вас нет доходов`;
}
console.log(getTargetMonth(mission, accumulatedMonth))

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = () =>{
  switch (true) {
    case budgetDay >= 1200:
      return 'У вас высокий уровень дохода';
      break;
    case budgetDay >= 600 && budgetDay < 1200:
      return 'У вас средний уровень дохода';
      break;
    case budgetDay  <=600 && budgetDay >=0:
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







