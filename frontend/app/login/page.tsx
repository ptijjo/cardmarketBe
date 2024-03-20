"use client"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Facebook, Instagram } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import ForgetSign from "@/components/ForgetSign";



const LoginPage = () => {

    return (
        <Tabs defaultValue="Connection" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="Connection">Connection</TabsTrigger>
                <TabsTrigger value="Enregistrement">Enregistrement</TabsTrigger>
            </TabsList>
            <TabsContent value="Connection">
                <Card>
                    <CardHeader>
                        <CardTitle>Connect to your account</CardTitle>
                        <CardDescription>Enter your email below to connect to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                    <CardFooter>
                        <Dialog>
                            <DialogTrigger>Mot de passe oublié?</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Veuillez entrer votre adresse mail</DialogTitle>
                                    <DialogDescription>
                                        <div className="flex flex-col space-y-1.5">
                                            <ForgetSign/>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="Enregistrement">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>Enter your email below to create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Button><Instagram />Google</Button>
                            <Button><Facebook />Facebook</Button>
                        </div>
                        <div>
                            or conitnue with
                        </div>
                        <SignUpForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <ToastContainer pauseOnFocusLoss={false} autoClose={5000} />
        </Tabs>
    )
}

export default LoginPage
