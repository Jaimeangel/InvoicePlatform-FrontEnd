function AlertaForm({alert}){
    const {msg,error}=alert;
    return (
        <div className={`${error ?'bg-red-100 border border-red-600':'bg-blue-300 border border-blue-500'} w-full rounded-md font-bold text-lg text-center mt-3 px-4`}>
            <p className="italic tracking-wider text-black">{msg}</p>
        </div>
    )
}

export default AlertaForm;