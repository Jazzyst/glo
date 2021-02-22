'use strict';

const submitBtn = document.getElementById('start'),
  cancelBtn = document.getElementById('cancel'),
  plusBtns = document.getElementsByTagName('button'),
  incomePlus = plusBtns[0],
  expensesPlus = plusBtns[1],
  depositCheck = document.querySelector('#deposit-check'),
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
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  dataWrap = document.querySelector('.data'),
  dataInputs = dataWrap.querySelectorAll('input[type=text] '),
  allInputs = document.querySelectorAll('input[type=text] ');

let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

class AppData  {
  constructor(){
    this.income = {};
    this.incomeMonth = 0;
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
  }

  start() {
    if (salaryAmount.value !== '') {
      dataInputs.forEach(function (item) {
        item.setAttribute('disabled', 1);
        submitBtn.style.display ='none';
        cancelBtn.style.display='block';
      })
    }

    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  }

  reset(){
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
    depositCheck.checked = false;

    for(let i = 1; i<incomeItems.length; i++){
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display='block';
    }
    for(let i = 1; i<expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display='block';
    }
  }

  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () =>{
      incomePeriodValue.value = this.calcPeriod();
    })
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true)
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display ='none';
    }
  }

  addIncomeBlock(){
    const  cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none'
    }
  }

  getExpInc(){
    const count = item =>{
      const startStr = item.className.split('-')[0];
      const itemTitle =  item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = +itemAmount;
      }
    }

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for(let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses(){
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) =>{
      item = item.trim();
      if(item !==''){
        this.addExpenses.push(item)
      }
    })
  }

  getAddIncome(){
    additionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    })
  }

  getExpensesMonth() {
    for (let item in this.expenses) {
      this.expensesMonth += this.expenses[item];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
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
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент', '10')
      } while (!isNumber(this.percentDeposit))

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', 10000)
      } while (!isNumber(this.moneyDeposit))
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  changePeriod(e){
    periodAmount.textContent = e.target.value;
  }

  eventListeners() {
    submitBtn.addEventListener('click',   (e) =>{
      e.preventDefault()
      this.start()
    });

    cancelBtn.addEventListener('click',  () =>{
      this.reset();
    });

    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));

    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

    periodSelect.addEventListener('change', this.changePeriod.bind(this));


  }
}

const appData  = new AppData();

appData.eventListeners();



// const isNumber = (n) => {
//   return !isNaN(parseFloat(n)) && isFinite(n)
// };







