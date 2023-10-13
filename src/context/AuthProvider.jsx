import { useState, createContext, useEffect } from "react"
//herlpers
import ValidateErrors from "../helpers/ValidateErrors.js"
//axios
import axios from 'axios'
//variables entorno
const tkn = import.meta.env.VITE_TOKEN_VARIABLE;

const AuthContext=createContext()

function AuthProvider({children}) {
    const [alert,setAlert]=useState({msg:'',err:false})
    const [auth,setAuth]=useState('')

    useEffect(()=>{
        const authUser= async ()=>{
            const token=localStorage.getItem(tkn)
    
            if(!token){
                const errMsg= ValidateErrors("NO TOKEN")
                setAlert({
                    msg:errMsg,
                    err:true
                })
                return
            }

            const config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await axios('http://localhost:5000/api/usuarios/perfil',config)
                setAuth(data)
                setAlert({
                    msg:'',
                    err:false
                })
            }catch(error) {
                const errMsg= ValidateErrors(error)
                setAlert({
                    msg:errMsg,
                    err:true
                })
            }
        }
        authUser()
    },[])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                alert 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}

export default AuthProvider;