"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import AdminShett from "./AdminShett";
import { Menu } from 'lucide-react';
import { Selector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";


const BarreRecherche = () => {

    const user = Selector(selectUser);
    return (
        <aside className="flex w-5/6 max-w-7xl items-center space-x-0 mx-auto py-1.5 sm:w-5/6 justify-center">
            <div className={(user !== null && user.userRole === "ADMIN") ? "flex" : "hidden"}>
                <AdminShett ><Menu /></AdminShett>
            </div>
            <Input type="search" placeholder="Recherche ..." className="text-center rounded-none" />
            <Button type="submit" id="text" aria-label="Search" className="rounded-none m-0"><Search /></Button>
        </aside>
    )
}

export default BarreRecherche
