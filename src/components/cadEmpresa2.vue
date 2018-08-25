<template>
<div>
  <c-header></c-header>
  <div style="margin: 20px"></div>  

  <q-list no-border multiline class="no-padding">

    <q-item class="titleBook">
      <q-item-main>
        <div class="name">{{empresa.nome}}</div>
      </q-item-main>
    </q-item>
    
    <div class="cursor-pointer" 
         style="margin: -15px 0 0">
      <q-btn flat icon="fa-pencil-square-o" 
             class="btnEdit" 
             @click="$router.push('cadEmpresa')"
             /><span>editar</span>
    </div>
    <br>

    <!--<q-item>
      <q-item-side>
        <q-btn small rounded
               id="btnSmall"
               style="margin-top: 8px"
               @click="$router.push('cadEmpresa')"
               >Editar</q-btn>
      </q-item-side>
    </q-item>-->
    
    <!--<q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2227.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="accordion-item item">
        <input type="radio" 
               name="accordion" 
               id="accordion-1" 
               @change="toggle(accordion)"
               />
        <label for= "accordion-1">Empresa</label>
        <div class="accordion-content">Minha Empresa</div>
      </q-item-main>
      <q-item-side right>
        <router-link to="cadEmpresa">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2227.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="accordion-item item">
        <input type="radio" name="accordion" id="accordion-2" />
        <label for= "accordion-2">Serviços</label>
        <div class="accordion-content">Minha Empresa</div>
      </q-item-main>
      <q-item-side right>
        <router-link to="cadEmpresa">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2227.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="accordion-item item">
        <input type="radio" name="accordion" id="accordion-3" />
        <label for= "accordion-3">Contatos</label>
        <div class="accordion-content">Minha Empresa</div>
      </q-item-main>
      <q-item-side right>
        <router-link to="cadEmpresa">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="accordion-content">TEste</div>
    <hr class="no-margin" />
    
    <br><br>-->
    
    <q-item class="verdeBook">
      <q-item-side>
        <img src="~icones/2403-2227.png" style="margin-left: 10px">
      </q-item-side>
      <q-item-main class="item">filiais</q-item-main>
      <q-item-side right>
        <router-link to="cadEmpresa">
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
      <q-item-main class="item">endereço</q-item-main>
      <q-item-side right>
        <router-link :to="{path: '/cadEndereco', query: {mode:'new'}}">
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
      <q-item-main class="item">documento</q-item-main>
      <q-item-side right>
        <router-link to="cadDocumento">
          <img src="~icones/addmais32branco.png">
        </router-link>
      </q-item-side>
    </q-item>
    <div class="panel">
      <q-list no-border>
        <q-item class="itens" v-if="cnpj.numero" @click="editarDocumento('CNPJ')">
          <q-item-main>{{cnpj.numero}}</q-item-main>
          <q-item-side right>CNPJ</q-item-side>
        </q-item>
        <q-item class="itens" v-if="ie.numero" @click="editarDocumento('IE')">
          <q-item-main>{{ie.numero}}</q-item-main>
          <q-item-side right>IE</q-item-side>
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
import cHeader from 'components/Header.vue'
import API from 'data/config.js'
import axios from 'axios'
import { Loading } from 'quasar'
export default {
  name: 'A16',
  components: { cHeader },
  data(){
    return {
      tela: localStorage.getItem('tela'),
      API,
      response: '',
      search: '',
      accordion: '',
      empresa: '',
      cnpj: '',
      ie: '',
      filiais: '',
      endFisicos: '',
      endVirtuais: '',
      telefones: '',
    }
  },
  methods:{
    clear (questao) {
        var radios = document.querySelectorAll("input[name=accordion" + questao + "]");
        for (var i = 0; i < radios.length; i++)
          radios[i].checked = false;
    },
    toggle(value){
      var radios = document.querySelectorAll("input[name=accordion" + value + "]");
      console.log('radios', radios[0].checked);
      
       return
       
      for (var i = 0; i < radios.length; i++){
        if(radios[i].checked === true) radios[i].checked = false
        
      } 
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
    obterEmpresa(){
      Loading.show()
      axios.get(this.API + 'pessoas/obterPJ?IdPessoa=' + localStorage.getItem('idPessoa'))
      .then((res) => {
        Loading.hide()
        console.info(res)
        this.response = res.data.data
        this.empresa = this.response.pessoa
        if(this.response.cnpj){
          this.cnpj = this.response.cnpj 
        }
        if(this.response.ie){
          this.ie = this.response.ie
        }
        /*if(this.response.filiais?relacao?){
          this.filiais = this.response.filiais
        }*/
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
    editarEnd(index){
      console.log(index)
      localStorage.setItem('index', index)
      this.$router.push({path: '/cadEndereco', query: {mode: 'edit'}})
    },
    editarEmail(index){
      console.log(index)
      localStorage.setItem('index', index)
      this.$router.push({path: '/cadEmail', query: {mode: 'edit'}})
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
    this.toggleAcc()
    this.obterEmpresa()
    localStorage.setItem('tela', 'Empresa')
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
  .name{
    font-size: 30px;
  }
  .btnEdit{
    color: #57A695;
    margin: 0 -10px 0 0;
  }
  span{
    font-size: 19px;
    margin-left: -15px;
    color: #57A695;
  }
  
</style>
