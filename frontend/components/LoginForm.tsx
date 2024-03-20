import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '@/lib/features/user/userSlice';
import urlDb from '@/lib/urlDb';
import { Button } from './ui/button';
import { Dispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';


type Data = {
    email: string,
    password: string,
}

const LoginForm = () => {

    const dispatch = Dispatch();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>();

    const Login: SubmitHandler<Data> = async (data) => {
        try {

            const user = await axios.post(urlDb.connection, data);
            localStorage.setItem("token", user.data.token);
            const token = localStorage.getItem("token") as string
            dispatch(login(token))
            router.push('/');


        } catch (error:any) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(Login)}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email..." type="email" {...register('email')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password..." type="password" {...register('password')} required />
                    {errors.password && errors.password.type === "required" && <span>Mot de passe Obligatoire</span>}
                </div>
                <Button type="submit">Connection</Button>
            </div>
            <ToastContainer autoClose={5000}/>
        </form>
    )
}

export default LoginForm

