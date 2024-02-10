import { useState } from "react";

import Spinner from '../Spinner'
import AlertImage from '../alertas/AlertaImagen';
import EmailImage from '../../assets/undraw_team_chat_re_vbq1.svg'
import ErrorEnvio from '../../assets/undraw_cancel_re_pkdm.svg'

import EnviarPlataformas from "./EnviarPlataformas";

function ModalEnviarCotizacion({
    closeModal,
    loading,
    error,
    envioExitoso,
    EnviarCotizacion,
    statusMovil,
    setStatusMovil,
    statusEmail,
    setStatusEmail,
    idCotizacionCreada
}){

    return (
        <div className="fixed w-screen h-screen left-0 top-0 bg-gray-300 bg-opacity-60 shadow">
            <div className="relative bg-white max-w-2xl mx-auto rounded-lg px-10 py-5 mt-8">
                <div>
                    {
                        loading &&
                        <div>
                            <h2 className="text-2xl font-semibold italic tracking-wide mb-10">Estamos enviando tu cotizacion</h2>
                            <Spinner/>
                        </div> 
                    }
                    {   envioExitoso &&
                        <div>
                            <h2 className="text-2xl font-semibold italic tracking-wide mb-5">Tu cotizacion fue guardada con exito</h2>
                            <EnviarPlataformas
                                statusMovil={statusMovil}
                                setStatusMovil={setStatusMovil}
                                statusEmail={statusEmail}
                                setStatusEmail={setStatusEmail}
                                idCotizacionCreada={idCotizacionCreada}
                                closeModal={closeModal}
                            />
                        </div> 
                    }
                    {
                        error &&
                        <div className="max-w-xs mx-auto">
                            <AlertImage
                                imgAlert={ErrorEnvio}
                                msgError={'Ocurrio un error en el envio, intentalo nuevamente o en otro momento'}
                            >
                                <div className="w-full flex flex-row gap-2 mt-2">
                                    <button
                                        onClick={EnviarCotizacion} 
                                        className="w-1/2 border border-blue-600 shadow-sm hover:shadow-md font-semibold italic text-xl rounded-md"
                                    >
                                        Volver a enviar
                                    </button>
                                    <button
                                        onClick={closeModal} 
                                        className="w-1/2 border border-blue-600 shadow-sm hover:shadow-md font-semibold italic text-xl rounded-md"
                                    >
                                        Cancelar envio
                                    </button>
                                </div>
                            </AlertImage>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalEnviarCotizacion;
