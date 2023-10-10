function DatosCliente() {
  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow">
      <h1 className="mb-5 text-2xl font-bold">Datos del cliente</h1>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 flex flex-col gap-2 px-5">
          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Tipo de documento:</p>
            <p className="text-lg">Cotizacion</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="frutas">Cliente</label>
            <select id="frutas" name="fruta" className="w-full border rounded-md px-3">
              <option value="manzana">Manzana</option>
              <option value="banana">Banana</option>
              <option value="uva">Uva</option>
              <option value="naranja">Naranja</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="frutas">Contacto</label>
            <select id="frutas" name="fruta" className="w-full border rounded-md px-3">
              <option value="manzana">Manzana</option>
              <option value="banana">Banana</option>
              <option value="uva">Uva</option>
              <option value="naranja">Naranja</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="frutas">Responsables de cotizacion</label>
            <select id="frutas" name="fruta" className="w-full border rounded-md px-3">
              <option value="manzana">Manzana</option>
              <option value="banana">Banana</option>
              <option value="uva">Uva</option>
              <option value="naranja">Naranja</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-2 px-5">
        <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Numero:</p>
            <p className="text-lg">numeracion automatica</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Fecha de elaboracion:</p>
            <input type="date" className="border rounded-md px-3"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatosCliente;
