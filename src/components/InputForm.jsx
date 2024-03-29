function InputForm({callback,typeInput,phder,name,value,obligatorio,disabled=false}) {
  return (
    <div className='flex flex-col gap-1 items-left'>
        <label className='text-lg font-bold tracking-wider italic pl-1'>{name}</label>
        <input
            value={value}
            onChange={(e)=>callback(e.target.value)} 
            type={typeInput}
            placeholder={phder}
            className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
            disabled={disabled}
        />
        {obligatorio &&
          <span className='text-red-600 text-sm'>* campo obligatorio</span>
        }
    </div>
  )
}

export default InputForm;
