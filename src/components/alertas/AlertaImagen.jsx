import deniedAccees from '../../assets/undraw_access_denied_re_awnf.svg'

function AlertImage({msgError,imgAlert,msg,wdth,children}) {
  return (
    <div className="max-w-[30rem] flex flex-col items-center mx-auto rounded-lg shadow border px-10 py-10 mt-10">
      <div className="w-full">
        <img 
            src={imgAlert || deniedAccees} 
            alt="imagen de confirmacion"
            className='w-5/6 mx-auto'
        />
      </div>
      <div className="w-full flex flex-col py-5 text-center">
        {
          msgError && <h1 className="font-bold italic text-3xl">Opps, algo salio mal</h1>
        }
          <h1 className="font-bold italic text-2xl">{msg}</h1>
          <p className="text-justify font-semibold text-xl mt-4">{msgError}</p>
      </div>
      {children}
    </div>
  )
}

export default AlertImage;