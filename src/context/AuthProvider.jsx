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
                
                if (window.location.pathname !== "/login") {
                    // Redirect the user after a delay
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 6000);
                }
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
                setAlert({
                    msg:'Tu token ha expirado. Inicia sesión de nuevo. En un momento serás dirigido a tu inicio de sesión.',
                    err:true
                })
                
                // Check if the user is already on the "/login" page
                if (window.location.pathname !== "/login") {
                    // Redirect the user after a delay
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 6000);
                }
            }
        }
        authUser()
    },[])

    //metodos
    const cargarImagenUsuarioProfile= async (file)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/imagenes-upload-profile',file,config)
            return response
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const cargarImagenUsuarioCotizacion = async (file)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/imagenes-upload-cotizacion',file,config)
            return response
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const cargarImagenUsuarioFirmaDigital = async (file)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/imagenes-upload-firma-digital',file,config)
            return response
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const actualizarInfoUsuarioEmpresa = async (dataUser)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/usuarios/actualizar-usuario-empresa',dataUser,config)
            return data
        } catch (error) {
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
                cargarImagenUsuarioProfile,
                cargarImagenUsuarioCotizacion,
                cargarImagenUsuarioFirmaDigital,
                actualizarInfoUsuarioEmpresa
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