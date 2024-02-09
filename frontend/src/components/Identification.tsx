import React, { useState } from 'react';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from "react-hook-form";

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data);

        } catch (error) { /* empty */ }
    }


    const [modalIsOpen, setIsOpen] = useState(false);

    const HandleConnection = () => {
        setIsOpen(true);
    }


    return (
        <div className='identifiant-content'>
            <div className='identification' onClick={HandleConnection}>Se connecter </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Connection"
                style={customStyles}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="form_sign">
                    <input type='email' placeholder='Email' {...register("email", { required: true })} />
                    {errors.email && <span></span>}

                    <input type='password' placeholder='Password'{...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}

                    <input type="submit" value="Connection" className="btn-submit" />
                </form>
            </Modal>

        </div>
    )
}

export default Identification