import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "./context/Global";
import { generateP5Canvas } from "./functions/GenerateP5Canvas";
import { waitForElement } from "./functions/WaitElements";

function App() {
  const { definirLarguraDoCanvas, sketch, definirAlturaDoCanvas, definirTamanhoDaLinha } = useContext(GlobalContext)

  // Referências dos inputs
  const tamanhoDaLinhaSliderRef = useRef<HTMLInputElement>(null)

  //Estado dos inputs
  const [tamanhoDaLinhaSliderState, setTamanhoDaLinha] = useState(100)

  // Executa apenas na primeira vez que a página é carregada
  useEffect(() => {
    //Adiciona um evento para quando a tela mudar de tamanho
    addEventListener('resize', () => {
      definirLarguraDoCanvas(document.querySelector("#simulator")?.clientWidth as number - 16)
      definirAlturaDoCanvas(document.querySelector("#simulator")?.clientHeight as number - 16)
    })

    // Espera a div que contem a simulação aparecer na tela
    waitForElement("#simulator").then(() => {
      // O canvas agora vai ocupar 100% do elemento respeitando o padding
      definirLarguraDoCanvas(document.querySelector("#simulator")?.clientWidth as number - 16)
      definirAlturaDoCanvas(document.querySelector("#simulator")?.clientHeight as number - 16)

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
          <main className="w-4/5 h-full bg-Steel-Blue box-border p-2" id="simulator" />

          <aside className="w-1/5 h-full  p-2 flex-col justify-center items-center">
            <h2 className="text-lg">Parâmetros</h2>

            <div
              className="flex-col items-center"
            >
              {/* Tamanho da linha */}
              <label
                htmlFor="minmax-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Min-max range
              </label>

              <input
                id="minmax-range"
                type="range"
                min="100"
                step={50}
                max="500"
                value={tamanhoDaLinhaSliderState}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                ref={tamanhoDaLinhaSliderRef}
                onMouseUp={(event) => {
                  if (tamanhoDaLinhaSliderRef.current) {
                    definirTamanhoDaLinha(Number(tamanhoDaLinhaSliderRef.current.value))
                  }
                }}
                onChange={
                  event => setTamanhoDaLinha(Number(event.target.value))
                }
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default App
