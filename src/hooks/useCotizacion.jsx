import { useContext } from "react";
import { CotizacionContext } from "../context/CotizacionProvider";

function useCotizacion() {
  return useContext(CotizacionContext);
}

export default useCotizacion;