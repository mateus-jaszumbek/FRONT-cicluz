import { carregar_est_areas } from './scripts-banco.js';
import { exibirTopicos } from './scripts-top-subtop.js';
function criarOpcao(item) {
    var divopcao = document.createElement('div');
    divopcao.classList.add('opcao', 'item-conteudo', `div-item-${item.est}`);
    divopcao.addEventListener("click", (e) => {
        exibirTopicos(item.id);
    })

    var divconteudo = document.createElement('div');
    divconteudo.classList.add('opcao-conteudo', 'zoomIn', 'item-conteudo');

    var divicone = document.createElement('i');
    divicone.classList.add('fa', item.icone);

    var divtexto = document.createElement('div');
    divtexto.textContent = item.nome;

    divconteudo.appendChild(divicone);
    divconteudo.appendChild(divtexto);

    divopcao.appendChild(divconteudo);

    return divopcao;
}

function adicionarOpcao(resultado) {
    let opcoes = resultado;
    let circulo = document.getElementById(opcoes[0].est == "ter" ? "maior" : opcoes[0].est == "ser" ? "central" : opcoes[0].est == "eu" ? "menor" : "fixo");
    resultado.forEach((item, index) => {
        var div = criarOpcao(item);
        var grau = (360 / opcoes.length) * (index + 1);
        const raioCirculo = parseFloat(circulo.getAttribute("r"));
        const tamanhoBorda = parseFloat(circulo.getAttribute('stroke-width'));
        let tamanhoItem = tamanhoBorda * 0.7;
        let distancia = raioCirculo + (tamanhoItem / 2);
        div.style.transformOrigin = `center ${distancia}px`;
        div.style.transform = `translate(0px, ${-raioCirculo}px) rotate(${grau}deg)`;
        let divOpcoes = document.getElementById("opcoes")
        let cor = "white"
        if(opcoes[0].est == "base") {
            tamanhoItem = raioCirculo * 0.5; 
            div.style.transformOrigin = `center ${distancia*0.98}px`;
            div.style.transform = `translate(0px, ${-(raioCirculo/1.35)}px) rotate(${grau}deg)`;
            cor = "lightgray"
        } 

        const root = document.documentElement;
        root.style.setProperty('--tamanho-item', `${tamanhoItem}px`);

        var conteudo = div.firstChild;
        conteudo.style.width = `${tamanhoItem}px`;
        conteudo.style.height = `${tamanhoItem}px`;
        conteudo.style.transform = `rotate(-${grau}deg)`;
        conteudo.style.color = cor;
        conteudo.firstChild.style.fontSize = `${tamanhoItem * 0.3}px`;
        conteudo.firstChild.classList.add("item-conteudo")
        conteudo.lastChild.style.fontSize = `${tamanhoItem * 0.17}px`
        conteudo.lastChild.classList.add("item-conteudo")
        if(opcoes[0].est == "base") { 
            conteudo.classList.add("itens-fixo")
        }
        divOpcoes.appendChild(div);       

    })

}

export class Circulo {
    constructor(cor, id, tipo, preenchimento = false) {
        this.cor = cor;
        this.id = id;
        this.tipo = tipo;
        this.SVGCONTAINER = document.getElementById("svgContainer");
        this.ALTURA_SVGCONTAINER = this.SVGCONTAINER.clientHeight / 2;
        this.preenchimento = preenchimento;
        this.CONTORNO_MAIOR = this.ALTURA_SVGCONTAINER * 0.4;
        this.CONTORNO_PADRAO = this.ALTURA_SVGCONTAINER * 0.07;
        this.CONTORNO_MENOR = this.ALTURA_SVGCONTAINER * 0.04;
    }

