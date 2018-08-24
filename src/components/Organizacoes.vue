<template>
<div id="organizações">
  <div class="row">
    <div class="col">
      <img src="~/icones/LogoBook360.png"
           width="210px"
      >
    </div>
    <div class="col text-right">
      <img src="../icones/19062043.jpg" 
           class="avatar"
           id="user"
           style="margin: 5px 6px 0 0"
      >
    </div>
  </div>
  <div class="row" style="margin:-12px 18px 0">
    <div class="col-1 text-book">
      <!--:: perfil [professor]-->
    </div>
    <div class="col text-right" id="user-name">
      Igor Rosa<br>
      <!--<span class="subtitle">lorem ipsum</span>-->
    </div>
  </div>
  <br>
  
  <q-list no-border multiline link>
    <q-item class="tile">
      <q-item-side class="white">::</q-item-side>
      <q-item-main>organizações filiado [4]</q-item-main>
    </q-item>
    <q-item class="no-padding">
      <div class="box">
        <c-carousel></c-carousel>
      </div>
    </q-item>
    <!--<hr>
    <q-item class="item">
      <q-item-side>::</q-item-side>
      <q-item-main>usuários [ 125 ]</q-item-main>
    </q-item>
    <hr>
    <q-item class="item">
      <q-item-side>::</q-item-side>
      <q-item-main>pendências [ 125 ]</q-item-main>
    </q-item>
    <hr>
    <q-item class="item">
      <q-item-side>::</q-item-side>
      <q-item-main>compromissos [ 125 ]</q-item-main>
    </q-item>-->
    <hr />
  </q-list>
  
</div>
</template>
<script>
import localforage from 'localforage'
import cCarousel from './Carousel.vue'
export default{
  name: 'A3',
  components:{ cCarousel }
}
</script>
<style scoped>
  #user{
    height: 70px;
    width: 70px;
  }
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
    font-size: 27px;
  }
  div.q-item-main{
    margin-left: -15px;
  }
  .tile{
    background-color: #57A695;
    color: white;
    font-size: 25px;
  }
  .col{
    font-size: 13px;
  }
  
</style>