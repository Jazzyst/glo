"use strict";
let money,  addExpenses,  missionComplited, appData;

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking:  function(){
    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
    } while (isNumber(addExpenses))
    this.addExpenses = addExpenses.split(',');
    this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));
    console.log('Возможные расходы: ', this.addExpenses.join(', '));


    this.deposit = confirm('Есть ли у вас депозит в банке?');
    this.getInfoDeposit();
    if(confirm('Есть ли у вас дополнительный  источник заработка?')){
      let itemIncome, cashIncome
      do {
        itemIncome = prompt('какой у вас есть дополнительный заработок?','Майню биткоин');
      } while (isNumber(itemIncome))

      do {
        cashIncome = prompt('Сколько в месяц зарабатываете на этом?',10000);
      } while (!isNumber(cashIncome))

      this.income[itemIncome] = cashIncome;
    }

    for (let i = 0; i < 2; i++) {
      let keys, values
      while (isNumber(keys= prompt(`Введите обязательную статью расходов №${i + 1}?`)) || keys === ''){
        keys = prompt(`Введите обязательную статью расходов №${i + 1}?`);
      }
      console.log('keys',keys)
      if(keys === null){
        return
      }
      do {
        values = prompt(`Во сколько это обойдется?`);
          } while (!isNumber(values))

      this.expenses[keys] = +values
    }
    console.log(this.expenses);
    return this.expenses;

  },
  getExpensesMonth : function(){
    let sum = 0
    for(let item in this.expenses){
      sum+= this.expenses[item]
    }
    this.expensesMonth = sum;
    return this.expensesMonth;
  },
  getBudget: function(){
    let expAmount = this.getExpensesMonth();
    console.log('Расходы за месяц: ', expAmount);
    this.budgetMonth = money - expAmount;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    console.log('this.budgetMonth: ', this.budgetMonth);
    console.log('this.budgetDay: ', this.budgetDay);
    return this.budgetMonth, this.budgetDay;
  },
  getTargetMonth: function () {
    if (this.budgetMonth > 0) {
      missionComplited = Math.ceil(this.mission / this.budgetMonth );
      return `Цель будет достигнута через ${missionComplited} месяцев(-а)`;
    }
    return `Цель не будет достигнута, у Вас нет доходов`;
  },
  getStatusIncome: function () {
    switch (true) {
      case this.budgetDay >= 1200:
        return 'У вас высокий уровень дохода';
        break;
      case this.budgetDay >= 600 && this.budgetDay < 1200:
        return 'У вас средний уровень дохода';
        break;
      case this.budgetDay <= 600 && this.budgetDay >= 0:
        return 'К сожалению у вас уровень дохода ниже среднего';
        break;
      // case this.budgetDay < 0:
      //   return 'Что то пошло не так';
      //   break;
      default:
        return 'Я еще не видел таких денег';
    }
  },
  getInfoDeposit: function () {
    if(this.deposit){
      do {
        this.percentDeposit = prompt('Какой годовой процент', '10')
      } while (!isNumber(this.percentDeposit))

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 10000)
      } while (!isNumber(this.moneyDeposit))
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * this.period;
  }
}

appData.asking();

appData.getBudget();

console.log(appData.getTargetMonth())

console.log(appData.getStatusIncome());

for(let itemData in appData){
  console.log(`Наша программа включает в себя данные: ${itemData}: ${appData[itemData]}`);
}

