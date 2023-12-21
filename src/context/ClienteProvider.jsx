import { createContext , useState, useEffect} from "react";
//axios
import axios from "axios";
//validador de errores
import ValidateErrors from "../helpers/ValidateErrors.js";
//variable entorno token
const tkn = import.meta.env.VITE_TOKEN_VARIABLE;

//contexts
const ClienteContext=createContext()

function ClienteProvider({children}) {
    const [clientes,setClientes]=useState([])

    //metodos
    const obtenerClientesByUsuario = async ()=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios('http://localhost:5000/api/clientes',config)
            setClientes(data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const crearClienteByUsuario = async (dataCliente)=>{
        const token=localStorage.getItem(tkn)

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:5000/api/clientes',dataCliente,config)
            setClientes([...clientes,data])
            return data
        } catch (error) {
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    return (
        <ClienteContext.Provider
            value={{
                clientes,
                obtenerClientesByUsuario,
                crearClienteByUsuario
            }}
        >
            {children}
        </ClienteContext.Provider>
    )
}

export {
    ClienteContext
}

export default ClienteProvider;
