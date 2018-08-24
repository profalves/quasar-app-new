<template>
<div>
  <c-header></c-header>
  <div style="margin: 20px"></div> 
  
  <div class="title">{{pessoa.nome}}</div>

  <q-list no-border multiline>
    
    <q-item class="titleBook">
      <q-item-main>
        <input v-model="search" 
               class="bookSearch" 
               placeholder="localizar ..."
               id="busca" 
               type="text"
               />
      </q-item-main>
    </q-item>

    <q-item class="verdeBook">
      <q-item-side></q-item-side>
      <q-item-main>Acomp. Fisico</q-item-main>
      <q-item-side right>
        <img src="~icones/addmais32branco.png" 
             width="30px" 
             style="margin-top: 2px;"
             @click="$router.push('acompindividual')"
             >
      </q-item-side>
    </q-item>

    <q-item class="cinzaBook"
            v-for="(item, index) in acomp"
            :key="index"
            >
      <q-item-main class="item" @click="$router.push('cadturma')">
        <div class="no-break-row row">
          <div class="col">{{item.data}}</div>
          <div class="col">Peso: {{item.peso}}</div>
        </div> 
      </q-item-main>
      <hr class="no-margin" color="white" />
    </q-item>
    
    
    
  </q-list>
  
    <button class="backButton" 
            @click="$router.go(-1)"
            style="margin: 20px"
            >voltar</button>
  

</div>

</template>
<script>
import cHeader from 'components/Header.vue'
import API from 'data/config.js'
import axios from 'axios'
import { Loading } from 'quasar'

export default {
  name: 'CadAcomp',
  components: { cHeader },
  data(){
    return {
      API,
      acomp: [
        {
          data: '21/07/18',
          peso: '80Kg',
        }
      ],
      search: '',
      pessoa: ''
    }
  },
  computed:{
    turmasList(){
      return this.turmas//.filter(row => row.toLowerCase().indexOf(this.search)>=0)
    }
  },
  methods:{
    getPessoa(pessoa){
      localStorage.setItem('idPessoa', pessoa.idPessoa)
      this.$router.push('subpessoa')
    },
    novo(){
      localStorage.setItem('idPessoa', 0)
      this.$router.push('cadPessoa')
    }
  },
  mounted(){
    Loading.show()
    axios.get(this.API + 'pessoas/obterPF?IdPessoa=' + localStorage.getItem('idPessoa'))
    .then((res) => {
      Loading.hide()
      console.info(res)
      this.pessoa = res.data.data.pessoa
    })
    .catch((e) => {
      Loading.hide()
      console.log(e)
    })
  }
}
</script>

<style scoped>
  #box_icone_busca{
    font-size: 28px;
    padding: 10px;
    position: relative;
    text-align: right;
    left: 271px;
    top: -67px;
    color: red;
  }
  #icone_busca {
    cursor: pointer;
  }
  .item{
    font-size: 20px;
    color: #6C6D70;
    margin-left: 50px;
  }
  .title{
    color: #57A695;
    font-size: 25px;
    text-align: center;
  }
</style>