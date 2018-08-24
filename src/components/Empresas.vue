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
        <img src="~icones/2203-2128.png" width="40px" style="margin-top:5px">
      </q-item-side>
      <q-item-main style="margin-top:6px">empresa</q-item-main>
      <q-item-side right>
          <img src="~icones/addmais32branco.png" 
               width="40px" 
               style="margin-top:5px"
               @click="novo"
               >
      </q-item-side>
    </q-item>

    <q-item v-for="(empresa, index) in empresas"
            :key="index" 
            class="cinzaBook"
            >
      <q-item-main class="item" @click="getEmpresa(empresa)">
        <div class="no-break-row"> {{empresa.nome}}</div> 
        <hr class="no-margin" color="white" />
      </q-item-main>  
    </q-item>
    
    
    
  </q-list>
  
    <button class="backButton" 
            @click="$router.go(-1)"
            style="margin: 20px"
            >voltar</button>
  
</div>



</template>
<script>
import API from 'data/config.js'
import axios from 'axios'
import { Loading } from 'quasar'
import cHeader from 'components/Header.vue'

export default {
  name: 'A15',
  components: { cHeader },
  data(){
    return {
      API,
      emp: [],
      search: '',
    }
  },
  computed:{
    empresas(){
      return this.emp.filter(row => row.nome.toLowerCase().indexOf(this.search)>=0)
    }
  },
  methods:{
    getEmpresa(empresa){
      localStorage.setItem('idPessoa', empresa.idPessoa)
      this.$router.push('subempresa')
    },
    novo(){
      localStorage.setItem('idPessoa', 0)
      this.$router.push('cadempresa')
    }
  },
  mounted(){
    Loading.show()
    axios.get(this.API + 'pessoas/todos?PF=false')
    .then((res) => {
      Loading.hide()
      console.info(res)
      this.emp = res.data.data
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
    font-size: 27px;
    color: #6C6D70;
  }  
</style>


