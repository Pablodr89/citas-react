function Error({mensaje}) {
  return (
    <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mt-3 rounded-md">
        {mensaje}
    </div>
  )
}

export default Error