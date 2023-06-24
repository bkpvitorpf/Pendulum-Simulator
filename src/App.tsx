import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/Global";
import { generateP5Canvas } from "./functions/GenerateP5Canvas";
import { waitForElement } from "./functions/WaitElements";

function App() {
  const { definirLarguraDoCanvas, sketch, definirAlturaDoCanvas } = useContext(GlobalContext)

  // Executa apenas na primeira vez que a página é carregada
  useEffect(() => {
    //Adiciona um evento para quando a tela mudar de tamanho
    addEventListener('resize', () => {
      definirLarguraDoCanvas(document.querySelector("#simulator")?.clientWidth as number - 16)
      definirAlturaDoCanvas(document.querySelector("#simulator")?.clientHeight as number - 40)
    })

    // Espera a div que contem a simulação aparecer na tela
    waitForElement("#simulator").then(() => {
      // O canvas agora vai ocupar 100% do elemento respeitando o padding
      definirLarguraDoCanvas(document.querySelector("#simulator")?.clientWidth as number - 16)
      definirAlturaDoCanvas(document.querySelector("#simulator")?.clientHeight as number - 40)

      //Gera a simulação
      generateP5Canvas(sketch)
    })
  }, [])

  // Atualiza a página toda vez que algum parâmetro da simulação é alterado
  useEffect(() => {
    generateP5Canvas(sketch)
  }, [sketch])

  return (
    <>
      <div className="w-full h-full flex-col text-white bg-Steel-Blue">
        <div className="flex align-middle justify-center font-semibold text-2xl items-center" style={{ height: '5%' }}>
          <h1 className="">Pendulum SImulator</h1>
        </div>
        <div className="flex" style={{ height: '95%' }}>
          <main className="w-4/5 h-full bg-Steel-Blue box-border p-2" id="simulator">
            Simulador
          </main>
          <aside className="w-1/5 h-full  p-2 flex justify-center">
            {/* Parâmetros
            <button onClick={() => { setTamanhoDaLinha(400) }}>a</button> */}
          </aside>
        </div>
      </div>
    </>
  )
}

export default App
