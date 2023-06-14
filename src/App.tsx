function App() {

  return (
    <>
      <div className="w-full h-full flex-col">
        <div className="flex align-middle justify-center bg-red-400 items-center" style={{ height: '5%' }}>
          <h1 className="">Pendulum SImulator</h1>
        </div>
        <div className="flex" style={{ height: '95%' }}>
          <main className="w-4/5 h-full bg-gray-600 box-border p-2">
            Simulador
          </main>
          <aside className="w-1/5 h-full bg-red-200 p-2">
            Parâmetros
          </aside>
        </div>
      </div>
    </>
  )
}

export default App
