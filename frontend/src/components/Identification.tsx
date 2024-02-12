import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Dispatch, Selector } from '../features/store';
import { login, selectUser, selectUserStatus } from '../features/user/userSlice';
import Loader from './Loader';



const customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};
type Inputs = {
    email: string,
    password: string,
}


const Identification: React.FC = () => {

    const dispatch = Dispatch();
    const user = Selector(selectUser);
    const status = Selector(selectUserStatus);
    //const error = Selector(state => state.user.error);

    const token: string | null = (localStorage.getItem("token"));
    const [modalIsOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            const co = await axios.post("http://localhost:8080/users/connection", data);

            localStorage.setItem("token", co.data.token);
            setIsOpen(false)

        } catch (error) {
            console.log(error);

        }
    };

    const HandleConnection = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (status === 'idle' && token !== null) {
            dispatch(login(token));
        }
    }, [status, dispatch, token]);

    console.log(status);


    if (status === 'loading') {
        return <Loader />;
    } /*else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }*/

    return (
        <div className='identifiant-content'>
            <div className={(user === null) ? 'identification' : "nonVisible"} onClick={HandleConnection}>Se connecter </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Connection"
                style={customStyles}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form_sign">
                    <input type='email' autoComplete="on" placeholder='Email' {...register("email", { required: true })} />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}

                    <input type='password' autoComplete="on" placeholder='Password'{...register("password", { required: true, maxLength: 20, minLength: 8 })} />
                    {errors.password && errors.password.type === "required" && <span>Mot de passe obligatoire</span>}
                    {/*{errors.password && errors.password.type === "maxLength" && <span>Mot de passe ne doit pas avoir plus de 20 caractères</span>}
                    {errors.password && errors.password.type === "minLength" && <span>Mot de passe ne doit pas avoir moins de 8 caractères</span>}*/}

                    <input type="submit" value="Connection" className="btn-submit" />
                </form>
            </Modal>
        </div >
    )
}

export default Identification