import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";

const AdminShett = ({ children }: { children: React.ReactNode }) => {

    


    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Que voulez faire ?</SheetTitle>
                    <SheetDescription className="flex flex-col gap-y-2.5">
                        <SheetClose asChild>
                            <Link href="/users"><Button>Voir les utilisateurs</Button></Link>
                        </SheetClose>
                        <SheetClose asChild><Button>Voir les commandes</Button></SheetClose>
                        <SheetClose asChild><Button>Ajouter une carte</Button></SheetClose>
                        <SheetClose asChild>
                            <Link href="/ajoutCategory"><Button>Ajouter une catégorie</Button></Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/ajoutCategory"><Button>Ajouter un booster</Button></Link>
                        </SheetClose>
                        <SheetClose asChild><Button>Ajouter un starter</Button></SheetClose>

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default AdminShett;