import React,{useState} from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'
const CurrencyConverter = () => {

    // displayig these currencies as options
const currencies=['BTC', 'ETH', 'USD', 'XRP' ,'LTC', 'ADA' ]

// using useState to save desired current=cy butcoin or usd etc
const [chosenPrimaryCurrency, setChosenPrimaryCurrency]=useState('BTC')
const [chosenSecondaryCurrency, setChosenSecondaryCurrency]=useState('BTC')

const[amount,setAmount]=useState(1)
const [exchangeRate,setExchangeRate]=useState(0)
const [primaryCurrencyExchanged,setPrimaryCurrencyExchanged]=useState('BTC')
const [secondaryCurrencyExchanged,setSecondaryCurrencyExchanged]=useState('BTC')

const [result,setResult]=useState(0)
// console.log(amount);

// button function to convert the currency
const convert=()=>{
    
const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  }
  
  axios.request(options).then( (response)=> {
      console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
      setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
      setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amount)
      setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
    setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
    }).catch( (error)=> {
      console.error(error);
  })
}
console.log(exchangeRate)
    return (
        <div className="currency-converter">
            <h1>Currency converter</h1>

            <div className="data-box">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input 
                                    type="number"
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    // value={""} to display selected here at checkbox
                                    value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                //    using useState const here to save selected value
                                onChange={(e)=>setChosenPrimaryCurrency(e.target.value)}
                                >
                                {/* ?displaying currencies in options */}
                                    {/* {currencies.map(currency=>(<option>{currency}</option>))} */}
                                    {currencies.map((currency,_index) => (<option key={_index}>{currency}</option>))}

                                </select>
                            </td>
                        </tr>


                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input type="number"
                                    name="currency-amount-2"
                                    value={result}
                                    disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                     onChange={(e)=>setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {/* <option></option> */}
                                    {currencies.map((currency,_index) => (<option key={_index}>{currency}</option>))}

                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
<button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate 
            // passing props parameter
        exchangeRate={exchangeRate}
        chosenPrimaryCurrency={primaryCurrencyExchanged}
        chosenSecondaryCurrency={secondaryCurrencyExchanged}
            />
        </div>
    )
}

export default CurrencyConverter

