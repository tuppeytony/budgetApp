let btnStart = document.querySelector('#start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    btnExpenses = document.getElementsByTagName('button')[0],
    btnOptionalExpenses = document.getElementsByTagName('button')[1],
    btnCountBunget = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkBoxSavings = document.querySelector('#savings'),
    inpChooseSum = document.querySelector('.choose-sum'),
    inpChoosePercent = document.querySelector('.choose-percent'),
    inpYearValue = document.querySelector('.year-value'),
    inpMonthValue = document.querySelector('.month-value'),
    inpDayValue = document.querySelector('.day-value');

    btnExpenses.disabled = true;
    btnCountBunget.disabled = true;
    btnOptionalExpenses.disabled = true;

let money, time;

btnStart.addEventListener('click', function() {
    time = prompt('Введите дату', 'В формате YYYY-MM-DD');
    money = +prompt('Скажите ваш бюджет');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Скажите ваш бюджет');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(1);
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    btnExpenses.disabled = false;
    btnCountBunget.disabled = false;
    btnOptionalExpenses.disabled = false;
}); //запись даты и дохода

btnExpenses.addEventListener('click', function () {
    let sum = 0;

    for ( let i = 0; i < expensesItem.length; i++) {
        let forWhat = expensesItem[i].value;
        let howMuchCost = expensesItem[++i].value;
        if (typeof(forWhat) === 'string' && typeof(forWhat) != null && typeof(howMuchCost) != null && forWhat != '' &&
            howMuchCost != '' && forWhat.length < 50) {
            appData.expenses[forWhat] = howMuchCost;
            sum += +howMuchCost;
        } else {
            alert('Нужно правильно заполнить поля!');
            i--;
        }
    }
    expensesValue.textContent = sum;
    console.log()
}); //обязательные расходы

btnOptionalExpenses.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let optExpenses = optionalExpensesItem[i].value;
        if (optExpenses != '') {
            appData.optionalExpenses[i] = optExpenses;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ", ";
        }
    }
}); //необязательыне расходы

btnCountBunget.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(1);
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 500) {
            levelValue.textContent = 'Не густой бюджет на день(';
        } else if (appData.moneyPerDay < 1000) {
            levelValue.textContent = 'Так то солидно получается';
        } else {
            levelValue.textContent = 'Вы богатый даймё';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
}); //рассчет бюджета на день и оценка его

chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
}); //возможный доход

checkBoxSavings.addEventListener('click', function () {
    if (appData.saving == true) {
        appData.saving = false
    } else {
        appData.saving = true;
    }
}); //проверка на чекбокс

inpChooseSum.addEventListener('input', function () {
   if (appData.saving == true) {
    let sum = +inpChooseSum.value,
        pers = +inpChoosePercent.value;
       appData.monthIncome = sum/100/12*pers;
       appData.yearIncome = sum/100*pers;

       monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
       yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
   }
}); //подсчет накоплений на год

inpChoosePercent.addEventListener('input', function () {
    if (appData.saving == true) {
        let sum = +inpChooseSum.value,
            pers = +inpChoosePercent.value;
        appData.monthIncome = sum/100/12*pers;
        appData.yearIncome = sum/100*pers;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}); //подсчет накоплений в месяц

let appData = {
    budget: money, //общее количество денег
    timeData: time, //дата составления
    expenses: {}, //обязательные расходы
    optionalExpenses: {}, //дополнительыне расходы
    income: [], //дополнительный доход
    saving: false, //проверка на накопления
}; //объект для записи данных
