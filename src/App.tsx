import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "./context/Global";
import { generateP5Canvas } from "./functions/GenerateP5Canvas";
import { waitForElement } from "./functions/WaitElements";

function App() {
  const { definirLarguraDoCanvas, sketch, definirAlturaDoCanvas, definirTamanhoDaLinha, definirConstanteDaGravidade } = useContext(GlobalContext)

  // Referências dos inputs
  const tamanhoDaLinhaSliderRef = useRef<HTMLInputElement>(null)
  const constanteDaGravidadeSliderRef = useRef<HTMLInputElement>(null)

  //Estado dos inputs
  const [tamanhoDaLinhaSliderState, setTamanhoDaLinha] = useState(250)
  const [constanteDaGravidadeSliderState, setConstanteDaGravidade] = useState(0.1)
  const [simulationIsRunning, setIsRunning] = useState(false)

  const tamanhoDaLinhaEmMetros = tamanhoDaLinhaSliderState * 0.0002645833

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
        <div className="flex align-middle justify-center font-semibold text-2xl items-center pt-2" style={{ height: '5%' }}>
          <h1 className="">Pendulum SImulator</h1>
        </div>
        <div className="flex" style={{ height: '95%' }}>
          <main className="w-4/5 h-full bg-Steel-Blue box-border p-2" id="simulator" />

          <aside className="w-1/5 h-full  p-2 flex-col">
            <h2 className="text-xl text-center font-medium">Parâmetros</h2>

            <div
              className="flex flex-col justify-between"
              style={{ height: '93%' }}
            >
              {/* Tamanho da linha */}
              <div className="mt-2">
                <label
                  htmlFor="tamanho-da-linha"
                  className="block mb-2 text-md font-normal text-gray-900 dark:text-white"
                >
                  Tamanho da linha
                </label>

                <input
                  id="tamanho-da-linha"
                  type="range"
                  min="100"
                  step={10}
                  max="500"
                  defaultValue={tamanhoDaLinhaEmMetros}
                  value={tamanhoDaLinhaSliderState}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  ref={tamanhoDaLinhaSliderRef}
                  onMouseUp={() => {
                    if (tamanhoDaLinhaSliderRef.current) {
                      definirTamanhoDaLinha(Number(tamanhoDaLinhaSliderRef.current.value))
                    }
                  }}
                  onChange={
                    event => setTamanhoDaLinha(Number(event.target.value))
                  }
                />
              </div>

              {/* Constante da gravidade*/}
              <div>
                <label
                  htmlFor="constante-da-gravidade"
                  className="block mb-2 text-md font-normal text-gray-900 dark:text-white"
                >
                  Constante da gravidade
                </label>

                <input
                  id="constante-da-gravidade"
                  type="range"
                  min="0.1"
                  step={0.1}
                  max="9.8"
                  value={constanteDaGravidadeSliderState}
                  defaultValue={constanteDaGravidadeSliderState}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  ref={constanteDaGravidadeSliderRef}
                  onMouseUp={() => {
                    if (constanteDaGravidadeSliderRef.current && simulationIsRunning) {
                      definirConstanteDaGravidade(Number(constanteDaGravidadeSliderRef.current.value))
                    }
                  }}
                  onChange={
                    event => setConstanteDaGravidade(Number(event.target.value))
                  }
                />
              </div>

              <div>
                <div className="flex flex-col" style={{ height: '30%' }}>
                  <h2 className="py-1">Dados da simulação:</h2>
                  <p className="py-1">Tamanho da linha: {tamanhoDaLinhaEmMetros.toFixed(3)}m</p>
                  <p className="py-1">Angulo: 10º</p>
                  <p className="py-1">Constante da gravidade: {constanteDaGravidadeSliderState}</p>
                  <p className="py-1">
                    Período do pêndulo: {(2 * Math.PI * Math.sqrt(tamanhoDaLinhaEmMetros / constanteDaGravidadeSliderState)).toFixed(3)}s
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="text-Steel-Blue bg-white hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
                onClick={() => {
                  if (simulationIsRunning) {
                    setIsRunning(false);
                    definirConstanteDaGravidade(0)
                    if (tamanhoDaLinhaSliderRef.current) {
                      definirTamanhoDaLinha(Number(tamanhoDaLinhaSliderRef.current.value))
                    }
                  } else {
                    if (constanteDaGravidadeSliderRef.current) {
                      setIsRunning(true);
                      definirConstanteDaGravidade(Number(constanteDaGravidadeSliderRef.current.value))
                    }
                  }
                }}
              >
                {simulationIsRunning ? 'Parar simulação' : 'Iniciar simulação'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default App
