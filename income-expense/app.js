/** @format */

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dataTransaction = [
//   { id: 1, text: 'sweets', amount: -100 },
//   { id: 2, text: 'room', amount: -500 },
//   { id: 3, text: 'salary', amount: +18000 },
// ];

let transactions = [];

function init() {
  list.innerHTML = '';
  transactions.forEach(addDataToList);
  calculateMoney();
}

function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ? '-' : '+';
  const status = transactions.amount < 0 ? 'minus' : 'plus';
  const item = document.createElement('li');
  let result = formatNumber(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">X</button>`;
  list.appendChild(item);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function autoId() {
  return Math.floor(Math.random() * 1000000);
}

function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  // balance
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  // calculate income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  // calculate expense
  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -1
  ).toFixed(2);

  // show net balance
  balance.innerText = `฿` + formatNumber(total);
  money_plus.innerText = `฿` + formatNumber(income);
  money_minus.innerText = `฿` + formatNumber(expense);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Key record name and number');
  } else {
    const data = {
      id: autoId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = '';
    amount.value = '';
  }
}

form.addEventListener('submit', addTransaction);
init();
