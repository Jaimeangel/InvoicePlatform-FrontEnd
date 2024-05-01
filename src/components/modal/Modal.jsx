function Modal({
    children,
    open
}){

    return (
        <>
            { open && 
                <div className="fixed w-screen h-screen left-0 top-0 bg-gray-300 bg-opacity-60 shadow overflow-auto py-10">
                    {children}
                </div>
            }
        </>
    )
}

export default Modal;