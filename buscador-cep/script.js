async function consultarCep() {
    const cepInput = document.getElementById('cep').value.trim();

    // Limpa os campos antes de uma nova busca
    limparCampos();

    // Validação básica de formato (8 dígitos numéricos)
    const regexCep = /^[0-9]{8}$/;
    if (!regexCep.test(cepInput)) {
        alert('Por favor, digite um CEP válido contendo exatamente 8 números.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cepInput}/json/`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error('Erro na comunicação com a API do ViaCEP.');
        }

        const dados = await resposta.json();

        // O ViaCEP retorna um objeto { erro: true } quando o CEP não existe na base
        if (dados.erro) {
            alert('CEP não encontrado na base de dados.');
            return;
        }

        // Preenchendo dinamicamente o DOM com os dados retornados
        document.getElementById('logradouro').value = dados.logradouro || 'Não informado';
        document.getElementById('bairro').value = dados.bairro || 'Não informado';
        document.getElementById('cidade').value = dados.localidade || 'Não informado';
        document.getElementById('estado').value = dados.uf || 'Não informado';

    } catch (erro) {
        console.error('Falha na requisição:', erro);
        alert('Ocorreu um erro ao consultar o CEP. Verifique sua conexão.');
    }
}

function limparCampos() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}