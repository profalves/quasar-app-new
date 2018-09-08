# Book360

> A Quasar Framework project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8081
$ quasar dev

# build for production with minification
$ quasar build

```

# API

## 1. GET:

### EndPoint

    http://191.252.64.6/testeskel/api/
    
### Pessoas

  #### Pessoa Física:

    pessoas/todos
    pessoas/obterPF?IdPessoa=_&CPF=_
    pessoas/insertPF   ( post ) ( enviar PessoaFisica )
    pessoas/listas/cpf01?Nome=_
    
  #### Pessoa Juridica
      
    pessoas/todos?PF=false
    pessoas/obterPJ?IdPessoa=_&CNPJ=_
    pessoas/insertPJ   ( post ) ( enviar PessoaFisica )
    

### Tipos

    tipos/endereco
    tipos/enderecoVirtual
    tipos/telefone
    tipos/relacaoPessoa
    tipos/cidades

### Login

    pessoas/auth?login=_&senha=__
  
  o parâmetro login pode ser cpf ou email do usuário.
  
### Recuperação de Senha

    pessoas/recoverpass?email=X&numeroDoc=X