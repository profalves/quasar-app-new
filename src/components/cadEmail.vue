<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <!--<q-item class="titleBook">
      <q-item-side>
        <img src="~icones/editar.png" width="50px">
      </q-item-side>
      <q-item-main style="font-size: 30px">cadastro email</q-item-main>
    </q-item>-->
    
    <q-item class="titleBook" id="titleCad">
      <q-item-main>Cadastro Email</q-item-main>
    </q-item>
    
    <div class="cursor-pointer" 
         style="margin: -15px 0 0"
         v-show="btnDelete">
      <q-btn flat round 
             icon="delete" 
             class="btnDelete"
             @click="excluir"/><span>excluir</span> 
    </div>

    <!--<q-item class="titleBook">
      <q-item-main>
        <div class="name">{{pessoa.nome}}</div>
      </q-item-main>
    </q-item>-->
    
    <form>
        
      <input class="bookInput"
             placeholder="email ..."
             style="margin: 2% 5%"
             v-model="email.nome"
      />
      
      <select required style="margin: 2% 5%" class="bookSelect" v-model="email.idEnderecoTipo">
        <option value="" disabled selected hidden>tipo de contato ...</option>
        <option v-for="(tipo, index) in tiposEndereco" 
                :value="tipo.value"
                :key="index">
          {{tipo.label}}
        </option>
      </select>
      
      <div class="row">
        <div class="col text-left">
          <button class="backButton" 
              @click="$router.go(-1)"
              style="margin: 10% 0 0 10%"
              >voltar</button>
  
          
        </div>
        <div class="col text-right">
          <button class="bookButton" 
              @click="salvar"
              style="margin: 10% 10% 0 0"
              >salvar</button>
        </div>
      </div>
      
    </form>
    
  </q-list>
</div>

</template>

<script>
import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'
import cHeader from 'components/Header.vue'

//const index = parseInt(localStorage.getItem('index'))

export default {
  name: 'L0202_2207_e-mail',
  components: { cHeader },
  data(){
    return{
      tela: localStorage.getItem('tela'),
      index: parseInt(localStorage.getItem('index')),
      API,
      tiposEndereco: [],
      response: '',
      pessoa: '',
      endVirtuais: [],
      email: {
        dhCriacao: new Date().toISOString(),
        idEnderecoTipo: '',
        idEstacao: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        idStatusReg: 1,
        idUsuario: 1,
        nome: '',
      },
      metodo: '',
      btnDelete: false
    }
  },
  methods:{
    voltar(){
      if(localStorage.getItem('setor') === 'empresa'){
        this.$router.push('/empresas')
      }
      else{
        this.$router.push('/pessoas')
      }
    },
    listarTipoEndereco(){
      Loading.show()
      axios.get(this.API + 'tipos/enderecoVirtual')
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.tiposEndereco = res.data.data.map(row=>({
          label: row.nome,
          value: row.idEnderecoTipo
        }))
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    obterPessoa(){
      let url
      if(localStorage.getItem('setor') === 'empresa'){
        url = this.API + 'pessoas/obterPJ?IdPessoa=' + localStorage.getItem('idPessoa')
      }
      else{
        url = this.API + 'pessoas/obterPF?IdPessoa=' + localStorage.getItem('idPessoa')
      }
      
      console.log('url: ', url)
      
      Loading.show()
      axios.get(url)
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
        this.pessoa = this.response.pessoa
        if(this.$route.query.mode === 'edit'){
          this.endVirtuais = this.response.endVirtuais
          this.email = this.response.endVirtuais[this.index]
          this.btnDelete = true
        }
        else{
          if(this.$route.query.mode === 'edit'){
            Toast.create('Não há endereços para editar')
          }
        }
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    salvar(){
      if(!this.email.idEnderecoTipo){
        Toast.create({
          html: 'Precisa preencher o tipo de endereço!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      if(!this.email.nome){
        Toast.create({
          html: 'Precisa preencher o email!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      
      let pessoa = { 
        pessoa: this.pessoa,
        endVirtuais: []
      }
      
      pessoa.endVirtuais.push(this.email)
       
      Loading.show()
      axios.post(this.API + this.metodo, pessoa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        if(res.status === 200){
          this.$router.push('sucesso')
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
        console.log(e.response)
        let erro = e.response.data.exception.Message
        console.log('erro', erro);
        Toast.create({
          html: erro,
          timeout: 5000,
        })
      })
    },
    excluir(){
      Loading.show()
      axios.get(this.API + 'pessoas/deleteEmail?IdPessoaEndElet=' + this.email.idPessoaEndElet + 
               '&IdUsuarioLogado=1') //+ localStorage.getItem())
      .then((res) => {
        Loading.hide()
        console.log('sucesso', res)
        if(res.data.data === true){
          if(localStorage.getItem('setor') === 'empresa'){
            this.$router.push('/subempresa')
          }
          else{
            this.$router.push('/subpessoa')
          }
        }
      })
      .catch((e) => {
        Loading.hide()
        console.log('erro', e.response)
        Toast.create({
          html: e.response.data.data.Message,
          icon: 'warning',
          timeout: 4000,
          color: 'white',
          bgColor: 'red',
        })
      })
    }
    
  },
  mounted(){
    this.listarTipoEndereco()
    this.obterPessoa()
    localStorage.setItem('tela', 'Email')
    if(localStorage.getItem('setor') === 'empresa'){
      this.metodo = 'pessoas/insertPJ'
    }
    else{
      this.metodo = 'pessoas/insertPF'
    }
  }
}
</script>

<style scoped>
  .addLogo{
    font-size: 35px;
    color: #BCBDC0;
    margin: 15px 90px 0 0
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  #titleCad{
    padding-top: 20px;
  }
  .btnDelete{
    color: #F58634;
    margin: 0 -15px 0 0;
  }
  span{
    font-size: 20px;
    color: #F58634;
  }
</style>
