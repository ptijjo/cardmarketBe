"use client"
import { Category, getCategory, selectCategory, selectCategoryStatus } from "@/lib/features/category/categorySlice";
import { Dispatch, Selector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const dispatch = Dispatch();
  const router = useRouter();
  const category = Selector(selectCategory);
  const status: string = Selector(selectCategoryStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategory());
    }
    if (status === "success") return
  }, [status, dispatch])

  const Select = (data: string) => {
    router.push(`/category/${data}`)
  }


  return (
    <div className="flex flex-col items-center justify-around gap-y-4 py-3.5">
      {
        category?.map((categorie: Category) => (
          <div key={categorie.id} className="w-1/2 imageCategory flex items-center justify-center bg-white rounded-lg hover:opacity-80" onClick={() => Select(categorie.titre)}>
            <Image src={categorie.photoCategory} alt={categorie.titre} width={600} height={600} priority loading="eager" className="object-contain w-full h-full" />
          </div>
        ))
      }
    </div>
  );
}
