<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <q-item class="titleBook">
      <q-item-side>
        <img src="~icones/2203-2120.png" style="margin-top:5px; height: 1em;">
      </q-item-side>
      <q-item-main>Cadastro de Empresa</q-item-main>
    </q-item>
    
    <div class="cursor-pointer" 
         style="margin: -15px 0 0"
         v-show="btnDelete">
      <q-btn flat round icon="delete" class="btnDelete" /><span>excluir</span> 
    </div>
    
    <form>
      <the-mask :mask="['##.###.###/####-##']" 
                placeholder="CNPJ ..."
                v-model="empresa.cnpj"
                style="margin: 2% 5%"
                class="bookInput"
      />
      <input placeholder="sigla ..."
             class="bookInput" 
             style="margin: 2% 5%"
             v-model="empresa.sigla"
             @change="uppercaser()"
      />  
      <input class="bookInput"
             placeholder="organização ..."
             style="margin: 2% 5%"
             v-model="empresa.org"
      />
      
      <select required style="margin: 2% 5%;" class="bookSelect" v-model="empresa.genero">
        <option value="" disabled selected hidden
                >matriz / filiais</option>
        <option value="M">Matriz</option>
        <option value="F">Filial</option>
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
              @click="$router.push('empresas')"
              style="margin: 10% 0 0 10%"
              >voltar</button>
  
          
        </div>
        <div class="col text-right over">
          <button class="bookButton" 
              @click="saveEmpresa"
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
  name: 'A5',
  components: { cHeader },
  data(){
    return{
      API,
      empresa: {
        cnpj: '',
        sigla: '',
        org: '',
        genero: ''
      },
      response: '',
      image: '',
      btnDelete: false
    }
  },
  methods:{
    uppercaser(){
      this.empresa.sigla = this.empresa.sigla.toUpperCase()
    },
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
    removeImage(e) {
      this.image = '';
    },
    saveEmpresa(){
      if(this.empresa.org === ''){
        Toast.create({
          html: 'Precisa preencher um nome para a empresa!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      
      let empresa = {
        pessoa:{
          idPessoa: localStorage.getItem('idPessoa'),
          dhCriacao: new Date().toISOString(), // o backend deve definir isso
          idEstacao: 1,
          idStatusReg: 1,
          idUsuario: 1,
          registroAtivo: true, // enviar sempre 'true' ao editar
          CRT: 1,
          genero: this.empresa.genero,
          nome: this.empresa.org
        },
        cnpj:{
          idPessoaEmissor: 1,
          idPessoa: localStorage.getItem('idPessoa'),
          numero: this.empresa.cnpj,
          idUsuario: 1
        },
        //senha: '1234', // - não tem em tela
        sigla: this.empresa.sigla,
      }
      
      Loading.show()
      axios.post(this.API + 'pessoas/insertPJ', empresa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        let novo = res.data.data.pessoa
        localStorage.setItem('idPessoa', novo.idPessoa)
        localStorage.setItem('setor', 'empresa')
        this.$router.push('sucesso')
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
      
    },
    obterEmpresas(){
      Loading.show()
      axios.get(this.API + 'pessoas/obterPJ?IdPessoa=' + localStorage.getItem('idPessoa'))
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
        
        let pessoa = this.response.pessoa
        console.log('pessoa', pessoa);
        this.empresa.org = pessoa.nome
        this.empresa.genero = pessoa.genero
        
        let cnpj = this.response.cnpj
        console.log('cnpj', cnpj);
        if(this.response.cnpj){
          this.empresa.cnpj = cnpj.numero
        }
        
        let sigla = this.response.sigla
        if(this.response.sigla){
          this.empresa.sigla = sigla
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },  
  },
  mounted(){
    if(localStorage.getItem('idPessoa') !== '0'){
      this.obterEmpresas()
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
    font-size: 20px;
    color: #F58634;
  }
  
</style>
