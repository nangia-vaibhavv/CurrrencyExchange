import React from 'react'
const ExchangeRate=({exchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency})=>{

    return (
        <div className="exchange-rate">
        <h1>Exchange Rate: </h1>
           <h3> {exchangeRate}</h3>
           <p>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
        </div>
    )
}

export default ExchangeRate
