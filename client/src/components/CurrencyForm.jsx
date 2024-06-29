import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowLeftWideLine } from "react-icons/ri";

const CurrencyForm = () => {
    const [formData, setFormData] = useState({})
    let existedCurrencies = []

    const navigator = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)

        const res = await fetch('/api/v1/currency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(data)

        if (!res.ok) {
            return
        }
        if (res.ok) {
            navigator('/')
        }
    }

    return (
        <div className=' w-[1000px] h-[500px] mx-auto mt-20 flex flex-col p-10 gap-10 justify-start items-start'>
            <Link to={'/'}>
                <p className="flex items-center gap-3 px-7 py-3 bg-cyan-600 rounded text-white mb-20"><RiArrowLeftWideLine />Back</p>
            </Link>

            <form
                onSubmit={handleSubmit}
                className="w-3/5 flex flex-col gap-5 ml-60"
            >
                <select
                    onChange={(event) => setFormData({ ...formData, currencyname: event.target.value })}
                >
                    <option value="uncategorized">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="THB">THB</option>
                    <option value="SGD">SGD</option>
                    <option value="MMK">MMK</option>
                </select>

                <input
                    type="text"
                    onChange={(event) => setFormData({ ...formData, exchangerate: event.target.value })}
                    id='exchangerate' name='exchangerate'
                    className="block w-full rounded-md p-2 border focus:outline-none mb-20"
                    placeholder='Exchange Rate'
                    required
                />

                <div className="ml-96">
                    <button
                        className="ml-10 block rounded-md border bg-cyan-600  px-9 py-3 text-white">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CurrencyForm
