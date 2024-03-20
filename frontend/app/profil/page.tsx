"use client"
import React from 'react'
import { logout } from '@/lib/features/user/userSlice';
import { Dispatch } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
const PageProfil = () => {

    const deco = () => {
        const dispatch = Dispatch();
        dispatch(logout())
    }
    return (
        <div>
            <Button className='flex items-center justify-center h-1/3 text-xs text-center' onClick={deco}>Logout</Button>
            
        </div>
    )
}

export default PageProfil;