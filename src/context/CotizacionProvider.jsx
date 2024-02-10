import { createContext } from "react";
//axios
import axios from 'axios'
//validador de errores
import ValidateErrors from "../helpers/ValidateErrors.js";
//variables entorno
const tkn = import.meta.env.VITE_TOKEN_VARIABLE;

const CotizacionContext=createContext()

function CotizacionProvider({children}){

    const guardarCotizacion = async (file)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/cotizaciones/guardar-cotizacion',file,config)
            return data
        } catch (error) {
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    } 

    const obtenerCotizacionesLength = async ()=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data:{lengthCotizaciones}} = await axios('http://localhost:5000/api/cotizaciones',config)
            return lengthCotizaciones
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const enviarCotizacionMovil = async (dataId)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/cotizaciones/enviar-cotizacion-movil',dataId,config)
            return data
        } catch (error) {
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const enviarCotizacionEmail = async (dataId)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/cotizaciones/enviar-cotizacion-email',dataId,config)
            return data
        } catch (error) {
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    return (
        <CotizacionContext.Provider
            value={{
                guardarCotizacion,
                obtenerCotizacionesLength,
                enviarCotizacionMovil,
                enviarCotizacionEmail
            }}
        >
            {children}
        </CotizacionContext.Provider>
    )
}

export {
    CotizacionContext
}

export default CotizacionProvider;