import React, {useEffect, useState} from "react";
import './App.css';
// import { response } from "express";

function App() {
	const [name, setName] = useState("");
	const [datetime, setDatetime] = useState("");
	const [description, setDescription] = useState("");
	const [transactions, setTransactions] = useState([]);
	const url = "http://localhost:4000";
	// function handleName(event){
	// 	setName(event.target.value);
	// }
	// function handleDatetime(event){
	// 	setDatetime(event.target.value);
	// }
	// function handleDescription(event){
	// 	setDescription(event.target.value);
	// }

	useEffect(()=>{
		getTransactions().then(setTransactions);
	}, []);

	async function getTransactions(){
		const response = await fetch(url+"/api/transactions");
		return await response.json();
	}

	function addNewTransaction(event){
		event.preventDefault();
		const price = name.split(' ')[0];
		fetch(url+"/api/transaction", {
			method: 'POST',
			headers: {"Content-type":"application/json"},
			body: JSON.stringify({
				name: name.substring(price.length+1),
				price, description, datetime})
		}).then(response =>{
			response.json().then(json =>{
				setName("");
				setDatetime("");
				setDescription("");
				console.log("result",json);
			});
		});
	}

	// Manipulation for Net costing
	let balance =0;
	transactions.forEach(item => {
		balance += item.price;
	});
	balance = balance.toFixed(2);
	let cost = balance;
	const fraction = balance.split('.')[1];
	balance = balance.split('.')[0];

	return (
		<main>
			<h1 className={cost<0? "red":"green"}>₹ {balance}<span>.{fraction}</span></h1>
			<form onSubmit={addNewTransaction}>
				<div className="basic">
					<input type="text" value={name} onChange={(ev)=>setName(ev.target.value)} placeholder="+200 credit from xyz" />
					<input type="datetime-local" value={datetime} onChange={(ev)=>setDatetime(ev.target.value)} />
				</div>
				<div className="description">
					<input type="text" value={description} onChange={(ev)=>setDescription(ev.target.value)} placeholder="Description"/>
				</div>
				<button type="submit">Add new transaction</button>
				<div className="total">Total transactions: {transactions.length}</div>
				
			</form>

			<div className="transactions">
				{transactions.length>0 && transactions.map(item => (
					<div className="transaction">
						<div className="left">
							<div className="name">{item.name}</div>
							<div className="description">{item.description}</div>
						</div>
						<div className="right">
							<div className={"price " +(item.price<0? "red":"green")}>
								{item.price}</div>
							<div className="datetime">{item.datetime}</div>
						</div>
					</div>
				))}
				
			</div>
		</main>
	);
}

export default App;
