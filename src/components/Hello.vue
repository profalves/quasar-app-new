<template>
<div>
  <c-header></c-header>
  <!--<q-btn small rounded 
         id="btnBackMini"
         style="margin: -35px 10px 0"
         @click="$router.push('/login')"
         >Voltar</q-btn>-->
  <!--<div style="margin: -19px 10px 0; 
              color: #57A595; 
              cursor: pointer;" 
       @click="$router.push('/login')"> 
    <i class="ion-arrow-left-c"></i> [voltar]
  </div>-->
    
  <div style="margin:15px"></div>

  <q-list no-border>
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Cadastro</q-item-main>
    </q-item>
    
    <div class="panel no-padding">
      <q-list>
        <q-item class="cinzaBook" @click="empresas">
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Empresa</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" @click="pessoas">
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Pessoa</q-item-main>
        </q-item>
      </q-list>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Planejamento</q-item-main>
    </q-item>
    
    <div class="panel no-padding">
      <q-list>
        <q-item class="cinzaBook" @click="$router.push('/eventos')">
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Evento</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" @click="$router.push('/acompanhamento')">
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Acomp. Fisico</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" @click="$router.push('/turmas')">
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Turma</q-item-main>
        </q-item>
      </q-list>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Financeiro</q-item-main>
    </q-item>
    
    <div class="panel no-padding">
      <q-list>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Contrato</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Pagamento</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Estoque</q-item-main>
        </q-item>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Serviço</q-item-main>
        </q-item>
      </q-list>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Ger. de Documentos</q-item-main>
    </q-item>
    
    <div class="panel no-padding">
      <q-list>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Doc. Físico</q-item-main>
        </q-item>
        <q-item class="cinzaBook" >
          <q-item-side>
            <!--<img src="~icones/2203-2120.png" class="icon">-->
          </q-item-side>
          <q-item-main>Doc. Digital</q-item-main>
        </q-item>
      </q-list>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Competição</q-item-main>
    </q-item>
    
    <div class="panel no-padding">
      <q-list>
        <q-item class="cinzaBook" @click="empresas">
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Cadastro</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
        <q-item class="cinzaBook" @click="empresas">
          <q-item-side>
            <!--<img src="~icones/2203-2119.png" class="icon">-->
          </q-item-side>
          <q-item-main>Acompanhamento</q-item-main>
        </q-item>
        <q-item-separator class="no-margin"/>
      </q-list>
    </div>
    <hr class="no-margin" />
    
    <q-item class="verdeBook">
      <q-item-side>
        <!--<img src="~icones/cadastro32.png" class="icon">-->
      </q-item-side>
      <q-item-main>Relatório</q-item-main>
    </q-item>
    <hr class="no-margin" />
    
  </q-list>

</div>

</template>

<script>
import cHeader from 'components/Header.vue'
export default {
  name: 'L2801_2215_menu',
  components: { cHeader },
  methods:{
    pessoas(){
      localStorage.setItem('setor', 'pessoa')
      this.$router.push('/pessoas')
    },
    empresas(){
      localStorage.setItem('setor', 'empresa')
      this.$router.push('/empresas')
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
    }
  },
  mounted(){
    this.toggleAcc()
  }
}
</script>

<style scoped>
  #btnBackMini{
    background-color: #F48735;
    color: #fff;
  }
  .icon{
    margin-left: 5px;
  }
</style>