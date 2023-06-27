import P5 from 'p5';

type P5SketchProps = {
    origem: P5.Vector | null
    massa: P5.Vector | null
    tamanhoDaLinha: number
    alturaDoCanvas: number
    larguraDoCanvas: number
    constanteDaGravidade: number
    aceleraçãoAngular: number
    velocidadeAngular: number
}

export const generateP5Canvas = ({ alturaDoCanvas, larguraDoCanvas, massa, origem, tamanhoDaLinha, constanteDaGravidade, aceleraçãoAngular, velocidadeAngular }: P5SketchProps) => {
    // Remove todos os canvas do p5.js que existem na tela antes de desenhar um novo
    if (document.querySelectorAll('canvas')) {
        document.querySelectorAll('canvas')?.forEach(canvas => canvas.remove())
    }

    let angulo = 0.174533// 10º

    // Cria o rascunho que será usado como base
    const sketch = (p5: P5) => {
        // Método de configuração
        p5.setup = () => {
            origem = p5.createVector((larguraDoCanvas / 2), 0)
            massa = p5.createVector()
            // tamanhoDaLinha = 250 // 100 <= linha <= 500

            const canvas = p5.createCanvas(larguraDoCanvas, alturaDoCanvas);
            // Diz onde o canvas será desenhado
            canvas.parent("simulator")
        };

        p5.draw = () => {
            p5.background(0)
            //p5.background(0,18,71); // Apaga o canvas

            // Calculando a posição da massa do pêndulo
            if (massa && origem) {
                massa.x = tamanhoDaLinha * p5.sin(angulo) + origem.x
                massa.y = tamanhoDaLinha * p5.cos(angulo) + origem.y
            }

            //Calculando a força que causa a aceleração angular
            const forcaDoPendulo = constanteDaGravidade * p5.sin(angulo)

            //Movimento do pêndulo

            aceleraçãoAngular = (-1 * forcaDoPendulo) / tamanhoDaLinha // Calcula a aceleração angular com base na força da gravidade e no tamanho do braço do ângulo
            velocidadeAngular += aceleraçãoAngular // A velocidade do ângulo aumenta conforme a aceleração
            angulo += velocidadeAngular

            // Desenhando o corpo do pendulo
            p5.stroke(255) // Cor da linha do pêndulo
            p5.strokeWeight(8) // Largura da linha em pixels
            p5.fill(157) // Cor do pêndulo

            if (origem && massa) {
                p5.line(origem.x, origem.y, massa.x, massa.y) // Posição onde será desenhada a linha, da origem até o centro da massa
                p5.circle(massa.x, massa.y, 64) // Desenha a massa do pêndulo, tem como parâmetros as coordenadas (x,y) e o raio do círculo
            }
        }
    };

    // Cria o ambiente que vai suportar a biblioteca p5
    new P5(sketch)
}