import React from "react";

function Transaction(props){
    return(
        <div className="transaction">
            <div className="left">
                <div className="name">{props.detail}</div>
                <div className="description">{props.descrp}</div>
            </div>
            <div className="right">
                <div className="price green">{props.amount}</div>
                <div className="datetime">{props.datetime}</div>
            </div>
        </div>
    );
}

export default Transaction;