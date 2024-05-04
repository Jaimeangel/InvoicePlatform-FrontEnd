import { useContext } from "react";
import { CrearCotizacionContext } from "../context/CrearCotizacionProvider";

function useCrearCotizacion() {
    return useContext(CrearCotizacionContext)
}

export default useCrearCotizacion;
