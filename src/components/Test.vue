<template>
  <div class="layout-padding">
    <!-- your content -->
    <q-btn color="primary"
           @click="enviar"
           >Enviar</q-btn>
  </div>
</template>

<script>
import API from 'data/config.js'
import axios from 'axios'
import { Loading } from 'quasar' 
export default {
  data () {
    return {
      API,
      response: ''
    }
  },
  methods:{
    enviar(){
      let pessoa = { //pessoaJuridica
        pessoa:{
          idPessoa: 21,
          dhCriacao: new Date().toISOString(), // o backend deve definir isso
          idEstacao: 1,
          idStatusReg: 1,
          idUsuario: 1,
          registroAtivo: true, // enviar sempre 'true' ao editar
          CRT: 1,
          genero: 'M',
          nome: 'EMP NOVA'
        },
        /*cnpj:{ //ok
          idPessoaEmissor: 1,
          idPessoa: 0,
          numero: '70815539000184',
          idUsuario: 1
        },*/
        /*IE: { //ok
          idPessoaEmissor: 1,
          numero: '291251403',
          idPessoa: 0,
          UF: 'PB',
          idUsuario: 1
        },
        senha: '1234', // - não tem em tela
        sigla: 'ABC', // - não tem em tela
        nomeSecundario: 'Loja-01', //- não tem em tela
        dataInicio: new Date().toISOString(),*/
        // tipoPessoa: 3,
        /*telefones: [ //ok
          {
            numero: 75999999999, //10 digitos no mínimo
            dhCriacao: new Date().toISOString(),
            idEstacao: 1,
            idStatusReg: 1,
            idUsuario: 1,
            RecuperacaoSenha: false,
            IdTelefoneOperadora: 1,
            IdTelefoneTipo: 1 
          }
        ],*/
        /*endVirtuais: [ //ok
          {
            idEnderecoTipo: 1,
            idPessoa: 1,
            nome: 'email@empresa.com',
            idUsuario: 1,
            idEstacao: 1
          }
        ],*/
        /*endFisicos: [ //ok
          {
            idPessoa: 1,
            endereco: {
              bairro: 'CENTRO',
              cep: '48700000',
              idCidade: 1,
              nome: 'R. ALVARO AUGUSTO'
            },
            idEnderecoTipo: 1,
            idPessoaEnd: 1,
            numero: 259,
            pontoRef: '',
            idEndereco: 1, //enviar sempre 1 por enquanto
            idEstacao: 1,
            idStatusReg: 1,
            idUsuario: 1,
          }
        ]*/
      }
      
      
      Loading.show()
      axios.post(this.API + 'pessoas/insertPJ', pessoa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    }
  }
}
</script>

<style>
</style>
