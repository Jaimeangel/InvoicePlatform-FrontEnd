import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

/* import Alert from "../../components/alert"; */
import InputForm from "../../components/InputForm.jsx";
/* import ButtonForm from "../../components/buttonForm"; */

/* import useAuth from "../../hooks/useAuth"; */

function Login() {

    /* const {setAuth}=useAuth(); */

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    /* const [alert,setAlert]=useState({msg:'',error:false}) */

    const handleSubmit= async (e)=>  {
        e.preventDefault()

        if([email,password].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }

        try {
            const {data} = await axios.post('http://localhost:4000/api/usuarios/login',{
                email,
                password
            })
            localStorage.setItem('tks',data.token)
            setAuth(data)
            window.location.replace("http://localhost:5173/proyectos")
        }catch(error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }


    }

    return (
        <div className='w-[28rem] mx-auto mt-20 px-5 py-10 shadow-lg rounded-2xl border'>
            <div className='w-full'>

                <h2 className='text-center font-bold text-2xl'>Acceder a su cuenta</h2>
                <p className="text-center text-black text-md italic mt-1">Accede a tu cuenta con tu email que usaste para registrarte</p>

                {/* {alert.msg.length!==0 && <Alert alert={alert}/>} */}

                <form onSubmit={handleSubmit}>
                    <InputForm
                        callback={setEmail}
                        typeInput='text'
                        phder='tucorreo@dominio.com'
                        name='Email'
                    />
                    <InputForm
                        callback={setPassword}
                        typeInput='password'
                        name='Password'
                        phder='password'
                    />
                    <button
                        type="submit"
                        className='w-full text-black text-lg tracking-wide font-semibold py-3 rounded-xl hover:bg-slate-100 shadow-md border-2  px-8 mt-5'
                    >
                        Iniciar sesion   
                    </button>
                </form>

                <div className="text-center mt-5">
                    <Link
                        to={'/recover-password'}
                    >
                        <p className="underline">Olvide mi contraseña</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login;