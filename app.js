const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   {id: 1, text: 'Flower', amount: -20},
//   {id: 2, text: 'Salary', amount: 300},
//   {id: 3, text: 'Book', amount: -40},
//   {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTrans = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ?
    localStorageTrans : [];

const addTransactionDOM = transaction => {
  const sign = transaction.amount >= 0 ? 'plus' : 'minus';
  const mathSign = transaction.amount >= 0 ? '+' : '-';

  // Method one:
  const item = document.createElement('li');
  item.classList.add(sign);

  item.innerHTML = `
    ${transaction.text} <span>${mathSign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTrans(${transaction.id})">x</button> 
  `;

  listEl.appendChild(item);

  // Method two:
  // listEl.innerHTML += `
  //     <li class="${sign}">${transaction.text} <span>${mathSign}${Math.abs(transaction.amount)}</span>
  //       <button class="delete-btn">x</button>
  //     </li>
  //     `;
};

const removeTrans = transID => {
 transactions = transactions.filter(item => item.id !== transID);
 updateLocalStorage();
 init()
};

const updateValues = () => {
  const amountArr = transactions.map(trans => trans.amount);

  balance.innerText = `$${amountArr.reduce((a,c)=>a+c, 0).toFixed(2)}`;

  const income = amountArr.filter(item => item >= 0).reduce((a,c)=>a+c, 0).toFixed(2);
  moneyPlus.innerText = `+$${income}`;

  const expense = amountArr.filter(item => item < 0).reduce((a,c)=>a+c, 0);
  moneyMinus.innerText = `-$${Math.abs(expense).toFixed(2)}`;

};

const init = () => {
  listEl.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
};

const generateID =_=> {
  return Math.floor(Math.random() * 100000000);
  // console.log(id)
};

const addTransaction = e => {
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add a text and amount')
  } else {
    const newTrans = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    console.log(newTrans);
    transactions.push(newTrans);
    addTransactionDOM(newTrans);
    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

const updateLocalStorage = () => localStorage.setItem('transactions', JSON.stringify(transactions));


init();
formEl.addEventListener('submit', addTransaction);
