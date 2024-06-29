import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInFailure } from "../redux/user/userSlice"

const Login = () => {
    const [formData, setFormData] = useState({})

    useSelector((state) => console.log(state.user))
    const { error } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }
    console.log(formData)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)

        try {
            const res = await fetch('/api/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data)

            if (data.success === false) {
                dispatch(signInFailure(data.message))
                console.log(data.message)
                return
            }

            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className='h-screen md:flex gap-8 justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className="w-4/12 flex flex-col gap-5"
            >
                <h1 className="text-2xl font-semibold">Login</h1>

                <input
                    type="text"
                    onChange={handleChange}
                    id='username' name='username'
                    className="block w-full rounded-md p-2 mb-4 border focus:outline-none"
                    placeholder='Username'
                    required
                />

                <input
                    type="password"
                    onChange={handleChange}
                    id='password' name='password'
                    className="block w-full rounded-md p-2 mb-4 border focus:outline-none"
                    placeholder='Password'
                    required
                />

                <div className="ml-96">
                    <button
                        className="ml-10 block rounded-md border bg-cyan-600  px-9 py-3 text-white">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
