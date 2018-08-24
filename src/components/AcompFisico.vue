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
      <q-item-side></q-item-side>
      <q-item-main>Acomp. Fisico</q-item-main>
      <q-item-side right></q-item-side>
    </q-item>

    <q-item class="cinzaBook"
            v-for="(pessoa, index) in pessoasList"
            :key="index"
            >
      <q-item-side></q-item-side>
      <q-item-main class="item" @click="getPessoa(pessoa)">
        <div class="no-break-row">{{pessoa.nome}}</div> 
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
//import cHeader from 'components/Header.vue'
import API from 'data/config.js'
import axios from 'axios'
import { Loading } from 'quasar'

export default {
  name: 'acomp_fisico',
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
      this.$router.push('cadacompanhamento')
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


