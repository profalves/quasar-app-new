<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <q-item class="titleBook">
      <q-item-side>
        <img src="~icones/2203-2120.png" style="margin-top:5px; height: 1em;">
      </q-item-side>
      <q-item-main>Cadastro de Pessoa</q-item-main>
    </q-item>
    
    <div class="cursor-pointer" 
         style="margin: -15px 0 0"
         v-show="btnDelete">
      <q-btn flat icon="delete" class="btnDelete" /><span>excluir</span> 
    </div>
    
    <form>
      <select required
              style="margin: 2% 5%"
              placeholder="tipo acesso ..."
              class="bookSelect" 
              v-model="pessoa.tipoPessoa">
        <option value="" disabled selected hidden>tipo acesso ...</option>
        <option v-for="(tipo, index) in tiposRelacao" 
                :value="tipo.value"
                :key="index"
                >
          {{tipo.label}}
        </option>
      </select>
      
      <the-mask :mask="['###.###.###-##']" 
                placeholder="CPF ..."
                v-model="pessoa.cpf"
                style="margin: 2% 5%"
                class="bookInput"
      /> 
      <input placeholder="nome ..."
             v-model="pessoa.nome"
             class="bookInput" 
             style="margin: 2% 5%"
             @change="uppercaser()"
      />  
      <input class="bookInput"
             placeholder="email ..."
             v-model="pessoa.email"
             style="margin: 2% 5%"
      />
      
      <select required style="margin: 2% 5%" class="bookSelect" v-model="pessoa.genero">
        <option value="" disabled selected hidden>gênero ...</option>
        <option value="F">Feminino</option>
        <option value="M">Masculino</option>
      </select>
        
      <div class="text-right">
        <div class="addLogo">inserir logo</div>
        <input class="input-file" type="file" @change="onFileChange">
        <img src="~icones/camera64.png"
             style="margin: -50px 5% 0 0"
             v-if="!image"
        />
        <img :src="image" 
             class="avatar"
             style="margin: -50px 5% 0 0;
                    width: 20%; 
                    height: 20%" 
             v-else
        />
        
      </div>
      
      <div class="row">
        <div class="col text-left">
          <button class="backButton" 
              @click="$router.push('/pessoas')"
              style="margin: 10% 0 0 10%"
              >voltar</button>
  
          
        </div>
        <div class="col text-right over">
          <button class="bookButton" 
              @click="savePessoa"
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
  name: 'L2901_2158_lista_empregado',
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
      tiposRelacao: [],
      btnDelete: false
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
    
  },
  mounted(){
    this.listarTipoRelacao()
    if(localStorage.getItem('idPessoa') !== '0'){
      this.obterPessoa()
      this.btnDelete = true
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
    font-size: 19px;
    margin-left: -15px;
    color: #F58634;
  }
</style>
