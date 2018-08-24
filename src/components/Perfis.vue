<template>
<div id="perfis">
  
  <c-header></c-header>
  
  <q-list no-border multiline link>
    <q-item class="tile">
      <q-item-side class="white"></q-item-side>
      <q-item-main>Perfil</q-item-main>
    </q-item>
    <q-item class="item" @click="selecionar('Administrador')">
      <!--<q-item-side icon="fa-circle-thin" class="icon" />-->
      <q-item-side></q-item-side>
      <q-item-main>Administrador</q-item-main>
    </q-item>
    <hr>
    <q-item class="item" @click="selecionar('Professor')">
      <q-item-side></q-item-side>
      <q-item-main>Professor</q-item-main>
    </q-item>
    <hr>
    <q-item class="item" @click="selecionar('Aluno')">
      <q-item-side></q-item-side>
      <q-item-main>Aluno</q-item-main>
    </q-item>
    <hr />
  </q-list>
  
</div>
</template>
<script>
import cHeader from 'components/Header.vue'
import images from 'data/images.js'
export default{
  name: 'Perfil',
  components:{
    cHeader
  },
  data(){
    return{
      images,
    }
  },
  methods:{
    selecionar(value){
      localStorage.setItem('perfil', value)
      this.$router.push('hello')
    }
  },
  created(){
    localStorage.setItem('perfil', '')
  }
}
</script>
<style scoped>
  .subtitle{
    font-size: 8px;
  }
  .white{
    color: #fff;
  }
  .verdeBook{
    font-size: 27px;
    vertical-align: middle;
  }
  .box{
    width: 100%;
    height: 120px;
  }
  hr{
    border-color: transparent;
    margin: 0;
    color: 
  }
  .item{
    color: #848688;
    background-color: #E6E7E8;
    font-size: 28px;
    padding: 5px 5px 5px 10px;
  }
  div.q-item-main{
    margin-left: -15px;
  }
  .tile{
    background-color: #57A695;
    color: #fff;
    font-size: 25px;
  }
  .icon{
    margin-right: 20px;
  }
</style>
