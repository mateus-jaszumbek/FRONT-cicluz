import { Circulo, criarCirculos, redimensionarCirculos } from './scripts-circulo.js';
import { exibirLista, removerItem } from './scripts-top-subtop.js';

function listarOutraPagina() {
  let lb = document.getElementById('categoria-base');
  let le = document.getElementById('categoria-eu');
  let ls = document.getElementById('categoria-ser');
  let lt = document.getElementById('categoria-ter');
  lb.children[1].innerHTML = '';
  le.children[1].innerHTML = '';
  ls.children[1].innerHTML = '';
  lt.children[1].innerHTML = '';

    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));

    
    if (listaRecuperada) {
        listaRecuperada.forEach(i => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'divescolhas-item';
            itemDiv.style.backgroundColor = i.est == "eu" ? "#00DB80" : i.est == "ser" ? "#DB000F" : i.est == "ter" ? "#8B308C" : "#b9b9b9";
            const span = document.createElement('span');
            span.innerHTML = `<span class="escolha-area">${i.est_area}</span> <span class="escolha-conteudo"><i>${i.nome_topico == undefined ? "" : `${i.nome_topico} |`}</i> <b>${i.nome}</b></span>`

            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-xmark';
            icon.addEventListener('click', () => {
                itemDiv.remove();
                removerItem(i.id);                
            });

            itemDiv.appendChild(span);
            itemDiv.appendChild(icon);

            let container = i.est == "eu" ? le.children[1] : i.est == "ser" ? ls.children[1] : i.est == "ter" ? lt.children[1] : lb.children[1];
            container.appendChild(itemDiv);

        })

    }
}


document.getElementById("divescolhas-btn").addEventListener("click", (e) => {
  listarOutraPagina();

  document.getElementById("teste2").style.display = "none";
  document.getElementById("teste5").style.display = "flex";
})

document.getElementById("divnav-btn").addEventListener("click", (e) => {
  document.getElementById("teste5").style.display = "none";
  document.getElementById("teste2").style.display = "flex";
})

document.addEventListener("DOMContentLoaded", () => {
  let circulos = [
    new Circulo("green", "maior", "padrao"),
    new Circulo("yellow", "central", "padrao"),
    new Circulo("blue", "menor", "padrao"),
    new Circulo("white", "fixo", "padrao", true)
  ];
  criarCirculos(circulos);
});

window.addEventListener("resize", () => {
  let circulos = [
    new Circulo("green", "maior", "padrao"),
    new Circulo("yellow", "central", "padrao"),
    new Circulo("blue", "menor", "padrao"),
    new Circulo("blue", "fixo", "padrao")
  ];
  redimensionarCirculos(circulos);
});

exibirLista();











