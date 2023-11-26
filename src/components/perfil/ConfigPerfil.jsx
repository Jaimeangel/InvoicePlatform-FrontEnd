import useAuth from '../../hooks/useAuth'
//componentes
import DataEmpresa from './DataEmpresa';

function ConfigPerfil(){
    const {auth}=useAuth()
    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">

            <div className='flex flex-row items-center gap-10'>
                <div className='w-[8rem] h-[8rem] border shadow-sm rounded-full'>

                </div>
                <div>
                    <p className='font-bold text-2xl'>
                        {
                            auth.tipo === 'empresa' && `${auth.razonSocial}`
                        }
                        {
                            auth.tipo === 'persona' && `${auth.nombres} ${auth.apellidos}`
                        }
                    </p>
                    <p className='font-semibold text-lg italic tracking-wider'>
                        {`${auth.email}`}
                    </p>
                </div>

            </div>
            
            {
                auth.tipo === 'empresa' && <DataEmpresa data={auth}/>
            }
        </div>
    )
}

export default ConfigPerfil;
