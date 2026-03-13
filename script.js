const form = document.querySelector('.form');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const balance = document.querySelector('.balance');
const income = document.querySelector('.income');
const expense = document.querySelector('.expense');
const monthlyIncome = document.querySelector('.monthlyincome');
const monthlyExpense = document.querySelector('.monthlyexpense');
const expenseChange = document.querySelector('.expense-change');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Form submitted');
    
    const addedTransaction = {
        name: nameInput.value,
        amount: Number(amountInput.value),
        date: dateInput.value
    };
    transactions.push(addedTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    addUI(addedTransaction);
    calculateTotals();
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
});
function calculateTotals() {
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(transaction => {
        totalBalance += transaction.amount;
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });
    let expensePercent = 0;
    if(totalIncome > 0){
    expensePercent = (Math.abs(totalExpense) / totalIncome) * 100;
}
   expenseChange.textContent = `${expensePercent.toFixed(1)}% of income spent`;
    balance.textContent = `₹${totalBalance.toFixed(2)}`;
    income.textContent = `₹${totalIncome.toFixed(2)}`;
    expense.textContent = `₹${Math.abs(totalExpense).toFixed(2)}`;
    monthlyIncome.textContent = `₹${totalIncome.toFixed(2)}`;
    monthlyExpense.textContent = `₹${Math.abs(totalExpense).toFixed(2)}`;
}
function addUI(transaction) {
    const list = document.querySelector('.Transactions-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div>
    <strong>${transaction.name}</strong><br>
    <small>${transaction.date}</small>
    </div>
    <span class="${transaction.amount > 0 ? 'incomes' : 'expense'}">
    ₹${Math.abs(transaction.amount).toFixed(2)}
    </span>
    <button class="delete-btn">🗑</button>
    `;
    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        transactions.splice(transactions.indexOf(transaction), 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        calculateTotals();
    });
    list.appendChild(listItem);
}
transactions.forEach(transaction => {
    addUI(transaction);
});

calculateTotals();