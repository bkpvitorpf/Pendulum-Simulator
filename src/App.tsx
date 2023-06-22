import P5 from "p5";
import { useEffect } from "react";

function App() {

  // Executa apenas na primeira vez que a página é carregada
  useEffect(() => {

    // Cria o rascunho que será usado como base
    const sketch = (p5: P5) => {
      // Método de configuração
      p5.setup = () => {
        const canvas = p5.createCanvas(585, 525);
        // Diz onde o canvas será desenhado
        canvas.parent("simulator")
      };

      p5.draw = () => {
        if (p5.mouseIsPressed) {
          p5.fill(0);
        } else {
          p5.fill(255);
        }
        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
      }
    };

    // Remove todos os canvas que existem na tela antes de desenhar um novo
    if (document.querySelectorAll('canvas')) {
      document.querySelectorAll('canvas')?.forEach(canvas => canvas.remove())
    }

    // Cria o ambiente que vai suportar a biblioteca p5
    new P5(sketch)

    //Busca o canvas desenhado atualmente na tela para mudar o estilo dele
    const onScreenCanvas = document.querySelector('canvas')

    if (onScreenCanvas) {
      onScreenCanvas.className = '0px'
    }
  }, [])

  return (
    <>
      <div className="w-full h-full flex-col text-white bg-Steel-Blue">
        <div className="flex align-middle justify-center font-semibold text-2xl items-center" style={{ height: '5%' }}>
          <h1 className="">Pendulum SImulator</h1>
        </div>
        <div className="flex" style={{ height: '95%' }}>
          <main className="w-4/5 h-full bg-gray-600 box-border p-2" id="simulator">
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
