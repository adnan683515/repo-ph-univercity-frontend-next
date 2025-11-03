"use client"
import { useLoginMutation } from '@/Redux/Features/auth/authApi'
import { setUser } from '@/Redux/Features/auth/authSlice'
import { useAppDispatch } from '@/Redux/Features/hook'
import { verifyToken } from '@/utils/verifyToken'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type TPayload = {
    userId: string
    password: string
}

export default function Login() {
    //mutation caputre from auth api.ts
    const [addUser, { data, isError, isLoading }] = useLoginMutation()

    //get dispatch actions from authslice 
    const dispatch = useAppDispatch()

    //react hook from
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TPayload>({
        defaultValues: {
            userId: 'A-0001',
            password: 'admin123'
        }
    })
    const [showPassword, setShowPassword] = useState(false)


    async function onSubmit(data: TPayload) {

        const id = data?.userId
        const password = data?.password

        // user mutation call by addUser
        const result = await addUser({ id, password }).unwrap()

        //token verify kortesi
        const user = verifyToken(result?.data?.accessToken)


        //setUser action decoded
        dispatch(setUser({ user, token: result?.data?.accessToken }))


        // fetch('http://localhost:5000/api/v1/auth/login', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "id": "A-0001",
        //         "password": "admin123"
        //     })
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data)
        //     })
        //     .catch((err) => {
        //         console.log("erorr", err)
        //     })

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6"
                aria-label="Login form"
            >
                <h2 className="text-2xl font-semibold text-center">Sign in</h2>


                <div>
                    <label htmlFor="userId" className="block text-sm font-medium mb-1">User ID</label>
                    <input
                        id="userId"
                        {...register('userId', { required: 'User ID is required' })}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.userId ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Enter your user id"
                        aria-invalid={errors.userId ? 'true' : 'false'}
                    />
                    {errors.userId && (
                        <p role="alert" className="text-sm text-red-600 mt-1">{errors.userId.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="Enter your password"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && (
                        <p role="alert" className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 rounded-xl bg-black text-white font-medium disabled:opacity-60"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500">Only User ID and Password required.</p>
            </form>
        </div>
    )
}