let money, income, addExpenses, deposit, mission, period, splittedStr, budgetDay;

money = 2000;
income = 'Freelance income';
addExpenses = 'internet, taxi, food, entertainment, other';
deposit = true;
mission = 100000;
period = 12;

console.log( 'money:' + typeof money, 'income:' + typeof income, 'deposit:' + typeof deposit);
console.log('AddExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

splittedStr = addExpenses.toLowerCase().split(', ');
console.log(splittedStr);

budgetDay = money / 30;
console.log('budgetDay', budgetDay);

