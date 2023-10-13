import { useContext } from "react";
import { ClienteContext } from "../context/ClienteProvider.jsx";

function useCliente() {
    return useContext(ClienteContext);
}
  
export default useCliente;
