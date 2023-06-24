import P5 from "p5";
import { useEffect, useRef, useState } from "react";
import { generateP5Canvas } from "./functions/GenerateP5Canvas";
import { waitForElement } from "./functions/WaitElements";

function App() {
  const [tamanhoDaLinha, setTamanhoDaLinha] = useState(250)
  // Tamanho inicial do canvas
  const canvasWidth = useRef(585)
  const canvasHeight = useRef(525)

  // Variáveis  da simulação
  const angulo = useRef(0) // Ângulo do pêndulo
  const origem = useRef<P5.Vector | null>(null) // Ponto de origem do braço do pêndulo
  const massa = useRef<P5.Vector | null>(null) // Coordenadas da massa do pêndulo
  const velocidadeAngular = useRef(0)
  const aceleraçãoAngular = useRef(0)
  const constanteDaGravidade = useRef(0) // [0.1;1]

  // Executa apenas na primeira vez que a página é carregada
  useEffect(() => {
    //Adiciona um evento para quando a tela mudar de tamanho
    addEventListener('resize', () => {
      canvasWidth.current = document.querySelector("#simulator")?.clientWidth as number - 16

      console.log(tamanhoDaLinha)

      //Gera a simulação chamando uma função e passando os parâmetros correspondentes
      generateP5Canvas({
        angulo: angulo.current,
        canvasHeight: canvasHeight.current,
        canvasWidth: canvasWidth.current,
        constanteDaGravidade: constanteDaGravidade.current,
        massa: massa.current,
        tamanhoDaLinha: tamanhoDaLinha,
        origem: origem.current,
        aceleraçãoAngular: aceleraçãoAngular.current,
        velocidadeAngular: velocidadeAngular.current
      })
    })

    // Espera a div que contem a simulação aparecer na tela
    waitForElement("#simulator").then(element => {
      // O canvas agora vai ocupar 100% do elemento respeitando o padding
      canvasWidth.current = element.clientWidth - 16
      canvasHeight.current = element.clientHeight - 40

      //Gera a simulação chamando uma função e passando os parâmetros correspondentes
      generateP5Canvas({
        angulo: angulo.current,
        canvasHeight: canvasHeight.current,
        canvasWidth: canvasWidth.current,
        constanteDaGravidade: constanteDaGravidade.current,
        massa: massa.current,
        tamanhoDaLinha: tamanhoDaLinha,
        origem: origem.current,
        aceleraçãoAngular: aceleraçãoAngular.current,
        velocidadeAngular: velocidadeAngular.current
      })
    })
  }, [])

  useEffect(() => {
    generateP5Canvas({
      angulo: angulo.current,
      canvasHeight: canvasHeight.current,
      canvasWidth: canvasWidth.current,
      constanteDaGravidade: constanteDaGravidade.current,
      massa: massa.current,
      tamanhoDaLinha: tamanhoDaLinha,
      origem: origem.current,
      aceleraçãoAngular: aceleraçãoAngular.current,
      velocidadeAngular: velocidadeAngular.current
    })
  }, [tamanhoDaLinha])

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
