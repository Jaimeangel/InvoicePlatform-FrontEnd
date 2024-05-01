import Modal from "./Modal"
import FormCreateCliente from '../cliente/FormCreateCliente'

function ModalDataCliente({
    children,
    open,
    close
}){
  return (
    <>
        <Modal open={open}>
            <FormCreateCliente close={close}/>
        </Modal>
        {children}
    </>
  )
}

export default ModalDataCliente
