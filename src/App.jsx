import React, { useState } from "react";
let expenses = [
  { id: 1, description: "Pizza", amount: 800, date: "2025-09-01" },
  { id: 2, description: "Tea", amount: 100, date: "2025-09-03" },
];

function App() {
  const [items, setItems] = useState(expenses);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  return (
    <div className="container">
      <Header />

      <FormCard onAddItems={handleAddItem} />

      <ExpenseCard items={items} onDeleteItem={handleDeleteItem} />

      <ExpenseSummary items={items} />
    </div>
  );
}
function Header() {
  return <h1>💸 Expense Tracker</h1>;
}
function FormCard({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  function handleSumbit(e) {
    e.preventDefault();
    if (!description || !amount || !date) return;
    const id = crypto.randomUUID();
    const newItem = { id, description, amount, date };
    //console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setAmount("");
    setDate("");
  }
  return (
    <div className="form-card">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="e.g. Pizza"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
function ExpenseCard({ items, onDeleteItem }) {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul>
        {items.map((item) => (
          <ExpenseList item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
function ExpenseList({ item, onDeleteItem }) {
  return (
    <li className="expense-item">
      <span>{item.description}</span>
      <span>${item.amount}</span>
      <span>{item.date}</span>
      <button className="delete" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}
function ExpenseSummary({ items }) {
  const Balance = 4500;
  const totalSpent = items.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const persentage = ((totalSpent / Balance) * 100).toFixed(1);
  const isShowSummery = totalSpent <= Balance;
  return (
    <div className="summary">
      {isShowSummery ? (
        <div>
          <h2>Summary</h2>
          <p>💰 Total Spent: ${totalSpent}</p>
          <p>💰 Remaing Balance: ${Balance - totalSpent}</p>
          <p>🏦 Balance: ${Balance}</p>
          <div className="progress-container">
            <div id="progress-bar" style={{ width: `${persentage}%` }}></div>
          </div>
        </div>
      ) : (
        <div>Out Of Balance</div>
      )}
    </div>
  );
}
export default App;
