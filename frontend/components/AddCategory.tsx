import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from './ui/button';

type Data = {
    title: string,
    picture: string,
}

const AddCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>();

    const Login: SubmitHandler<Data> = async (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(Login)} className='flex flex-col'>
            <Label htmlFor="category" className='text-white'>Choisissez une catégorie :
                <select id="category" className="text-black" {...register("title", { required: true })}>
                    <option value="">--</option>
                    <option value="ARCADIA">ARCADIA</option>
                    <option value="POKEMON">POKEMON</option>
                    <option value="ONE_PICE">ONE PIECE</option>
                </select>
                {errors.title && errors.title.type === "required" && <span className='text-red-500'>Catégory Obligatoire</span>}
            </Label>

            <Label htmlFor='picture' className='text-white'>Ajoutez une image</Label>
            <Input type="url" id='picture'{...register("picture", { required: true })} />
            {errors.picture && errors.picture.type === "required" && <span className='text-red-500'>Url Obligatoire</span>}


            <Button type="submit">Ajouter la catégorie</Button>
        </form>
    )
}

export default AddCategory