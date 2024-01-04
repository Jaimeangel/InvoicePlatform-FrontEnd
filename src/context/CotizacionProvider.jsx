import { createContext } from "react";
//axios
import axios from 'axios'
//validador de errores
import ValidateErrors from "../helpers/ValidateErrors.js";
//variables entorno
const tkn = import.meta.env.VITE_TOKEN_VARIABLE;

const CotizacionContext=createContext()

function CotizacionProvider({children}){

    const subirPdfToBucket = async (file)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/cotizaciones/document-pdf-upload',file,config)
            return data.url
        } catch (error) {
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }
    return (
        <CotizacionContext.Provider
            value={{
                subirPdfToBucket
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