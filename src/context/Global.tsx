import P5 from "p5";
import { ReactNode, createContext, useCallback, useState } from "react";

type P5SketchProps = {
    angulo: number
    origem: P5.Vector | null
    massa: P5.Vector | null
    tamanhoDaLinha: number
    alturaDoCanvas: number
    larguraDoCanvas: number
    constanteDaGravidade: number
    aceleraçãoAngular: number
    velocidadeAngular: number
}

type ContextStateProps = {
    sketch: P5SketchProps
    definirLarguraDoCanvas: (novaLargura: number) => void
    definirAlturaDoCanvas: (novaAltura: number) => void
}

type ContextProviderProps = {
    children: ReactNode
}

const sketch = () => { null }
const p5 = new P5(sketch)

const initialStateValues: ContextStateProps = {
    sketch: {
        angulo: p5.PI / 4,
        origem: p5.createVector(),
        massa: p5.createVector(),
        tamanhoDaLinha: 250,
        alturaDoCanvas: 525,
        larguraDoCanvas: 585,
        constanteDaGravidade: 0,
        aceleraçãoAngular: 0,
        velocidadeAngular: 0,
    },
    definirLarguraDoCanvas: () => { null },
    definirAlturaDoCanvas: () => { null }
}

export const GlobalContext = createContext<ContextStateProps>(initialStateValues)

export const GlobalContextProvider = ({ children }: ContextProviderProps) => {
    const [estado, definirEstado] = useState(initialStateValues.sketch)

    const definirLarguraDoCanvas = useCallback((novaLargura: number) => {
        definirEstado(estadoAnterior => ({
            ...estadoAnterior,
            larguraDoCanvas: novaLargura
        }))
    }, [])

    const definirAlturaDoCanvas = useCallback((novaAltura: number) => {
        definirEstado(estadoAnterior => ({
            ...estadoAnterior,
            alturaDoCanvas: novaAltura
        }))
    }, [])

    return (
        < GlobalContext.Provider value={{ sketch: estado, definirLarguraDoCanvas, definirAlturaDoCanvas }} >
            {children}
        </  GlobalContext.Provider>
    )
}