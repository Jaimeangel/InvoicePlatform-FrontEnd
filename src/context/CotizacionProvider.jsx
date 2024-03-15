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

    const obtenerCotizaciones= async ()=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data:{cotizaciones}} = await axios('http://localhost:5000/api/cotizaciones',config)
            return cotizaciones
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const obtenerUrlCotizacionById= async (ID)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data:{url}} = await axios(`http://localhost:5000/api/cotizaciones/getUrlPDF/${ID}`,config)
            return url
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const obtenerCotizacionById= async (ID)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data:{cotizacionId}} = await axios(`http://localhost:5000/api/cotizaciones/${ID}`,config)
            return cotizacionId
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
                enviarCotizacionEmail,
                obtenerCotizaciones,
                obtenerUrlCotizacionById,
                obtenerCotizacionById
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