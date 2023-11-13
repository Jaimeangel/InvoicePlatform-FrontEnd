import { useEffect,useState } from "react";

//hook de autorizacion
import useAuth from "../hooks/useAuth.jsx";

//Components
import Spinner from "../components/spinner";
import AlertImage from "../components/alertas/AlertaImagen.jsx";

//Layaout principal que renderiza
import Dashboard from "./Dashboard.jsx";

function ProtectRoute() {
    //Hooks
    const {auth,alert}=useAuth()

    //Cargando
    const [load,setLoad]=useState(true)

    //Alerta
    const [alertAuth,setAlertAuth]=useState({msg:'',err:false})

    
    useEffect(()=>{
        if(Object.keys(auth).length !==0 || alert.err===true){
          setLoad(false)
        }

        if(alert.err && Object.keys(auth).length ===0){
            if(alert.msg){
                setAlertAuth({
                    msg:alert.msg,
                    err:true
                })
            }
        }
    },[alert,auth])

    return (
        <div className="w-full">
            {
                load 
                    ? 
                        (
                            <Spinner/>
                        )
                    :
                        (
                            alert.err
                                ?
                                    (
                                        <div className="mt-16">
                                            <AlertImage
                                                msgError={alertAuth.msg}
                                            />
                                        </div>
                                    )
                                :
                                    (
                                        <Dashboard/>   
                                    ) 
                        ) 
            }
        </div>
    )
}

export default ProtectRoute;
