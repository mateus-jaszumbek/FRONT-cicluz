import { carregar_est_area, carregar_topicos, deletarTopico, carregar_subtopicos, carregar_topico, deletarSubtopico, deletarSubtopicos } from './scripts-banco.js';
import { abrirModalAdd } from './scripts-modal.js';


export function exibirLista() {
    document.getElementById('divescolhas-items').innerHTML = '';
    let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));

    
    if (listaRecuperada) {
        if(listaRecuperada.length > 0) {
            document.getElementById("divescolhas").style.display = "flex";   
        };
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

            const container = document.getElementById('divescolhas-items');
            container.appendChild(itemDiv);

        })

    }

}

    function listarItem(item) {
        let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
        if (listaRecuperada) {
            listaRecuperada.push(item);
            sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));
        } else {
            sessionStorage.setItem('minhaLista', JSON.stringify([item]));
        }
        exibirLista();

    }

    export function removerItem(id) {
        let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
        listaRecuperada = listaRecuperada.filter(i => {
            return i.id !== id;
        });
        sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));   
        if(listaRecuperada.length == 0) {
            document.getElementById("divescolhas").style.display = "none";    
        }
        exibirLista();
    }

    function removerSubitems(id) {
        let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
        listaRecuperada = listaRecuperada.filter(i => {
            return i.id_topico !== id;
        });
        sessionStorage.setItem('minhaLista', JSON.stringify(listaRecuperada));   
        if(listaRecuperada.length == 0) {
            document.getElementById("divescolhas").style.display = "none";    
        }
        exibirLista();
    }

    function estaNaLista(id) {
        let listaRecuperada = JSON.parse(sessionStorage.getItem('minhaLista'));
        if(listaRecuperada) {
            return listaRecuperada.filter(i => i.id == id).length    
        }
        return false;
    }

    function criarItemTopicoESubtopico(item, tipo) {
        const caixaOpcoesItem = document.createElement('div');
        caixaOpcoesItem.classList.add('caixa-opcoes-item', 'item');
        caixaOpcoesItem.setAttribute("data-id", item.id);

        const itemTextElement = document.createElement('span');
        itemTextElement.textContent = item.nome;

        const iconElement = document.createElement('i');
        iconElement.classList.add('btn-excluir-item-topico', "fa", "fa-trash");
        iconElement.setAttribute('aria-hidden', 'true');


        iconElement.addEventListener("click", async (e) => {
            if (tipo == "tópico") {
                try {
                    caixaOpcoesItem.remove();
                    await deletarTopico(item.id)
                    .then(async() => {
                        await deletarSubtopicos(item.id);
                    });
                    
                    
                    removerItem(item.id);
                    removerSubitems(item.id);
                    document.getElementById("opcoes3").style.display = "none";
                } catch (error) {
                    console.error('Erro ao deletar tópico:', error);
                }
            } else {
                try {
                    await deletarSubtopico(item.id);
                    caixaOpcoesItem.remove();
                    // await exibirSubtopicos(item.id_topico);
                } catch (error) {
                    console.error('Erro ao deletar subtópico:', error);
                }
            }

        });


        const anotherIconElement = document.createElement('i');
        anotherIconElement.classList.add('btn-listar-item', "fa", estaNaLista(item.id) ? 'fa-solid' : 'fa-regular', "fa-circle-check");
        anotherIconElement.setAttribute('aria-hidden', 'true');

        anotherIconElement.addEventListener("click", async (e) => {
            let objeto = { categoria: "teste", assunto: "teste", topico: "teste", subtopico: "teste", idtopico: "teste", idsubtopico: "teste" }
            if (e.target.classList.contains("fa-regular")) {
                e.target.classList.remove("fa-regular");
                e.target.classList.add("fa-solid");
                listarItem(item);

            } else {
                e.target.classList.remove("fa-solid");
                e.target.classList.add("fa-regular");
                removerItem(item.id)
            }


        });

        const caixaIcones = document.createElement('div');
        caixaIcones.classList.add('caixa-icones');


        caixaOpcoesItem.appendChild(itemTextElement);
        caixaIcones.appendChild(anotherIconElement);
        caixaIcones.appendChild(iconElement);

        caixaOpcoesItem.appendChild(caixaIcones);
        return caixaOpcoesItem;
    }

    function criarTituloTopicoESubtopico(item, tipo) {
        // Cria a div principal
        const tituloItem = document.createElement('div');
        tituloItem.classList.add('caixa-opcoes-item', "titulo");

        // Cria o elemento de título do tópico
        const topicoTituloElement = document.createElement('span');
        topicoTituloElement.classList.add('topico-caixa-opcoes');
        topicoTituloElement.id = 'titulo-topico-tipo';
        topicoTituloElement.textContent = item.est_id;

        // Cria a div para o título e o botão
        const divTituloElement = document.createElement('div');
        divTituloElement.classList.add('divtitulo-caixa-opcoes');

        // Cria o elemento de título
        const tituloElement = document.createElement('div');
        tituloElement.classList.add('titulo-caixa-opcoes');

        // Cria o ícone do título
        const topicoIconeElement = document.createElement('i');
        topicoIconeElement.id = 'titulo-topico-icone';
        topicoIconeElement.classList.add('fa', item.icone, 'item-conteudo');

        // Cria o nome do título
        const topicoNomeElement = document.createElement('span');
        topicoNomeElement.id = 'titulo-topico-nome';
        topicoNomeElement.textContent = item.nome;

        // Cria o botão
        const btnTopicoElement = document.createElement('span');
        btnTopicoElement.id = 'btntopico';
        btnTopicoElement.classList.add('btntopico', 'fa', 'fa-circle-plus');

        btnTopicoElement.addEventListener("click", (e) => {
            abrirModalAdd(e, tipo, item.id);
        })

        // Adiciona os elementos à estrutura
        tituloElement.appendChild(topicoIconeElement);
        tituloElement.appendChild(topicoNomeElement);
        divTituloElement.appendChild(tituloElement);
        divTituloElement.appendChild(btnTopicoElement);
        tituloItem.appendChild(topicoTituloElement);
        tituloItem.appendChild(divTituloElement);

        return tituloItem;

    }



    export async function exibirSubtopicos(id) {
        let caixaSubtopico = document.getElementById("opcoes3");
        caixaSubtopico.innerHTML = "";
        let topico = await carregar_topico(id);
        caixaSubtopico.style.color = document.getElementById("opcoes2").style.color;
        let titulo = criarTituloTopicoESubtopico(topico[0], "subtópico");
        titulo.addEventListener("mouseleave", (e) => {

            if (!(document.getElementById("modal2-area").contains(e.toElement))) {
                document.getElementById("opcoes3").style.display = "none";
                document.getElementById("modal2").style.display = "none";
                document.getElementById("input-modal2").value = "";
            }
        })
        let subtopicos = await carregar_subtopicos(id);
        caixaSubtopico.appendChild(titulo);
        subtopicos.forEach(i => {
            let item = criarItemTopicoESubtopico(i, "subtópico");
            document.getElementById("opcoes3").appendChild(item);
            item.addEventListener("mouseleave", (e) => {
                console.log(e.toElement);
                if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("caixa-opcoes-item").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement))) {
                    document.getElementById("opcoes3").style.display = "none";
                    document.getElementById("modal2").style.display = "none";
                    document.getElementById("input-modal2").value = "";
                }
            });
        });
    }

    export async function exibirTopicos(id) {
        let caixaTopico = document.getElementById("opcoes2")
        caixaTopico.innerHTML = "";
        let est = await carregar_est_area(id);
        caixaTopico.style.color = est[0].est == "eu" ? "#00DB80" : est[0].est == "ser" ? "#DB000F" : est[0].est == "ter" ? "#8B308C" : "#b9b9b9";
        let titulo = criarTituloTopicoESubtopico(est[0], "tópico");

        titulo.addEventListener("mouseleave", (e) => {
            if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement))) {
                document.getElementById("opcoes2").style.display = "none";
                document.getElementById("opcoes3").style.display = "none";
                document.getElementById("modal2").style.display = "none";
                document.getElementById("logo").style.display = "block";
                document.getElementById("input-modal2").value = "";
            }
        })

        titulo.addEventListener("mouseenter", (e) => {
            document.getElementById("opcoes3").style.display = "none";
        })

        let topicos = await carregar_topicos(id)
        document.getElementById("opcoes2").appendChild(titulo);
        topicos.forEach(i => {
            let item = criarItemTopicoESubtopico(i, "tópico");
            document.getElementById("opcoes2").appendChild(item);
            item.addEventListener("mouseleave", (e) => {
                if (!(document.getElementById("container-caixa-opcoes").contains(e.toElement) || document.getElementById("modal2-area").contains(e.toElement)) )  {
                    document.getElementById("opcoes2").style.display = "none";
                    document.getElementById("opcoes3").style.display = "none";
                    document.getElementById("modal2").style.display = "none";
                    document.getElementById("logo").style.display = "block";
                    document.getElementById("input-modal2").value = "";
                }
            });

            item.addEventListener("mouseenter", async (e) => {
                // let subtopicos = await carregar_subtopicos(i.id);

                exibirSubtopicos(i.id);

                document.getElementById("opcoes3").style.display = "block";
                document.getElementById("opcoes3").style.color = gerarRGBAleatorio();
            })
        })
        document.getElementById("logo").style.display = "none";
        caixaTopico.style.display = "block";


    }


    function gerarRGBAleatorio() {
        // Gera valores aleatórios para cada canal de cor (R, G, B)
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Retorna a string no formato RGB
        return `rgb(${r}, ${g}, ${b})`;
    }