    desenhar() {
        const CIRCULO = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const RAIO_MAIOR = this.ALTURA_SVGCONTAINER - (this.CONTORNO_PADRAO / 2);
        const RAIO_CENTRAL = (RAIO_MAIOR - (this.CONTORNO_PADRAO / 2)) - (this.CONTORNO_PADRAO * 1.5);
        const RAIO_MENOR = (RAIO_CENTRAL - (this.CONTORNO_PADRAO / 2)) - (this.CONTORNO_PADRAO * 1.5);
        const RAIO_FIXO = (RAIO_MENOR - (this.CONTORNO_PADRAO / 2)) - (this.CONTORNO_PADRAO * 1.5);
        const raio = this.id == "maior" ? RAIO_MAIOR : this.id == "central" ? RAIO_CENTRAL : this.id == "menor" ? RAIO_MENOR : RAIO_FIXO;

        const propriedades = { "contorno": this.CONTORNO_PADRAO, "raio": raio };
        CIRCULO.setAttribute("cx", this.ALTURA_SVGCONTAINER);
        CIRCULO.setAttribute("cy", this.ALTURA_SVGCONTAINER);
        CIRCULO.setAttribute("r", propriedades.raio);
        CIRCULO.setAttribute("stroke-width", propriedades.contorno);
        CIRCULO.setAttribute("stroke", this.cor);
        CIRCULO.classList = `circulo ${this.id}`;
        CIRCULO.setAttribute("fill", this.preenchimento ? this.cor : "none");
        CIRCULO.setAttribute("id", this.id);

        CIRCULO.addEventListener('mouseover', (e) => {
            const id = e.target.getAttribute('id');
            if (e.fromElement.classList.contains('item-conteudo')) {
                return;
            }
            switch (id) {
                case "maior":
                    alterarTamanho("circuloMaiorExpandido");
                    document.getElementById("logo-svg").style.scale = "0.6";
                    break;
                case "central":
                    alterarTamanho("circuloCentralExpandido");
                    document.getElementById("logo-svg").style.scale = "0.6";
                    break;
                case "menor":
                    alterarTamanho("circuloMenorExpandido");
                    document.getElementById("logo-svg").style.scale = "0.6";
                    break;
                case "fixo":
                    alterarTamanho("circuloFixoExpandido");
                    document.getElementById("logo-svg").style.scale = "0.7";
            }

        })

        if (CIRCULO.getAttribute('id') == "maior") {
            CIRCULO.addEventListener('mouseleave', (e) => {
                if (!e.toElement.classList.contains('item-conteudo')) {
                    alterarTamanho("padrao");
                    document.getElementById("logo-svg").style.removeProperty("scale");
                }

            })
        }
        document.getElementById('teste').addEventListener('mouseleave', (e) => { alterarTamanho("padrao"); document.getElementById("logo-svg").style.removeProperty("scale") });


        this.SVGCONTAINER.appendChild(CIRCULO);




    }
}

export function criarCirculos(circulos) {

    circulos.forEach(circulo => {
        circulo.desenhar();
    });
    organizarCirculoCentro();
}

export function redimensionarCirculos(circulos) {

    document.getElementById("svgContainer").innerHTML = "";
    criarCirculos(circulos);
}

export function alterarTamanho(tipoEvento) {
    const SVGCONTAINER = document.getElementById("svgContainer");
    const ALTURA_SVGCONTAINER = SVGCONTAINER.clientHeight / 2;
    const CONTORNO_MAIOR = ALTURA_SVGCONTAINER * 0.4;
    const CONTORNO_PADRAO = ALTURA_SVGCONTAINER * 0.07;
    const CONTORNO_MENOR = ALTURA_SVGCONTAINER * 0.05;
    switch (tipoEvento) {
        case "circuloMaiorExpandido":
            alterarTamanho_circuloMaiorExpandido(ALTURA_SVGCONTAINER, { CONTORNO_MAIOR: CONTORNO_MAIOR, CONTORNO_PADRAO: CONTORNO_PADRAO, CONTORNO_MENOR: CONTORNO_MENOR });
            break;
        case "circuloCentralExpandido":
            alterarTamanho_circuloCentralExpandido(ALTURA_SVGCONTAINER, { CONTORNO_MAIOR: CONTORNO_MAIOR, CONTORNO_PADRAO: CONTORNO_PADRAO, CONTORNO_MENOR: CONTORNO_MENOR });
            break;
        case "circuloMenorExpandido":
            alterarTamanho_circuloMenorExpandido(ALTURA_SVGCONTAINER, { CONTORNO_MAIOR: CONTORNO_MAIOR, CONTORNO_PADRAO: CONTORNO_PADRAO, CONTORNO_MENOR: CONTORNO_MENOR });
            break;
        case "circuloFixoExpandido":
            alterarTamanho_circuloFixoExpandido(ALTURA_SVGCONTAINER, { CONTORNO_MAIOR: CONTORNO_MAIOR, CONTORNO_PADRAO: CONTORNO_PADRAO, CONTORNO_MENOR: CONTORNO_MENOR });
            break;
        case "padrao":
            alterarTamanho_circuloPadrao(ALTURA_SVGCONTAINER, { CONTORNO_MAIOR: CONTORNO_MAIOR, CONTORNO_PADRAO: CONTORNO_PADRAO, CONTORNO_MENOR: CONTORNO_MENOR });
            break;
    }
}

