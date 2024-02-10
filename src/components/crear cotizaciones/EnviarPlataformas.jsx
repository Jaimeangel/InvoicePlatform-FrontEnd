import ComponenteSimpleEnvio from "./ComponenteSimpleEnvio";
import useCotizacion from "../../hooks/useCotizacion";

function EnviarPlataformas({statusMovil,setStatusMovil,idCotizacionCreada,closeModal}){
  const {
    enviarCotizacionMovil
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

  return (
    <div className="w-full flex flex-col">
      <ComponenteSimpleEnvio
        tipo='WhatsApp'
        callback={handleEnviarMovil}
        state={statusMovil}
        setState={setStatusMovil}
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
