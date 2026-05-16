const SUPABASE_URL = "https://nlcojreygwzqszupeouw.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_tUHZto1U02A1r437FyB91w_XhaHkmHG";    

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const containerAlunos = document.querySelector('#alunos');


if (containerAlunos) {
    listarAlunosNoPainel();
}

async function listarAlunosNoPainel() {
    try {
        
        const { data: listaAlunos, error } = await supabaseClient
            .from('alunos')
            .select('*');

        if (error) throw error;

        
        containerAlunos.innerHTML = '<h2>Alunos ativos</h2>';

        if (listaAlunos.length === 0) {
            containerAlunos.innerHTML += '<p>Nenhum aluno cadastrado no momento.</p>';
            return;
        }

        
        listaAlunos.forEach(aluno => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="identidade">
                    <div class="dados-alunos">
                        <strong class="nome">nome: ${aluno.name || 'Não informado'}</strong>
                        <span class="matricula">
                            matricula: <span class="id-matricula">${aluno.matricula || '---'}</span>
                        </span>
                        <span class="serie">
                            serie: <span class="id-turma">${aluno.serie || '---'}</span>
                        </span>
                    </div>
                    <div>
                        <button type="button" class="estilo-btn-add">Acessar</button>
                        <button type="button" class="estilo-btn-edi">Editar</button>
                    </div>
                </div>
            `;
            containerAlunos.appendChild(article);
        });

    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        containerAlunos.innerHTML += `<p style="color: red;">Erro ao carregar dados: ${error.message}</p>`;
    }
}



const form = document.querySelector('form');


if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
      
        const formData = new FormData(form);

        const novoAluno = {
            name: formData.get('nome'),
            cpf: formData.get('CPF'), 
            data_nascimento: formData.get('data-nascimento'),
            endereco: formData.get('endereco'),
            numero: formData.get('numero'),
            cep: formData.get('CEP'),
            telefone: formData.get('telefone'),
            responsavel: formData.get('responsavel'),
            matricula: formData.get('matricula'),
            data_matricula: formData.get('data-matricula'),
            serie: formData.get('serie')
        };

        try {
            const { data, error } = await supabaseClient
                .from('alunos') 
                .insert([novoAluno]);

            if (error) throw error;

            alert('Aluno cadastrado com sucesso no');
            
           
            window.location.href = "main.html";

        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao cadastrar: ' + error.message);
        }
    });
}