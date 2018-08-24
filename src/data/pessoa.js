let pessoa = {
  idPessoa: '',
  CRT: '',
  genero: '',
  nome: '',
  tipoPessoa: ''
}

let pessoaBase = {
  dadosSessaoUsuario: '',
  dataInicio: '',
  endFisicos: [],
  endVirtuais: [],
  nomeSecundario: '',
  pessoa: '',
  pessoaData: '',
  pessoaNomes: '',
  pessoaSenha: '',
  pessoaSigla: '',
  relacoes: [],
  senha: '',
  sigla: '',
  telefones: []
}

let pessoaFisica = {
  _sessaoUser: '',
  CPF: '',
  RG: '',
  tituloEleitor: ''
}

let pessoaJuridica = {
  _sessaoUser: '',
  CNPJ: '',
  IE: ''
}

let pessoaData = {
  idPessoa: '',
  idPessoaData: '',
  dataInicio: '',
  pessoa: ''
}

let pessoaEndElet = {
  enderecoTipo: '',
  idEnderecoTipo: '',
  idPessoa: '',
  idPessoaEndElet: '',
  nome: '',
  pessoa: ''
}

let pessoaEndereco = {
  idPessoa: '',
  endereco: '',
  enderecoTipo: '',
  idEnderecoTipo: '',
  idPessoaEnd: '',
  numero: '',
  pessoa: '',
  pontoRef: ''
}

let pessoaOutroNome = {
  idPessoa: '',
  idPessoaOutroNome: '',
  nome: '',
  pessoa: ''
}

let pessoaRelacao = {
  data: '',
  idPessoaFilho: '',
  idPessoaPai: '',
  idPessoaRelacao: '',
  idTipoRelacao: '',
  pessoaFilho: '',
  pessoaPai: '',
  tipoRelacao: ''
}

let pessoaSenha = {
  idPessoa: '',
  idPessoaSenha: '',
  pessoa: '',
  senha: ''
}

let pessoaServTel = {
  idPessoaServTel: '',
  idPessoaTelefone: '',
  idTelefoneServico: '',
  telefoneServico: ''
}

let pessoaSigla = {
  idPessoa: '',
  idPessoaSigla: '',
  pessoa: '',
  sigla: ''
}

let pessoaTelefone = {
  idPessoa: '',
  idPessoaTelefone: '',
  idTelefoneOperadora: '',
  idTelefoneTipo: '',
  numero: '',
  pessoa: '',
  recuperacaoSenha: '',
  servicos: '',
  telefoneOperadora: '',
  telefoneTipo: ''
}

let pessoaTipoRelacao = {
  idTipoRelacao: '',
  nome: ''
}

export {
  pessoa,
  pessoaBase,
  pessoaFisica,
  pessoaJuridica,
  pessoaData,
  pessoaEndElet,
  pessoaEndereco,
  pessoaOutroNome,
  pessoaRelacao,
  pessoaSenha,
  pessoaServTel,
  pessoaSigla,
  pessoaTelefone,
  pessoaTipoRelacao
}
