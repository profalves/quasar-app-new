<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <!--<q-item class="titleBook">
      <q-item-side>
        <img src="~icones/editar.png" width="50px">
      </q-item-side>
      <q-item-main style="font-size: 27px">cadastro endereço</q-item-main>
    </q-item>-->
    
    <q-item class="titleBook" id="titleCad">
      <q-item-main>Cadastro Endereço</q-item-main>
    </q-item>
    
    <div class="cursor-pointer" 
         style="margin: -15px 0 0"
         v-show="btnDelete">
      <q-btn flat round icon="delete" class="btnDelete" /><span>excluir</span> 
    </div>

    <!--<q-item class="titleBook">
      <q-item-main>
        <div class="name">{{pessoa.nome}}</div>
      </q-item-main>
    </q-item>-->
    
    <form>
      
      <div class="text-right">
        <div class="tile">atribuir localização</div>
        <img src="~icones/localizacao48.png"
             class="iconLoc"
        />
        
      </div>
      
      <select style="margin: 2% 5%" class="bookSelect" v-model="endFisico.idEnderecoTipo">
        <option value="" disabled selected>tipo de end ...</option>
        <option v-for="(tipo, index) in tipos" 
                :value="tipo.value"
                :key="index">
          {{tipo.label}}
        </option>
      </select>
      
      <!-- onde salva o estado? onde será enviado?
      <select style="margin: 2% 5%" class="bookSelect" v-model="estado">
        <option value="" disabled selected>estado ...</option>
        <option v-for="(estado, index) in estados" 
                :value="estado.value"
                :key="index">
          {{estado.label}}
        </option>
      </select>
      -->
      
      <the-mask :mask="['#####-###']" 
                placeholder="CEP ..."
                style="margin: 2% 5%"
                class="bookInput"
                v-model="endereco.cep"
      />
      
      <select style="margin: 2% 5%" 
              class="bookSelect" 
              v-model="endereco.idCidade">
        <option value="" disabled selected>cidade ...</option>
        <option v-for="(cidade, index) in cidades"
                :value="cidade.value.idCidade"
                :key="index">
          {{cidade.label}}
        </option>
      </select>
      
      <input class="bookInput"
             placeholder="rua ..."
             style="margin: 2% 5%"
             v-model="endereco.nome"
      />
      
      <input class="bookInput"
             placeholder="n. ..."
             style="margin: 2% 5%"
             v-model="endFisico.numero"
      />
      
      <input class="bookInput"
             placeholder="bairro ..."
             style="margin: 2% 5%"
             v-model="endereco.bairro"
      />
      
      <input class="bookInput"
             placeholder="complemento ..."
             style="margin: 2% 5%"
             v-model="endFisico.pontoRef"
      />
      
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
import cHeader from 'components/Header.vue'
import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'
import estados from 'data/estados.json'

const index = parseInt(localStorage.getItem('index'))

export default {
  name: 'L0202_2211_localizacao',
  components: { cHeader },
  data(){
    return{
      tela: localStorage.getItem('tela'),
      tipos: '',
      estados,
      estado: 'ba',
      cidades: '',
      API,
      metodo: '',
      response: '',
      pessoa: '',
      endFisicos: [],
      endereco: {
        bairro: '',
        cep: '',
        idCidade: '',
        nome: ''
      },
      endFisico:{
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        endereco: {},
        idEnderecoTipo: '',
        idPessoaEnd: 1,
        numero: '',
        pontoRef: '',
        idEndereco: 1, //enviar sempre 1 por enquanto
        idEstacao: 1,
        idStatusReg: 1,
        idUsuario: 1,
      },
      btnDelete: false
      
    }
  },
  methods:{
    tiposEndereco(){
      Loading.show()
      axios.get(this.API + 'tipos/endereco')
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.tipos = res.data.data.map(row=>({
          label: row.nome,
          value: row.idEnderecoTipo
        }))
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    cidadesLista(){
      Loading.show()
      axios.get(this.API + 'tipos/cidades')
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.cidades = res.data.data.map(row=>({
          label: row.nome,
          idCidade: row.idCidade,
          value: row
        }))
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    setCidade(index){
      console.log(index)
    },
    voltar(){
      window.history.back()
      
      /*if(localStorage.getItem('setor') === 'empresa'){
        this.$router.push('/empresas')
      }
      else{
        this.$router.push('/pessoas')
      }*/
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
          this.endFisicos = this.response.endFisicos
          this.endereco = this.endFisicos[index].endereco
          this.endFisico = this.endFisicos[index]
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
      if(!this.endereco.nome){
        Toast.create({
          html: 'Precisa preencher o nome da rua!',
          icon: 'alert',
          timeout: 3500,
          color: '#57A695',
          bgColor: 'white',
        })
        return
      }
      
      this.endFisico.endereco = this.endereco
      
      let pessoa = { 
        pessoa: this.pessoa,
        endFisicos: []
      }
      
      pessoa.endFisicos.push(this.endFisico)
      
      delete pessoa.endFisicos[0].pessoa
      delete pessoa.endFisicos[0].enderecoTipo
      
      Loading.show()
      axios.post(this.API + this.metodo, pessoa)
      .then((res) => {
        Loading.hide()
        console.info('SUCESSO:', res)
        console.info(res.status)
        if(res.status === 200){
          this.$router.push('sucesso')
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e.response)
        let erro = e.response.data.exception.Message
        console.log('erro', erro);
        Toast.create({
          html: erro,
          timeout: 5000,
        })
      })
    }
    
  },
  mounted(){
    this.tiposEndereco()
    this.cidadesLista()
    this.obterPessoa()
    localStorage.setItem('tela', 'Endereço')
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
  .tile{
    font-size: 27px;
    color: #BCBDC0;
    margin: 5px 65px -8px 0
  }
  .iconLoc{
    margin: -60px 10px 0 0
  }
  #titleCad{
    padding-top: 15px;
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
