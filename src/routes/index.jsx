//react router
import {createBrowserRouter} from 'react-router-dom'
//ruta protegida para layaout dasboard
import ProtectRoute from '../layaout/ProtectRoute.jsx'
//cotizaciones
import CotizacionesDashboard from '../pages/cotizaciones/CotizacionesDashboard.jsx'
import CrearCotizacion from '../pages/cotizaciones/CrearCotizacion.jsx'
import VisualizarCotizaciones from '../pages/cotizaciones/VisualizarCotizaciones.jsx'
import VisualizarClientes from '../pages/clientes/VisualizarClientes.jsx'
//login
import Login from '../pages/autenticacion/login.jsx'
//configuraciones
import PanelConfiguraciones from '../pages/configuraciones/PanelConfiguraciones.jsx'
import ConfigPerfil from '../components/perfil/ConfigPerfil.jsx'
import ConfigCotizacion from '../components/perfil/ConfigCotizacion.jsx'

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
              element:<VisualizarCotizaciones/>
            }
          ]
        },
        {
          path:'configuraciones',
          element:<PanelConfiguraciones/>,
          children:[
            {
              path:'data-perfil',
              element:<ConfigPerfil/>
            },
            {
              path:'configuracion-cotizacion',
              element:<ConfigCotizacion/>
            }
          ]
        },
        {
          path:'clientes',
          element:<VisualizarClientes/>
        }
      ]
    },
    {
      path:'login',
      element:<Login/>,
    }
  ])

  export default router;