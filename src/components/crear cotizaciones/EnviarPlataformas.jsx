import ComponenteSimpleEnvio from "./ComponenteSimpleEnvio";
import useCotizacion from "../../hooks/useCotizacion";

function EnviarPlataformas({
  statusMovil,
  setStatusMovil,
  idCotizacionCreada,
  closeModal,
  statusEmail,
  setStatusEmail
}){

  const {
    enviarCotizacionMovil,
    enviarCotizacionEmail
  }=useCotizacion()

  const handleEnviarMovil = async ()=>{
    const formData = new FormData();
    formData.append('ID',JSON.stringify(idCotizacionCreada))
    try {
      await enviarCotizacionMovil(formData)
    } catch (error) {
      return error
    }
  }

  const handleEnviarEmail = async ()=>{
    const formData = new FormData();
    formData.append('ID',JSON.stringify(idCotizacionCreada))
    try {
      await enviarCotizacionEmail(formData)
    } catch (error) {
      console.log('aqui paso')
      console.log(error.message)
      return error
    }
  }

  return (
    <div className="w-full flex flex-col">
      <ComponenteSimpleEnvio
        tipo='WhatsApp'
        callback={handleEnviarMovil}
        state={statusMovil}
        setState={setStatusMovil}
      />

      <ComponenteSimpleEnvio
        tipo='Email'
        callback={handleEnviarEmail}
        state={statusEmail}
        setState={setStatusEmail}
      />

      <button
        onClick={closeModal}
        className='w-full text-black text-lg tracking-wide font-semibold rounded-md border bg-yellow-400 border-yellow-500 hover:shadow-md px-5 shadow'
      >
        cerrar modal
      </button>
    </div>
  )
}

export default EnviarPlataformas;
