import { criarTopico, criarSubtopico, carregar_topico } from './scripts-banco.js';
import { exibirTopicos, exibirSubtopicos } from './scripts-top-subtop.js';
var container = document.getElementById("container");
export function abrirModalAdd(e, tipo, id) {
    const root = document.documentElement;
    root.style.setProperty('--cor-modal', document.getElementById("opcoes2").style.color);
    var modal = document.getElementById("modal2");
    const x = window.innerWidth - e.clientX + 10; // Coordenada X em relação à janela
    const y = e.clientY + 10; // Coordenada Y em relação à janela
    modalarea.style.display = "flex";
    modal.style.top = `${y}px`;
    modal.style.right = `${x}px`;
    modal.style.display = "flex";
    modal.setAttribute("data-tipo", tipo);
    modal.setAttribute("data-id", id);
    container.style.filter = "blur(2px)";
    document.getElementById("input-modal2").placeholder = `Adicione o ${tipo}`;
}

var inputmodal = document.getElementById("input-modal2");
var modal = document.getElementById("modal2");
var modalarea = document.getElementById("modal2-area");
modalarea.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) {
        container.style.filter = "";
        modalarea.style.display = "none";
        inputmodal.value = "";
    } else {
        console.log('Clique foi dentro do modal');
    }
})

var modalbtn = document.getElementById("modal2-btn");
modalbtn.addEventListener("click", async (e) => {
    const tipo = modal.getAttribute("data-tipo");
    const id = modal.getAttribute("data-id");
    const nome = document.getElementById("input-modal2").value;
    if (tipo == "tópico") {
        try {            
            await criarTopico(nome, id);
            await exibirTopicos(id);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log('errraço')
        }

    } else if (tipo == "subtópico") {
        try {            
            await criarSubtopico(nome, id);
            await exibirSubtopicos(id);
            container.style.filter = "";
            modalarea.style.display = "none";
            inputmodal.value = "";
        } catch (er) {
            console.log('errraço')
        }

    }

});