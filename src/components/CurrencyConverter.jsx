import { useEffect, useState } from 'react'
import './converter.css'

export default function CurrencyConverter() {

    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('EUR')
    const [toCurrency, setToCurrency] = useState('USD')
    const [exchangeRate, setExchangeRate] = useState()
    const [convertedAmount, setConvertedAmount] = useState()

    async function fetchExchangeRate() {
        try {
            const apiResponse = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`, {
                method: 'GET'
            })

            const result = await apiResponse.json()

            const calculateRate = result?.rates[toCurrency]
            setExchangeRate(calculateRate)
            setConvertedAmount((amount * calculateRate).toFixed(2))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchExchangeRate()
    }, [fromCurrency, toCurrency, amount])

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value)
    }

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value)
    }

    return (
        <div className="converter-container">
            <div className="input-container">
                <input
                    value={amount}
                    onChange={handleAmountChange}
                    type="number"
                    name='amount'
                    placeholder='Enter Amount'
                />

                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    <option value={'EUR'}>EUR</option>
                    <option value={'USD'}>USD</option>
                    <option value={'INR'}>INR</option>
                </select>
            </div>

            <p className='input-to'>To</p>

            <div className="input-container">
                <input type="text" value={convertedAmount} readOnly />

                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    <option value={'USD'}>USD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'INR'}>INR</option>
                </select>
            </div>

            <p className='exchange-rate'>Exchange rate : 1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
        </div>
    )
}