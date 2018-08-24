<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <q-item class="titleBook">
      <q-item-side>
        <img src="~icones/2203-2126.png" style="margin-top:5px; height: 1em;">
      </q-item-side>
      <q-item-main>Acomp. Físico</q-item-main>
    </q-item>
    
    <form>
      
      <input class="bookInput"
             placeholder="Turma ..."
             style="margin: 2% 5%"
      />
      <input placeholder="Descrição ..."
             class="bookInput" 
             style="margin: 2% 5%"
      />
      
      <select required
              style="margin: 2% 5%"
              placeholder="tipo acesso ..."
              class="bookSelect">
        <option value="" disabled selected hidden>Status ...</option>
        <option value="1">Status 1</option>
        <!--<option v-for="(tipo, index) in tiposEventos" 
                :value="tipo.value"
                :key="index"
                >
          {{tipo.label}}
        </option>-->
      </select>
      <br><br>
      
      <select required
              style="margin: 2% 5%"
              placeholder="tipo acesso ..."
              class="bookSelect">
        <option value="" disabled selected hidden>Dia da Semana ...</option>
        <option value="1">Domingo</option>
        <option value="2">Segunda</option>
        <option value="3">Terça</option>
        <option value="4">Quarta</option>
        <option value="5">Quinta</option>
        <option value="6">Sexta</option>
        <option value="7">Sábado</option>
        <!--<option v-for="(tipo, index) in tiposEventos" 
                :value="tipo.value"
                :key="index"
                >
          {{tipo.label}}
        </option>-->
      </select>
      
      <div class="row">
        <div class="col-xs-6">
          <input class="bookInput"
                 style="margin: 2% 5%"
                 type="time"
          />
        </div>
        <div class="col-xs-6">
          <input class="bookInput"
                 style="margin: 2% 5%"
                 type="time"
          />
        </div>
      </div>
      
      <div class="text-right">
        <div class="addLogo">Add dia</div>
        <input class="input-file" type="file" @change="onFileChange">
        <i class="material-icons fa-3x"
           style="margin: -50px 35px 0 0"
           >date_range</i>
      </div>
      
      <div class="row">
        <div class="col text-left">
          <button class="backButton" 
              @click="$router.go(-1)"
              style="margin: 10% 0 0 10%"
              >voltar</button>
  
          
        </div>
        <div class="col text-right over">
          <button class="bookButton" 
              @click=""
              style="margin: 10% 10% 0 0"
              >salvar</button>
        </div>
      </div>
      
    </form>
    
  </q-list>
</div>

</template>

<script>
import cHeader from 'components/Header.vue'
import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'
export default {
  name: 'cadastro_turma',
  components: { cHeader },
  data(){
    return{
      API,
      image: '',
      response: {},
      pessoa:{ // campos da tela
        tipoPessoa: '',
        cpf: '',
        nome: '',
        email: '',
        genero: ''
      },
      tiposEventos: ['Campeonato']
    }
  },
  methods:{
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(e){
      this.image = '';
    },
    uppercaser(){
      this.pessoa.nome = this.pessoa.nome.toUpperCase()
    },
    listarTipoRelacao(){
      Loading.show()
      axios.get(this.API + 'tipos/relacaopessoa')
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.tiposRelacao = res.data.data.map(row=>({
          label: row.nome,
          value: row.idTipoRelacao
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
        
        let pessoa = this.response.pessoa
        console.log('pessoa', pessoa);
        this.pessoa.nome = pessoa.nome
        this.pessoa.genero = pessoa.genero
        
        let cpf = this.response.cpf
        if(this.response.cpf){
          this.pessoa.cpf = cpf.numero
          console.log('cpf', cpf.numero);
        }
        
        let email = this.response.endVirtuais
        if(this.response.endVirtuais.length>0 || this.response.endVirtuais !== ""){
          this.pessoa.email = email[0].nome
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    savePessoa(){
       if(this.pessoa.nome === ''){
        Toast.create({
          html: 'Precisa preencher um nome!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      
      let pessoa = {
        cpf: {
          idEstacao: 1,
          idStatusReg: 1,
          idUsuario: 1,
          idPessoaEmissor: 1,
          idPessoa: localStorage.getItem('idPessoa'), // zero para novo cadastro
          numero: this.pessoa.cpf,
        },
        pessoa:{
          idPessoa: localStorage.getItem('idPessoa'),
          dhCriacao: new Date().toISOString(), // o backend deve definir isso
          idEstacao: 1,
          idStatusReg: 1,
          idUsuario: 1,
          registroAtivo: true, // enviar sempre 'true' ao editar
          CRT: 0,
          genero: this.pessoa.genero,
          nome: this.pessoa.nome
        },
        tipoPessoa: this.pessoa.tipoPessoa,
        endVirtuais: [
          {
            idEnderecoTipo: 4,
            idPessoa: localStorage.getItem('idPessoa'),
            nome: this.pessoa.email,
            idUsuario: 1,
            idEstacao: 1
          }
        ]
      }
      
      Loading.show()
      axios.post(this.API + 'pessoas/insertPF', pessoa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        let novo = res.data.data.pessoa
        localStorage.setItem('idPessoa', novo.idPessoa)
        localStorage.setItem('setor', 'pessoa')
        this.$router.push('sucesso')
      })
      .catch((e) => {
        Loading.hide()
        console.log(e.response)
      })
    }
    
  }
}
</script>

<style scoped>
  
</style>
