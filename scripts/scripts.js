let money, income, addExpenses, deposit, mission, period, splittedStr, budgetDay, expenses, missionComplited, appData;

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const start = () => {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money))
};
start();

appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking:  function(){
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
    this.addExpenses = addExpenses.toLowerCase().split(', ');
    this.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt(`Введите обязательную статью расходов №${i + 1}?`);
      do {
        question = prompt(`Во сколько это обойдется?`);
      } while (!isNumber(sum))
      sum += +question;
    }
  },
  getExpensesMonth : function(){
    let sum = 0, question, expenses = [];

    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt(`Введите обязательную статью расходов №${i + 1}?`);
      do {
        question = prompt(`Во сколько это обойдется?`);
      } while (!isNumber(sum))
      sum += +question;
    }
    console.log(expenses);
    return sum;
  },
  getAccumulatedMonth: function(monthIncome){
    let expAmount = this.getExpensesMonth();
    console.log('Расходы за месяц: ', expAmount);
    return monthIncome - expAmount;
  },
  getTargetMonth: function (mission, accumMonth) {
    if (accumMonth > 0) {
      missionComplited = Math.ceil(mission / accumMonth);
      return `Цель будет достигнута через ${missionComplited} месяцев(-а)`;
    }
    return `Цель не будет достигнута, у Вас нет доходов`;
  },
  getStatusIncome: function () {
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
}

appData.asking();




const accumulatedMonth = appData.getAccumulatedMonth(money);
console.log('accumulatedMonth', accumulatedMonth);


console.log(appData.getTargetMonth(appData.mission, accumulatedMonth))

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);


console.log(appData.getStatusIncome());