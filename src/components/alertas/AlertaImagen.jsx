import deniedAccees from '../../assets/undraw_access_denied_re_awnf.svg'

function AlertImage({msgError,imgAlert,msg,wdth,children,noBorder=false}) {
  return (
    <div className={` ${noBorder ?'shadow border ':'' }max-w-[30rem] flex flex-col items-center mx-auto rounded-lg`}>
      <div className="w-full">
        <img 
          src={imgAlert || deniedAccees} 
          alt="imagen de confirmacion"
          className='w-4/6 mx-auto'
        />
      </div>
      <div className="w-full flex flex-col py-2 text-center">
        {
          msgError && <h1 className="font-bold italic text-3xl">Opps, algo salio mal</h1>
        }
        {
          msgError && <p className="text-justify font-semibold text-xl mt-4">{msgError}</p>
        }
        {
          !msgError && <h1 className="font-bold italic text-2xl">{msg}</h1>
        }
      </div>
      {children}
    </div>
  )
}

export default AlertImage;