function SelectForm({callback,name,value,obligatorio,disabled=false,options}) {
    return (
        <div className='flex flex-col gap-1 items-left'>
            <label className='text-lg font-bold tracking-wider italic pl-1'>{name}</label>
            <select
                value={value}
                onChange={(e)=>callback(e.target.value)}
                type='select'
                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                disabled={disabled}
            >
                {
                    options.map((item,i)=>{
                        return <option key={i} value={item.value}>{item.text}</option>
                    })
                }
            </select>
            {obligatorio &&
                <span className='text-red-600 text-sm'>* campo obligatorio</span>
            }
        </div>
    )
  }
  
  export default SelectForm;