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

    //metodos
    const cargarImagenesUsuario= async (file)=>{
        console.log(file)
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/usuarios/imagenes-upload',file,config)
            return data
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                alert,
                cargarImagenesUsuario 
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