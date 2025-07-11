 /* INÍCIO DO JAVASCRIPT */
 let personagens = [];
 let secoes = [];
 let secaoIdCounter = 0; 

 function adicionarPersonagem() {
     const input = document.getElementById('novo-personagem-input');
     const nome = input.value.trim();
     if (nome && !personagens.includes(nome)) {
         personagens.push(nome);
         input.value = '';
         renderizarPersonagens();
         atualizarSelectPersonagens(); 
     }
 }

 function removerPersonagem(nome) {
     personagens = personagens.filter(p => p !== nome);
     renderizarPersonagens();
     atualizarSelectPersonagens(); 
 }

 function renderizarPersonagens() {
     const lista = document.getElementById('personagens-lista');
     lista.innerHTML = '';
     personagens.forEach(p => {
         const div = document.createElement('div');
         div.className = 'personagem-item';
         div.innerHTML = `
             <span>${p}</span>
             <button class="remove-btn btn" onclick="removerPersonagem('${p}')">Remover</button>
         `;
         lista.appendChild(div);
     });
 }

 function adicionarSecao() {
     secaoIdCounter++;
     const novaSecao = {
         id: `secao-${secaoIdCounter}`,
         titulo: `Seção ${secaoIdCounter}`,
         falas: []
     };
     secoes.push(novaSecao);
     renderizarSecoes();
 }

 function removerSecao(id) {
     secoes = secoes.filter(s => s.id !== id);
     renderizarSecoes();
 }

 function atualizarTituloSecao(id, novoTitulo) {
     const secao = secoes.find(s => s.id === id);
     if (secao) {
         secao.titulo = novoTitulo;
     }
 }

 function adicionarFala(secaoId) {
     const secao = secoes.find(s => s.id === secaoId);
     if (secao) {
         secao.falas.push({ personagem: '', texto: '' });
         renderizarSecoes(); 
     }
 }

 function removerFala(secaoId, falaIndex) {
     const secao = secoes.find(s => s.id === secaoId);
     if (secao) {
         secao.falas.splice(falaIndex, 1);
         renderizarSecoes();
     }
 }

 function atualizarFalaPersonagem(secaoId, falaIndex, personagemNome) {
     const secao = secoes.find(s => s.id === secaoId);
     if (secao && secao.falas[falaIndex]) {
         secao.falas[falaIndex].personagem = personagemNome;
     }
 }

 function atualizarFalaTexto(secaoId, falaIndex, texto) {
     const secao = secoes.find(s => s.id === secaoId);
     if (secao && secao.falas[falaIndex]) {
         secao.falas[falaIndex].texto = texto;
     }
 }

 function criarSelectPersonagens(secaoId, falaIndex, personagemSelecionado) {
     const select = document.createElement('select');
     select.onchange = (e) => atualizarFalaPersonagem(secaoId, falaIndex, e.target.value);

     // Opção padrão
     const defaultOption = document.createElement('option');
     defaultOption.value = '';
     defaultOption.textContent = 'Selecione um personagem';
     select.appendChild(defaultOption);

     personagens.forEach(p => {
         const option = document.createElement('option');
         option.value = p;
         option.textContent = p;
         if (p === personagemSelecionado) {
             option.selected = true;
         }
         select.appendChild(option);
     });
     return select;
 }

 function atualizarSelectPersonagens() {
     secoes.forEach(secao => {
         secao.falas.forEach((fala, index) => {
             const selectElement = document.getElementById(`select-${secao.id}-${index}`);
             if (selectElement) {
                 const selectedValue = selectElement.value; 
                 const newSelect = criarSelectPersonagens(secao.id, index, selectedValue);
                 selectElement.parentNode.replaceChild(newSelect, selectElement);
                 newSelect.id = `select-${secao.id}-${index}`; 
             }
         });
     });
 }

 function renderizarSecoes() {
     const lista = document.getElementById('secoes-lista');
     lista.innerHTML = '';

     secoes.forEach(secao => {
         const divSecao = document.createElement('div');
         divSecao.className = 'secao';
         divSecao.id = secao.id;

         divSecao.innerHTML = `
             <h3>
                 <input type="text" value="${secao.titulo}" onchange="atualizarTituloSecao('${secao.id}', this.value)" style="width: calc(100% - 120px);">
                 <button class="remove-btn btn" onclick="removerSecao('${secao.id}')">Remover Seção</button>
             </h3>
             <div id="falas-${secao.id}"></div>
             <button class="btn" onclick="adicionarFala('${secao.id}')">Adicionar Fala</button>
         `;
         lista.appendChild(divSecao);

         const divFalas = document.getElementById(`falas-${secao.id}`);
         secao.falas.forEach((fala, index) => {
             const divFala = document.createElement('div');
             divFala.className = 'fala-item';

             const selectPersonagem = criarSelectPersonagens(secao.id, index, fala.personagem);
             selectPersonagem.id = `select-${secao.id}-${index}`; 

             const textareaFala = document.createElement('textarea');
             textareaFala.placeholder = 'Fale aqui...';
             textareaFala.value = fala.texto;
             textareaFala.oninput = (e) => atualizarFalaTexto(secao.id, index, e.target.value);
             textareaFala.rows = 2; 

             const removerFalaBtn = document.createElement('button');
             removerFalaBtn.className = 'remove-btn btn';
             removerFalaBtn.textContent = 'Remover Fala';
             removerFalaBtn.onclick = () => removerFala(secao.id, index);

             divFala.appendChild(selectPersonagem);
             divFala.appendChild(textareaFala);
             divFala.appendChild(removerFalaBtn);
             divFalas.appendChild(divFala);
         });
     });
 }

 function gerarRoteiro() {
     let roteiroHTML = '';

     secoes.forEach(secao => {
         roteiroHTML += `---\n`;
         roteiroHTML += `### ${secao.titulo}\n`;
         roteiroHTML += `---\n`;
         secao.falas.forEach(fala => {
             if (fala.personagem && fala.texto) {
                 roteiroHTML += `          **${fala.personagem.toUpperCase()}**\n`;
                 roteiroHTML += ` ${fala.texto}\n\n`;
             }
         });
     });

     document.getElementById('roteiro-output').textContent = roteiroHTML;
 }

 function copiarRoteiro() {
    const roteiroOutput = document.getElementById('roteiro-output');
    const texto = roteiroOutput.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        const sucesso = document.execCommand('copy');
        if (sucesso) {
            alert('Roteiro copiado para a área de transferência!');
        } else {
            alert('Falha ao copiar o roteiro.');
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar o roteiro.');
    }

    document.body.removeChild(textarea);
}


 document.addEventListener('DOMContentLoaded', () => {
     renderizarPersonagens();
     renderizarSecoes();
 });
 /* FIM DO JAVASCRIPT */