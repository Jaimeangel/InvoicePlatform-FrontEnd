//react router
import {createBrowserRouter} from 'react-router-dom'
//ruta protegida para layaout dasboard
import ProtectRoute from '../layaout/ProtectRoute.jsx'
//cotizaciones
import CotizacionesDashboard from '../pages/cotizaciones/CotizacionesDashboard.jsx'
import CrearCotizacion from '../pages/cotizaciones/CrearCotizacion.jsx'
//login
import Login from '../pages/autenticacion/login.jsx'

const router=createBrowserRouter([
    {
      path:'dashboard',
      element:<ProtectRoute/>,
      children:[
        {
          path:'cotizaciones',
          element:<CotizacionesDashboard/>,
          children:[
            {
              path:'crear-cotizacion',
              element:<CrearCotizacion/>
            },
            {
              path:'ver-cotizaciones',
              element:<h1>Viendo las cotizaciones</h1>
            }
          ]
        }
      ]
    },
    {
      path:'login',
      element:<Login/>,
    }
  ])

  export default router;