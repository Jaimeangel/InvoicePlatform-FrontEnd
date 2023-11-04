import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ModalEliminarItem({eliminarItem}) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const eliminarProducto = () => {
      eliminarItem()
      closeModal()
    };

  return (
    <>
        <button
          type="button"
          onClick={openModal}
          className="bg-red-400 px-2 py-1 rounded-md mx-auto outline-none"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>


      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden border rounded-md  bg-white p-10 text-left align-middle shadow-xl transition-all">
                    <div className='w-full flex flex-col items-center gap-3'>
                        <h1 className='font-bold text-2xl'>¿Desea eliminar este item?</h1>
                        <div className='flex flex-row gap-5'>
                            <button
                                onClick={eliminarProducto} 
                                className='bg-red-500 px-5 text-black text-lg tracking-wide font-bold py-1 rounded-md shadow border outline-none'
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={closeModal} 
                                className='bg-green-500 px-5 text-black text-lg tracking-wide font-bold py-1 rounded-md shadow border outline-none'
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalEliminarItem
