'use strict';

let submitBtn = document.getElementById('start'),
  plusBtns = document.getElementsByTagName('button'),
  incomePlus = plusBtns[0],
  expensesPlus = plusBtns[1],
  checkboxDeposit = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  expensesItems = document.querySelectorAll('.expenses-items');

let money, addExpenses, missionComplited, appData;


const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getTargetMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();

  },

  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true)
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display ='none';
    }
  },

  addIncomeBlock: function(){
    let  cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none'
    }
  },

  getExpenses: function(){
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !=='' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },

  getIncome: function(){
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }

    })

    // if (confirm('Есть ли у вас дополнительный  источник заработка?')) {
    //   let itemIncome, cashIncome
    //     itemIncome = prompt('какой у вас есть дополнительный заработок?', 'Майню биткоин');
    //     cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
    //
    // }

    for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if(item !==''){
        appData.addExpenses.push(item)
      }
    })
  },



  getAddIncome: function(){
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    })
  },

  getExpensesMonth: function () {
    for (let item in appData.expenses) {
      appData.expensesMonth += appData.expenses[item];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },


  getTargetMonth: function () {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент', '10')
      } while (!isNumber(this.percentDeposit))

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 10000)
      } while (!isNumber(this.moneyDeposit))
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriod: function(e){
    periodAmount.textContent = e.target.value
    incomePeriodValue.value = appData.budgetMonth * e.target.value
  },
}

submitBtn.addEventListener('click',  function (e) {
  e.preventDefault()
  if (salaryAmount.value !== '') {
    appData.start()
  }

});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriod);


// for (let itemData in appData) {
//   console.log(`Наша программа включает в себя данные: ${itemData}: ${appData[itemData]}`);
// }

