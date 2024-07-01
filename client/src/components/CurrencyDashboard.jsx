import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCurrencyToStore } from '../redux/currency/currencySlice'
import moment from "moment"

const CurrencyDashboard = () => {
    const dispatch = useDispatch()

    const { currencies } = useSelector((state) => state.currency)
    console.log(typeof currencies)

    useEffect(() => {
        const fetchCurrencies = async () => {
            const res = await fetch('/api/v1/currency')
            const data = await res.json()
            return data
        }

        fetchCurrencies().then(data => dispatch(addCurrencyToStore(data)))
    }, [])
    console.log(currencies)

    // create rows from currency
    const rows = currencies?.map((currency) => {
        return (
            <tr key={currency._id}>
                <td className='text-center py-5 px-3 text-slate-900'>{currency.currencyname}</td>
                <td className='text-center py-5 px-3 text-slate-900'>
                    {
                        moment(currency.updatedAt).format('l')} - {moment(currency.updatedAt).format('LT')
                    }
                </td>
                <td className='text-center py-5 px-3 text-slate-900'>{currency.exchangerate}</td>
            </tr>
        )
    })

    return (
        <div className='w-[1000px] h-[500px] mx-auto mt-20 flex flex-col p-10 gap-10 justify-start items-start'>
            <Link to={'/add-currency'}>
                <span className="px-7 py-3 bg-cyan-600 rounded text-white">Create</span>
            </Link>

            <div className="p-3">
                <table className='w-[900px] divide-y divide-gray-200'>
                    <thead className='bg-cyan-200'>
                        <tr className=''>
                            <th>Currency</th>
                            <th>Exchange Time</th>
                            <th>Exchange Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CurrencyDashboard
