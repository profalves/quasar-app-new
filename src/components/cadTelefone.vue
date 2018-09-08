<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <!--<q-item class="titleBook">
      <q-item-side>
        <img src="~icones/editar.png" width="50px">
      </q-item-side>
      <q-item-main style="font-size: 28px">cadastro telefone</q-item-main>
    </q-item>-->
    
    <q-item class="titleBook" id="titleCad">
      <q-item-main>Cadastro Telefone</q-item-main>
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
        
      <div class="row">
        <div class="col-4">
          <the-mask :mask="['##']" 
                    placeholder="DDD ..."
                    style="margin: 2% 0 0 10%"
                    class="bookInput"
                    v-model="ddd"
          />
          
        </div>
        <div class="col-8">
          <the-mask :mask="['####-####', '#####-####']" 
                    placeholder="Telefone ..."
                    style="margin: 1% 5% 0"
                    class="bookInput"
                    v-model="numero"
                    ref="tel"
          />
          
        </div>
      </div>
      
      <select style="margin: 2% 5%" class="bookSelect" v-model="telefone.idTelefoneTipo">
        <option value="" disabled selected>tipo de contato ...</option>
        <option v-for="(tipo, index) in tiposContato" 
                :value="tipo.value"
                :key="index">
          {{tipo.label}}
        </option>
      </select>
      
      <!--<q-item class="titleBook">
        <q-item-side>
          <div class="bookCheckBox">
            <input type="checkbox" id="checkbox" v-model="movel"/>
            <label for="checkbox"></label>
          </div>
        </q-item-side>
        <q-item-main style="font-size: 30px; margin: -10px 5px 10px">Whatsapp</q-item-main>
      </q-item>-->
      
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
  
const index = parseInt(localStorage.getItem('index'))
  
export default {
  name: 'L0202_2208_telefone',
  components: { cHeader },
  data(){
    return{
      tela: localStorage.getItem('tela'),
      API,
      metodo: '',
      response: '',
      pessoa: '',
      telefone: {
        numero: '', //10 digitos no mínimo
        dhCriacao: new Date().toISOString(),
        idEstacao: 1,
        idStatusReg: 1,
        idUsuario: 1,
        RecuperacaoSenha: false,
        idTelefoneOperadora: 1,
        idTelefoneTipo: '', 
      },
      ddd: '',
      numero: '',
      movel: false,
      telefones: [],
      tiposContato: [],
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
    listarTipoContato(){
      Loading.show()
      axios.get(this.API + 'tipos/telefone')
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.tiposContato = res.data.data.map(row=>({
          label: row.nome,
          value: row.idTelefoneTipo
        }))
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    obterPessoa(){
      Loading.show()
      axios.get(this.API + 'pessoas/obterPF?IdPessoa=' + localStorage.getItem('idPessoa'))
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
        this.pessoa = this.response.pessoa
        if(this.$route.query.mode === 'edit'){
          this.telefones = this.response.telefones
          this.telefone = this.response.telefones[index]
          this.ddd = this.telefone.numero.substring(0,2)
          this.numero = this.telefone.numero.substring(2)
          this.btnDelete = true
        }
        else{
          if(this.$route.query.mode === 'edit'){
            Toast.create('Não há telefones para editar')
          }
        }
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    definirNumero(){
      let numero = this.ddd + this.numero
      this.telefone.numero = parseInt(numero)
    },
    salvar(){
      this.definirNumero()
      
      if(!this.telefone.idTelefoneTipo){
        Toast.create({
          html: 'Precisa preencher o tipo de contato!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      if(!this.numero){
        Toast.create({
          html: 'Precisa preencher o telefone!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      if(!this.ddd){
        Toast.create({
          html: 'Precisa preencher o DDD!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      
      let pessoa = { 
        pessoa: this.pessoa,
        telefones: []
      }
      
      pessoa.telefones.push(this.telefone)
            
      Loading.show()
      axios.post(this.API + this.metodo, pessoa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.$router.push('sucesso')
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    excluir(){
      Loading.show()
      axios.get(this.API + 'pessoas/deleteTelefone?IdPessoaTelefone=' + this.telefone.idPessoaTelefone + 
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
  watch:{
    'ddd': function(){
      if(this.ddd.length === 2){
        this.$refs.tel.$el.focus()
      }
    }
  },
  mounted(){
    this.listarTipoContato()
    this.obterPessoa()
    localStorage.setItem('tela', 'Telefone')
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
  .btnDelete{
    color: #F58634;
    margin: 0 -15px 0 0;
  }
  span{
    font-size: 20px;
    color: #F58634;
  }
</style>