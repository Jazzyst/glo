'use strict';

let submitBtn = document.getElementById('start'),
  cancelBtn = document.getElementById('cancel'),
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
  expensesItems = document.querySelectorAll('.expenses-items'),
  dataWrap = document.querySelector('.data'),
  dataInputs = dataWrap.querySelectorAll('input[type=text] '),
  allInputs = document.querySelectorAll('input[type=text] ');

let appData;


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

    if (salaryAmount.value !== '') {
      dataInputs.forEach(function (item) {
        item.setAttribute('disabled', 1);
        submitBtn.style.display ='none';
        cancelBtn.style.display='block';
      })
    }

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

  },

  reset: function(){
    this.income = {};
    this.incomeMonth = 0
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    allInputs.forEach(function (item) {
      item.value = '';
      item.removeAttribute('disabled');
    });
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    submitBtn.style.display ='block';
    cancelBtn.style.display='none';

    for(let i = 1; i<incomeItems.length; i++){
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display='block';
    }
    for(let i = 1; i<expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display='block';
    }
  },

  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
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
    let _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !=='' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },

  getIncome: function(){
    let _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        _this.income[itemIncome] = +cashIncome;
      }

    })

    for(let key in _this.income){
      _this.incomeMonth += +_this.income[key];
    }
  },

  getAddExpenses: function(){
   let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if(item !==''){
        _this.addExpenses.push(item)
      }
    })
  },



  getAddIncome: function(){
    let _this = this;
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    })
  },

  getExpensesMonth: function () {
    let _this = this;
    for (let item in _this.expenses) {
      _this.expensesMonth += _this.expenses[item];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },


  getTargetMonth: function () {
      return Math.ceil(targetAmount.value / this.budgetMonth);
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
    return this.budgetMonth * periodSelect.value;
  },
  changePeriod: function(e){
    periodAmount.textContent = e.target.value
    incomePeriodValue.value = appData.budgetMonth * e.target.value
  },
}

submitBtn.addEventListener('click',  function (e) {
  e.preventDefault()
  appData.start()
});

cancelBtn.addEventListener('click', function () {
  appData.reset();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriod);



