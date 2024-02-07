

interface Address {
    numero: number;
    rue: string;
    code_postal: number;
    ville: string;
    
}

export interface UserInterface{
    _id: number;
    role: string;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    adress: Address;
    tel: number;
}