function organizarCirculoCentro() {
    document.getElementById("opcaoCentral").innerHTML = "";
    let opcoes = [1,2,3,4,5,6];
    let circulo = document.getElementById("fixo");
    opcoes.forEach((item, index) => {
        var div = document.createElement('div');
        div.classList.add('circulos-pequenos-centro');
        var grau = (360 / opcoes.length) * (index + 1);
        const raioCirculo = parseFloat(circulo.getAttribute("r"));
        const tamanhoBorda = parseFloat(circulo.getAttribute('stroke-width'));
        let tamanhoItem = raioCirculo * 0.2;
        let distancia = raioCirculo + (tamanhoItem / 2);
        div.style.transformOrigin = `center ${distancia*0.8}px`;
        div.style.transform = `translate(0px, ${-(raioCirculo/1.3)}px) rotate(${grau}deg)`;


        let divOpcoes = document.getElementById("opcaoCentral");
        const root = document.documentElement;
        root.style.setProperty('--tamanho-item-centro', `${tamanhoItem}px`);

        
        divOpcoes.appendChild(div);       

    })
}

export async function alterarTamanho_circuloMaiorExpandido(ALTURA_SVGCONTAINER, contornos) {
    const RAIO_MAIOR = ALTURA_SVGCONTAINER - (contornos.CONTORNO_MAIOR / 2);
    const RAIO_CENTRAL = (RAIO_MAIOR - (contornos.CONTORNO_MAIOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_MENOR = (RAIO_CENTRAL - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_FIXO = (RAIO_MENOR  - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const circulos = document.getElementsByClassName("circulo");

    [...circulos].forEach(i => {
        const id = i.getAttribute('id');
        const contorno = id == "maior" ? contornos.CONTORNO_MAIOR : contornos.CONTORNO_MENOR;
        const raio = id == "maior" ? RAIO_MAIOR : id == "central" ? RAIO_CENTRAL : id == "menor" ? RAIO_MENOR : RAIO_FIXO;
        i.setAttribute("r", raio);
        i.setAttribute("stroke-width", contorno);
    });

    document.getElementById('opcoes').innerHTML = '';
    organizarCirculoCentro();
    try {
        var resultado = await carregar_est_areas("ter");
        adicionarOpcao(resultado);
    } catch (er) {
        console.log("erro")
        console.log(er);
    }



}

export async function alterarTamanho_circuloCentralExpandido(ALTURA_SVGCONTAINER, contornos) {
    const RAIO_MAIOR = ALTURA_SVGCONTAINER - (contornos.CONTORNO_MENOR / 2);
    const RAIO_CENTRAL = (RAIO_MAIOR - (contornos.CONTORNO_MAIOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_MENOR = (RAIO_CENTRAL - (contornos.CONTORNO_MAIOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_FIXO = (RAIO_MENOR - (contornos.CONTORNO_MENOR / 2) ) - (contornos.CONTORNO_MENOR * 1.5);
    const circulos = document.getElementsByClassName("circulo");

    [...circulos].forEach(i => {
        const id = i.getAttribute('id');
        const contorno = id == "central" ? contornos.CONTORNO_MAIOR : contornos.CONTORNO_MENOR;
        const raio = id == "maior" ? RAIO_MAIOR : id == "central" ? RAIO_CENTRAL : id == "menor" ? RAIO_MENOR : RAIO_FIXO;
        i.setAttribute("r", raio);
        i.setAttribute("stroke-width", contorno);
    });
    document.getElementById('opcoes').innerHTML = '';
    organizarCirculoCentro();
    try {
        var resultado = await carregar_est_areas("ser");
        adicionarOpcao(resultado);
    } catch (er) {
        console.log("erro")
        console.log(er);
    }
}

export async function alterarTamanho_circuloMenorExpandido(ALTURA_SVGCONTAINER, contornos) {

    const RAIO_MAIOR = ALTURA_SVGCONTAINER - (contornos.CONTORNO_MENOR / 2);
    const RAIO_CENTRAL = (RAIO_MAIOR - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_MENOR = (RAIO_CENTRAL - (contornos.CONTORNO_MAIOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_FIXO = (RAIO_MENOR - (contornos.CONTORNO_MAIOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const circulos = document.getElementsByClassName("circulo");

    [...circulos].forEach(i => {
        const id = i.getAttribute('id');
        const contorno = id == "menor" ? contornos.CONTORNO_MAIOR : contornos.CONTORNO_MENOR;
        const raio = id == "maior" ? RAIO_MAIOR : id == "central" ? RAIO_CENTRAL : id == "menor" ? RAIO_MENOR : RAIO_FIXO;
        i.setAttribute("r", raio);
        i.setAttribute("stroke-width", contorno);
    });
    document.getElementById('opcoes').innerHTML = '';
    organizarCirculoCentro();
    try {
        var resultado = await carregar_est_areas("eu");
        adicionarOpcao(resultado);
    } catch (er) {
        console.log("erro")
        console.log(er);
    }
}

export async function alterarTamanho_circuloFixoExpandido(ALTURA_SVGCONTAINER, contornos) {
    const RAIO_MAIOR = ALTURA_SVGCONTAINER - (contornos.CONTORNO_PADRAO / 2);
    const RAIO_CENTRAL = (RAIO_MAIOR - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_MENOR = (RAIO_CENTRAL - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const RAIO_FIXO = (RAIO_MENOR - (contornos.CONTORNO_MENOR / 2)) - (contornos.CONTORNO_MENOR * 1.5);
    const circulos = document.getElementsByClassName("circulo");

    [...circulos].forEach(i => {
        const id = i.getAttribute('id');
        const contorno = id == "fixo" ? contornos.CONTORNO_MENOR : contornos.CONTORNO_MENOR;
        const raio = id == "maior" ? RAIO_MAIOR : id == "central" ? RAIO_CENTRAL : id == "menor" ? RAIO_MENOR : RAIO_FIXO;
        i.setAttribute("r", raio);
        i.setAttribute("stroke-width", contorno);
    });

    document.getElementById('opcoes').innerHTML = '';
    document.getElementById('opcaoCentral').innerHTML = '';
    try {
        var resultado = await carregar_est_areas("base");
        adicionarOpcao(resultado);
    } catch (er) {
        console.log("erro")
        console.log(er);
    }
}

export function alterarTamanho_circuloPadrao(ALTURA_SVGCONTAINER, contornos) {
    const RAIO_MAIOR = ALTURA_SVGCONTAINER - (contornos.CONTORNO_PADRAO / 2);
    const RAIO_CENTRAL = (RAIO_MAIOR - (contornos.CONTORNO_PADRAO / 2)) - (contornos.CONTORNO_PADRAO * 1.5);
    const RAIO_MENOR = (RAIO_CENTRAL - (contornos.CONTORNO_PADRAO / 2)) - (contornos.CONTORNO_PADRAO * 1.5);
    const RAIO_FIXO = (RAIO_MENOR - (contornos.CONTORNO_PADRAO / 2)) - (contornos.CONTORNO_PADRAO * 1.5);
    const circulos = document.getElementsByClassName("circulo");

    [...circulos].forEach(i => {
        const id = i.getAttribute('id');
        const contorno = id == "menor" ? contornos.CONTORNO_MAIOR : contornos.CONTORNO_MENOR;
        const raio = id == "maior" ? RAIO_MAIOR : id == "central" ? RAIO_CENTRAL : id == "menor" ? RAIO_MENOR : RAIO_FIXO;
        i.setAttribute("r", raio);
        i.setAttribute("stroke-width", contornos.CONTORNO_PADRAO);
    });

    document.getElementById('opcoes').innerHTML = '';
    organizarCirculoCentro();
}