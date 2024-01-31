//font awesome
import { faReceipt ,faFloppyDisk,faPaperPlane,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//componentes
import DocumentoPDFCotizacion from './DocumentoPDFCotizacion';
import ModalEnviarCotizacion from './ModalEnviarCotizacion';
import Spinner from '../Spinner';
// helpers
import FormatoCotizacionDB from '../../helpers/FormatoCotizacionDB';
//React PDFs
import { 
    PDFViewer,
    usePDF
} from '@react-pdf/renderer';
//Hooks
import useAuth from '../../hooks/useAuth';
import useCotizacion from '../../hooks/useCotizacion';
import { useEffect, useState } from 'react';

function EnviarCotizacion({cotizacion,cliente,dataEnvio}){
    const {
        auth
    }=useAuth()

    const {
        subirPdfToBucket
    } = useCotizacion()

    const [loading,setLoading]=useState(false)
    const [modalEnvio,setModalEnvio]=useState(false)
    const [statusEnvio,setStatusEnvio]=useState(false)
    const [error,setError]=useState(false)

    const Docu = 
        <DocumentoPDFCotizacion
            cotizacion={cotizacion}
            cliente={cliente}
            auth={auth}
        />
    const [documento] = usePDF({ document: Docu });

    const cargarPdfBucket = async ()=>{
        if(documento.blob != null){
            const dataCotizacion = FormatoCotizacionDB({
                dataContacto:dataEnvio,
                dataCotizacion:cotizacion,
                dataCliente:cliente,
                dataUser:auth
            })
            
            const formData = new FormData();
            formData.append('pdf',documento.blob)
            formData.append('cotizacion',JSON.stringify(dataCotizacion))
            formData.append('cliente',JSON.stringify(cliente))
            try {
                const response = await subirPdfToBucket(formData)
                console.log(response)
                setStatusEnvio(true)
            } catch (error) {
                console.log(error)
                errorEnvio()
            }
        }
    }

    const enviarCotizacion =()=>{
        setModalEnvio(true)
        cargarEnvioCotizacion()
        setError(false)
        cargarPdfBucket()
    }

    const closeModal =()=>{
        setModalEnvio(false)
        setError(false)
    }

    const envioExitoso =()=>{
        setLoading(false)
    }

    const cargarEnvioCotizacion =()=>{
        setLoading(true)
    }

    const errorEnvio=()=>{
        setError(true)
        setLoading(false)
    }

    useEffect(()=>{
        if(statusEnvio){
            envioExitoso()
        }
    },[statusEnvio])

    return(
        <div className="w-full flex flex-col bg-white rounded-lg px-10 py-6 shadow-md">

            <div className='flex flex-row justify-between'>
                <h1 className="mt-2  text-2xl font-bold tracking-wide">Enviar cotizacion</h1>
                {
                    !statusEnvio?
                    <button
                        onClick={enviarCotizacion} 
                        className='flex flex-row justify-between gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-yellow-400 border-yellow-500 hover:shadow-md px-5'
                    >
                        <FontAwesomeIcon icon={faPaperPlane} style={{color: "rgb(0, 0, 0)",}}/>
                        <p className="first-letter:uppercase">guardar y enviar</p>
                    </button>:
                    <button
                        className='flex flex-row justify-between gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-green-400 border-green-500 hover:shadow-md px-5'
                    >
                        <FontAwesomeIcon icon={faCircleCheck} style={{color: "rgb(0, 0, 0)",}}/>
                        <p className="first-letter:uppercase">Cotizacion enviada con exito</p>
                    </button>
                }
            </div>
            {
                modalEnvio && 
                <ModalEnviarCotizacion
                    closeModal={closeModal}
                    loading={loading}
                    error={error}
                    envioExitoso={statusEnvio}
                    EnviarCotizacion={enviarCotizacion}
                />
            }
            <h1 className="mt-2 mb-2 text-xl font-semibold italic tracking-wide">Visualiza tu documento de cotizacion que sera enviado a tu cliente. Despues puedes guardarlo y enviarlo.</h1>

            {
                documento.blob === null ? 
                <div className='max-w-xl mx-auto'>
                    <h1 className='font-bold text-2xl tracking-wider'>cargando cotizacion ....</h1>
                    <Spinner/>
                </div>
                :
                <PDFViewer className='w-full h-screen mt-5'>
                        <DocumentoPDFCotizacion
                            cotizacion={cotizacion}
                            cliente={cliente}
                            auth={auth}
                        />
                </PDFViewer> 
            }
        </div>
    )
}

export default EnviarCotizacion;