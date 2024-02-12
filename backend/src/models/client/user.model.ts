import mongoose from "mongoose";
import { UserInterface } from "./user.interface";
import validator from "validator";


const userSchema = new mongoose.Schema<UserInterface>({

    role: {
        type: String,
        enum: ["user", "admin"],
        default:"user"
    },

    first_name:{
        type:String,
        required:true,
        trim: true,
        minLength: [2, "Veuillez entrer un nom avec au moins 2 caractères"],
        maxLength: [20, "Veuillez entrer un nom avec au max 20 caractères"]
    },

    last_name:{
        type:String,
        required:true,
        trim: true,
        minLength: [2, "Veuillez entrer un nom avec au moins 2 caractères"],
        maxLength: [20, "Veuillez entrer un nom avec au max 20 caractères"]
    },

    email:{
        type:String,
        required:true,
        trim: true,
        unique:true,
        validate(v:any) {
            if (!validator.isEmail(v)) throw new Error("Veuillez entrer une adresse email correcte !")
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate(v: any) {
            if (!validator.isStrongPassword(v)) throw new Error("Veuillez entrer un mot de passe avec au moins 8 caratères avec une majuscule, un chiffre et un symbol");

        },
    },

    adress: {
        numero: {
            type: Number,
            trim: true,
        },
        rue: {
            type: String,
            trim: true,
        },
        code_postal: {
            type: Number,
            trim: true,
            validate(v: any) {
                if (!validator.isPostalCode(v,"FR")) throw new Error("Veuillez entrer un code postal valide");
            }
        },
        ville: {
            type: String,
            trim: true,
        }
    },
    tel: {
        type: Number,
        trim: true,
        validate(v: any) {
            if (!validator.isMobilePhone(v,"fr-FR")) throw new Error("Veuillez entrer un numéro de téléphone valide");
        }
    },

    reset_password_token: {
        type: String,
        unique: true,
        validate(v: any) {
            if (!validator.isJWT(v)) throw new Error("Token non-valide");

        },
    }

});

export const User = mongoose.model("User",userSchema);
