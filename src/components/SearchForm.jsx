//components
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'



function SearchForm({list,onChangeCliente,cliente}) {
    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')

    //segun tipo de empresa devuelve un formato
    const nombreSegunTipo=(item)=>{
        if(item.tipo === 'empresa'){
            return item.razonSocial;
        }else if(item.tipo ==='persona'){
            return item.nombreComercial || `${item.nombres} ${item.apellidos}`
        }
    }

    //filtro
    const listFiltered =
        query === ''
        ? list
        : list.filter((item) =>
                nombreSegunTipo(item)
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))

            || item.identificacion.toString().includes(query.toString())
            )

    //persitencia de informacion de cliente
    useEffect(()=>{
        if(Object.keys(cliente).length !== 0  || cliente === ''){
            setSelected(cliente)
        }
    },[])
    
    //Guardar cliente seleccionado
    useEffect(()=>{
        onChangeCliente(selected)
    },[selected])

    return (
        <div className="w-11/12">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="relative w-full border rounded-md px-3 pt-3 pb-2 shadow-sm  cursor-default overflow-hidden  bg-white text-left  sm:text-sm">
                        <Combobox.Input
                            placeholder='Buscar cliente'
                            className={`${selected && 'read-only:bg-red-500' } w-full outline-none border-none text-sm leading-5 text-gray-900 focus:ring-0`}
                            displayValue={(item) => nombreSegunTipo(item)}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                            {
                                selected === '' 
                                ?   
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                                    </Combobox.Button>
                                : 
                                    <button
                                        onClick={()=>setSelected("")}  
                                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                                    >
                                        <FontAwesomeIcon icon={faX} />
                                    </button>
                            }
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {
                                listFiltered.length === 0 && query !== '' 
                                ? 
                                    (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            No hay coincidencias.
                                        </div>
                                    ) 
                                : 
                                    (
                                        listFiltered.map((item) => (
                                            <Combobox.Option
                                                key={item._id}
                                                className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-slate-100  text-gray-900' : 'text-gray-900'
                                                }`
                                                }
                                                value={item}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate first-letter:uppercase ${
                                                                selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                        >
                                                            {`${nombreSegunTipo(item)}   -  ${item.identificacion}`}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? 'text-teal-600' : 'text-teal-600'
                                                                }`}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))

                                    )
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchForm;