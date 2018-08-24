<template>
<div>
  <c-header></c-header>
  <div style="margin: 20px"></div>  

  <q-list no-border multiline class="no-padding">
    
    <!--<q-item class="titleBook">
      <q-item-side><img src="~/icones/2203-2120.png" /></q-item-side>
      <q-item-main>cadastro</q-item-main>
    </q-item>-->
    
    <q-item class="titleBook" id="titleCad">
      <q-item-main>Cadastro Pessoa</q-item-main>
    </q-item>

    <q-item class="titleBook">
      <q-item-main>
        <div class="name">{{pessoa.nome}}</div>
      </q-item-main>
    </q-item>
    
    <q-item>
      <q-item-side>
        <q-btn id="btnSmall" 
               small rounded 
               style="margin-top: 8px"
               @click="$router.push('cadPessoa')"
               >Editar</q-btn>
      </q-item-side>
    </q-item>
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/icone64Modelo.png" width="30px" style="margin-left: 10px">
      </q-item-side>
      <q-item-main>relação</q-item-main>
      <q-item-side right>
        <router-link to="cadPessoa">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <p></p>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2229.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="item" @click="enviarEnd">endereço</q-item-main>
      <q-item-side right>
        <router-link to="cadEndereco">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <div v-for="(end, index) in endFisicos" :key="index">
        <div @click="editarEnd(index)">{{end.endereco.nome}}, {{end.numero}}</div>
      </div>
      <br>
    </div>
    
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2231.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="item" @click="enviarDoc">documento</q-item-main>
      <q-item-side right>
        <router-link to="cadDocumento">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <q-list no-border>
        <q-item class="itens" v-if="cpf.numero" @click="editarDocumento('CPF')">
          <q-item-main>{{cpf.numero}}</q-item-main>
          <q-item-side right>CPF</q-item-side>
        </q-item>
        <q-item class="itens" v-if="rg.numero" @click="editarDocumento('RG')">
          <q-item-main>{{rg.numero}}</q-item-main>
          <q-item-side right>RG</q-item-side>
        </q-item>
        <q-item class="itens" v-if="titulo.numero" @click="editarDocumento('TíTULO')">
          <q-item-main>{{titulo.numero}}</q-item-main>
          <q-item-side right>Titulo</q-item-side>
        </q-item>
      </q-list>
      
    </div>
    <hr class="no-margin" />

    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2233.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="item">telefone</q-item-main>
      <q-item-side right>
        <router-link to="cadTelefone">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <div v-for="(tel, index) in response.telefones" :key="index">
        <div @click="editarTel(index)">{{tel.numero}}</div>
      </div>
      <br>
    </div>
    <hr class="no-margin" />

    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2235.png" style="margin: 10px 0 0 10px">
      </q-item-side>
      <q-item-main class="item">end. eletronico</q-item-main>
      <q-item-side right>
        <router-link to="cadEmail">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <div v-for="(end, index) in response.endVirtuais" :key="index">
        <div @click="editarEmail(index)">{{end.nome}}</div>
      </div>
      <br>
    </div>
    <hr class="no-margin" />
    
  </q-list>
  
    <button class="backButton" 
            @click="$router.push('/hello')"
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
  name: 'A16',
  components: { cHeader },
  data(){
    return {
      tela: localStorage.getItem('tela'),
      API,
      search: '',
      response: '',
      pessoa: '',
      pessoaNome: '',
      cpf: 0,
      rg: 0,
      titulo: 0,
      relacao: '',
      endFisicos: '',
      endVirtuais: '',
      telefones: '',
      
    }
  },
  methods:{
    obterPessoa(){
      Loading.show()
      axios.get(this.API + 'pessoas/obterPF?IdPessoa=' + localStorage.getItem('idPessoa'))
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
        this.pessoa = this.response.pessoa
        if(this.response.cpf){
          this.cpf = this.response.cpf 
        }
        if(this.response.rg){
          this.rg = this.response.rg
        }
        if(this.response.tituloEleitor){
          this.titulo = this.response.tituloEleitor
        }
        if(this.response.relacao){
          this.relacao = this.response.relacao
        }
        if(this.response.endFisicos){
          this.endFisicos = this.response.endFisicos
        }
        if(this.response.endVirtuais){
          this.endVirtuais = this.response.endVirtuais
        }
        if(this.response.telefones !== null){
          this.telefones = this.response.telefones
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    toggleAcc(){
      var acc = document.getElementsByClassName("verdeBook");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } 
          else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
        });
      }
    },
    enviarDoc(){
      localStorage.setItem('tela', 'documento')
    },
    enviarEnd(){
      localStorage.setItem('tela', 'endereco')
    },
    enviarEmail(){
      localStorage.setItem('tela', 'email')
    },
    enviarTelefone(){
      localStorage.setItem('tela', 'telefone')
    },
    enviarRelacao(){
      localStorage.setItem('tela', 'relacao')
    },
    editarEnd(index){
      console.log(index)
      localStorage.setItem('index', index)
      this.$router.push({path: '/cadendereco', query: {mode: 'edit'}})
    },
    editarEmail(index){
      console.log(index)
      localStorage.setItem('index', index)
      this.$router.push({path: '/cademail', query: {mode: 'edit'}})
    },
    editarTel(index){
      console.log(index)
      localStorage.setItem('index', index)
      this.$router.push({path: '/cadtelefone', query: {mode: 'edit'}})
    },
    editarDocumento(doc){
      console.log(doc)
      this.$router.push({path: '/caddocumento', query: {mode: 'edit', doc: doc}})
    }
    
  },
  mounted(){
    this.obterPessoa()
    this.toggleAcc()
    localStorage.setItem('tela', 'Pessoa')
  }
}
</script>

<style scoped>
  img{
    margin: 5px 0 0;
  }
  .item{
    margin: 5px 10px;
  }
  .itens{
    font-size: 25px;
    background-color: #E6E7E8;
    color: #848688;
    margin: 0 0 -10px -15px
  }
  .no-break-row {
	margin-right: 25px;
  }
  
</style>