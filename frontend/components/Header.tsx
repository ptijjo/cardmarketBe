"use client"
import { ShoppingBasket } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Dispatch, Selector } from '@/lib/hooks'
import { login, selectUser, selectUserStatus, logout } from '@/lib/features/user/userSlice'
import BarreRecherche from './BarreRecherche'


const Header = () => {
    const dispatch = Dispatch();

    const user = Selector(selectUser);
    const status: string = Selector(selectUserStatus);
    const token: string | null = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


    useEffect(() => {
        if (status === 'idle' && token !== null) {
            dispatch(login(token as string));
        }
        if (token === null || status === "success") return
    }, [token, status, dispatch]);



    return (
        <header className='bg-white fixed top-0 left-0 w-full'  >
            <div className='flex items-center justify-between p-2'>
                <Link href="/"><h1 className=' text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600'>VibzMarket</h1></Link>
                <div className='flex items-center gap-2'>
                    <Button asChild className={(status !== "success") ? "h-full rounded-none" : "hidden"}>
                        <Link href="/login">Login</Link>
                    </Button>
                    <div className={(status !== "success") ? 'hidden' : "full flex items-center justify-center p-2 gap-2"}>
                        <Link href="/profil" className="">{user?.userFirstName}</Link>
                    </div>
                    <Link href="/panier" className='flex relative mx-2.5'>
                        <ShoppingBasket />
                        <span className="bg-red-700 w-6 text-sm rounded-full items-center flex justify-center absolute left-1/2 top-1/2 text-white">0</span>
                    </Link>
                </div>
            </div>
            <BarreRecherche />

        </header>
    )
}

export default Header
