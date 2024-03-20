"use client"
import React, { useEffect, useState } from 'react'
import urlDb from "@/lib/urlDb";
import axios from "axios";
import ErrorUi from '../error';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  last_connection: string;
  created_at: string;
  email: string;
}

interface AddressData{
  id: number;
}

const Users = () => {

  const [userData, setUserData] = useState<UserData[]>()

  const getUser = async () => {
    try {
      const response = await axios.get(urlDb.getAllUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUserData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!userData) return <ErrorUi />
  console.log(userData);

  return (
    <div className='text-white'>
      {userData.map((user: UserData) => (
        <div key={user.id}>
          <p>Numéro d'identifiant : {user.id}</p>
          <p>Adresse email : {user.email}</p>
          <p>Nom : {user.last_name}</p>
          <p>Prénom : { user.first_name}</p>
          <p>Date de création du compte : {user.created_at }</p>
          <p>Dernière connection : {user.last_connection}</p>
        </div>
      ))}
    </div>
  )
}

export default Users