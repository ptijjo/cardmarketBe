import { Request,Response,NextFunction } from "express"
import {User} from "../models/client/user.model";
import { UserInterface } from "../models/client/user.interface";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import {v4 as uuid} from "uuid"
import { sendMailForgetPassword } from "../email/user/user.mail";
import validator from "validator";


export class userController{

   //Creation d'un nouvel utilisateur
    public newUser = async (req: Request, res: Response) => {
        try {
            // Choix de l'avatar en fonction du genre choisi
            let urlPicture: string;
            const urlFemme = `${req.protocol}://${req.get('host')}/src/assets/defaultPicture/avatarFemme.png`;
            const urlHomme = `${req.protocol}://${req.get('host')}/src/assets/defaultPicture/avatarHomme.png`;
            (req.body.genre === "Homme") ? urlPicture = urlHomme : urlPicture = urlFemme;


            // Vérifier si l'email existe déja dans la base de données
            const existUser = await User.findOne({ email: req.body.email });
            //Si l'email existe on retourne un message
            if (existUser !== null) { return res.json({ response: "Email déja existant !" }) };

            //cryptage du mot de passe avec bcrypt
            const mdpCrypte = await bcrypt.hash(req.body.password, 10);

            //Creation du nouvel utilisateur
            const newUser = await User.create({
                ...req.body,
                password: mdpCrypte,
                picture: urlPicture,
            });

            res.status(201).json({
                message: "status ok! 👍",
                reponse: newUser
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    /* Supression de l'utilisateur
    public deleteUser = async (req: any, res: Response) => {
        
        try {
            const userId = req.params.id;

            //Si l'id est différent est différent de l'userId dans le header("Authorization") on renvoi un msg d'erreur!
            if (userId !== req.auth.userId) return res.status(401).json({ message: "Not authorized" })
            
            await User.findByIdAndDelete(userId);

            res.status(201).json({
                message: "status ok! 👍",
                reponse: `${userId} a été supprimé !`
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };*/

    //Connection de l'utilisateur
    public connectionUser = async (req: Request, res: Response) => {
        try {

            /**
             * @findUser est le resultat de la recherche de l'email de la requete dans la base de données
             * si elle n'existe pas on renvoi un message d'erreur
             * @findMdp est le résultat de la comparaison du mot de passe de la requete et celle de l'utilisateur trouvé
             * si le mdp ne correspond pas on renvoi un message d'erreur 
             * Ensuite on crée un token de connection  
             */
            const findUser:UserInterface|null = await User.findOne({ email: req.body.email });

            
            if (findUser===null) return res.status(401).json({ message: 'Email incorrect' });

            const findMdp = await bcrypt.compare(req.body.password, findUser.password);

            if (!findMdp) return res.status(401).json({ message: 'Mot de passe  incorrect' });

            res.status(200).json({
                userId: findUser._id,
                userEmail: findUser.email,
                userFistName: findUser.first_name,
                userLastName: findUser.last_name,
                userRole: findUser.role,
                token: jsonwebtoken.sign(
                    {
                        userId: findUser._id,
                        userEmail: findUser.email,
                        userFirstName: findUser.first_name,
                        userLastName: findUser.last_name,
                        userRole: findUser.role,
                    },
                    process.env.TOKEN_SECRET as string,
                    { expiresIn: process.env.EXPIRED_TOKEN }
                )
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }

    //Decodage token
    public decodageToken = async (req: Request, res: Response) => {
        try {
            const token : string = req.body.token;
            const decodedToken : any = jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string);
            const userId = decodedToken.userId;
            const userLastName = decodedToken.userLastName;
            const  userFirstName= decodedToken.userFirstName;
            const userEmail = decodedToken.userEmail;
            const userRole = decodedToken.userRole;

            res.status(200).json({ userLastName, userFirstName, userId, userRole, userEmail });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }

    //Génération du lien de réinitailisation mdp
    public generationLienMdp = async (req: Request, res: Response) => {
        try {
            const valideEmail:UserInterface|null = await User.findOne({ email: req.body.email });
            if (valideEmail === null) return res.status(401).json({ message: 'Email introuvable' });

             //Creation d'un token aléatoire
            const password_token = uuid();
            
            await User.updateOne({ email: valideEmail.email },
                {
                    $set: { reset_password_token: password_token }
                })
            
            const newUser : UserInterface|null = await User.findOne({ email: valideEmail.email });
            
            //send Email
            const link = `${process.env.FRONT_END}/reset-password/${password_token}`;

            await sendMailForgetPassword(valideEmail.email, valideEmail.first_name, valideEmail.last_name, link);  
            
                
            res.status(200).json({ newUser })
            
            return newUser?.email;
        }   
            
        catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }

    //Rénitialisation du mot de passe
    public resetMdp = async (req: Request, res: Response) => {
        try {
            
            const user: UserInterface | null = await User.findOne({ reset_password_token: req.body.reset_password_token });
            
            if (user === null) {
                return res.status(400).json({ message: "Erreur ! Veuillez réessayer !" })
            };

            if (!validator.isStrongPassword(req.body.password)) return res.status(401).json("Veuillez entrer un mot de passe avec au moins 8 caratères avec une majuscule, un chiffre et un symbol");

            const differentMdp = await bcrypt.compare(req.body.password, user.password);

            if (differentMdp) return res.status(401).json({ message: `Veuillez choisir un mot de passe différent de l'ancien` });

            const hashMdp = await bcrypt.hash(req.body.password, 10);

            await User.updateOne({ reset_password_token: user.reset_password_token }, {
                $set: {
                    password: hashMdp
                }
            });

            const newMdp: UserInterface | null = await User.findOne({ reset_password_token: user.reset_password_token });

            if (newMdp === null) return res.status(500).json("Erreur serveur")
            
            res.status(200).json({newMdp, user})
            
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }
    
}