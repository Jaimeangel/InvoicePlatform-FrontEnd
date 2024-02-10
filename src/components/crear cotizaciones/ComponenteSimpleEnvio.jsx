import { useState } from "react";
import AlertaForm from "../alertas/AlertaForm";
import BarraLoader from '../BarraLoader'

function ComponenteSimpleEnvio({tipo,callback,state,setState}){

  const [fail,setFail]=useState(false)
  const [loading,setLoading]=useState(false)

  const handleEnvio = async ()=>{
    setLoading(true)
    setState(false)
    setFail(false)
    try {
      await callback()
      setState(true)
      setLoading(false)
    } catch (error) {
      setFail(true)
      setLoading(false)

      setTimeout(() => {
        setFail(false)
      }, 4000);
    }
  }
  
  return (
    <div className="w-full flex flex-col rounded-lg px-5 py-5 shadow-md border mb-5">

      <div className="w-full flex flex-row justify-between">
        
        <h2 className="text-xl font-semibold italic tracking-wide">{`Enviar via ${tipo}`}</h2>

        <div>
          {
            state ? 
              <button
                disabled={true}
                className='flex flex-row justify-between gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-green-400 border-green-500 px-5'
              >
                Envio exitoso
              </button>
            :
              <button
                onClick={handleEnvio}
                className='flex flex-row justify-between gap-4 items-center  text-black text-lg tracking-wide font-semibold rounded-md border bg-yellow-400 border-yellow-500 hover:shadow-md px-5'
              >
                Enviar
              </button>
          }

        </div>

      </div>

      {
        loading && <BarraLoader/>
      }


      {state && 
        <AlertaForm alert={{
            msg:`su cotizacion fue enviada con exito via ${tipo}`,
            error:false
          }}
        />
      }

      {fail && 
        <AlertaForm alert={{
            msg:`no fue posible enviar su cotizacion via ${tipo}`,
            error:true
          }}
        />
      }
    </div>
  )
}

export default ComponenteSimpleEnvio;
