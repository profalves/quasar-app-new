<template>
<div>
  <c-header></c-header>
  <div style="margin: 20px"></div>  

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
      <q-item-side>
        <img src="~icones/2403-1956.png" width="30px" style="margin-top: 2px;">
      </q-item-side>
      <q-item-main>Pessoa</q-item-main>
      <q-item-side right>
        <img src="~icones/addmais32branco.png" 
             width="30px" 
             style="margin-top: 2px;"
             @click="novo"
             >
      </q-item-side>
    </q-item>

    <q-item v-for="(pessoa, index) in pessoasList"
            :key="index" 
            class="cinzaBook"
            >
      <q-item-side></q-item-side>
      <q-item-main class="item" @click="getPessoa(pessoa)">
        <div class="no-break-row">{{pessoa.nome}}</div>
      </q-item-main>
      <hr class="no-margin" color="white" />
    </q-item>

    
  </q-list>
  
    <button class="backButton" 
            @click="$router.push('/hello')"
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
  name: 'L2901_2159_lista_empregado',
  components: { cHeader },
  data(){
    return {
      API,
      pessoas: [],
      search: '',
    }
  },
  computed:{
    pessoasList(){
      return this.pessoas.filter(row => row.nome.toLowerCase().indexOf(this.search)>=0)
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
    axios.get(this.API + 'pessoas/todos')
    .then((res) => {
      Loading.hide()
      console.info(res)
      this.pessoas = res.data.data
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
    font-size: 25px;
    color: #6C6D70;
  }
  
</style>


