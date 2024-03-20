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


type Data1 = {
    email: string,
    password: string,
    first_name: string,
    last_name: string
}

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data1>();

    const SignUp: SubmitHandler<Data1> = async (data) => {
        try {

            const user = await axios.post(urlDb.create, data);
            
            toast.success(`${user.data.first_name}`)

        } catch (error) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(SignUp)}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email..." type="email" {...register('email')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password..." type="password" {...register('password')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" placeholder="Nom..." type="text" {...register("last_name", { required: true })} />
                    {errors.last_name && errors.last_name.type === "required" && <span>Nom obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="prenom">Prenom</Label>
                    <Input id="prenom" placeholder="Prénom..." type="text" {...register("first_name", { required: true })} />
                    {errors.first_name && errors.first_name.type === "required" && <span>Prénom obligatoire</span>}
                </div>
                <Button type="submit">Enregistrer</Button>
            </div>
            <ToastContainer autoClose={5000} />
        </form>
    )
}

export default SignUpForm

