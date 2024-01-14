//font awesome
import { faReceipt ,faFloppyDisk,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//componentes
import AlertImage from '../alertas/AlertaImagen';
import DocumentoPDFCotizacion from './DocumentoPDFCotizacion';
//imagen
import EmailImage from '../../assets/undraw_team_chat_re_vbq1.svg'
//React PDFs
import { 
    PDFViewer,
    usePDF
} from '@react-pdf/renderer';
//Hooks
import useAuth from '../../hooks/useAuth';
import useCotizacion from '../../hooks/useCotizacion';

function EnviarCotizacion({cotizacion,cliente,dataEnvio}){
    const {
        auth
    }=useAuth()

    const {
        subirPdfToBucket
    } = useCotizacion()


    const Docu = 
        <DocumentoPDFCotizacion
            cotizacion={cotizacion}
            cliente={cliente}
            auth={auth}
        />
    const [documento] = usePDF({ document: Docu });

    const cargarPdfBucket = async ()=>{
        if(documento.blob != null){
            const formData = new FormData();
            formData.append('pdf',documento.blob)
            formData.append('contacto',JSON.stringify(dataEnvio))
            formData.append('cotizacion',JSON.stringify(cotizacion))
            formData.append('cliente',JSON.stringify(cliente))
            try {
                const response = await subirPdfToBucket(formData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
/*         <div className="w-full flex flex-col bg-white rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2  text-2xl font-bold tracking-wide">Enviar cotizacion</h1>
            <h1 className="mt-2 mb-2 text-xl font-semibold italic tracking-wide">Visualiza tu documento de cotizacion que sera enviado a tu cliente. Despues puedes guardarlo y enviarlo.</h1>
            
            <div className='w-full mt-10'>
                <AlertImage
                    imgAlert={EmailImage}
                >
                    <button className='w-full flex flex-row justify-center mt-4 gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border  bg-blue-400 border-blue-500 hover:shadow-md'>
                        <FontAwesomeIcon icon={faReceipt} style={{color: "#000000",}}/>
                        <p className="first-letter:uppercase">visualizar cotizacion</p>
                    </button>
                </AlertImage>
            </div>

        </div> */
        <div className="w-full h-screen flex flex-col bg-white rounded-lg px-10 py-6 shadow-md">
{/*             <PDFViewer className='w-full h-screen'>
                <DocumentoPDFCotizacion
                    cotizacion={cotizacion}
                    cliente={cliente}
                    auth={auth}
                />
            </PDFViewer> */}
            <h1>aqui pdf</h1>
            <button
                onClick={cargarPdfBucket}
            >
                SUBIR
            </button>
        </div>

    )
}

export default EnviarCotizacion;

{/*                 <div className='w-1/2 flex flex-col gap-5 pl-5'>
                    <button className='w-full flex flex-row justify-center gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-green-400 border-green-500 hover:shadow-md'>
                        <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#000000",}}/>
                        <p className="first-letter:uppercase">guardar</p>
                    </button>
                    <button className='w-full flex flex-row justify-center gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-yellow-400 border-yellow-500 hover:shadow-md'>
                        <FontAwesomeIcon icon={faPaperPlane} style={{color: "#000000",}}/>
                        <p className="first-letter:uppercase">guardar y enviar</p>
                    </button>
                </div> */}