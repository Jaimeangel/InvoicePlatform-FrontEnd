//react router
import {createBrowserRouter} from 'react-router-dom'
//dasboard
import Dashboard from '../layaout/Dashboard.jsx'
//Cotizaciones
import CotizacionesDashboard from '../pages/CotizacionesDashboard.jsx'

const router=createBrowserRouter([
    {
      path:'dashboard',
      element:<Dashboard/>,
      children:[
        {
          path:'cotizaciones',
          element:<CotizacionesDashboard/>,
          children:[
            {
              path:'crear-cotizacion',
              element:<h1>Creando cotizaciones</h1>
            },
            {
              path:'ver-cotizaciones',
              element:<h1>Viendo las cotizaciones</h1>
            }
          ]
        }
      ]
    }
  ])

  export default router;