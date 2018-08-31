<template>
  <div>
    <center>
      <img src="~/icones/LogoBook360.png">
      <div class="slogan text-right">... recuperando senha</div>
    </center>
    
    <q-list no-border>

      <q-item>
        <q-item-side>
          <img src="~icones/recuperar.png" class="icone">
        </q-item-side>
        <q-item-main class="label-icon">Recuperar Senha</q-item-main>
      </q-item>
    
    </q-list>
    
    <input class="bookLogin" 
           type="text" 
           placeholder="usuário ..." 
           style="margin: -10px 5% 10px"
           v-model="user" />
    <input class="bookLogin" 
           type="email" 
           placeholder="email ..."
           v-model="email" />
    
    <div class="row">
        <div class="col text-right over">
          <button class="bookButton" 
              @click="recover"
              style="margin: 10px 18px 0 "
              >enviar</button>
        </div>
    </div>
    
    
    
    <footer class="text-center">
      book360 ({{year}})<br>
      todos os direitos reservados
    </footer>
  </div>

</template>

<script>

import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'

export default {
  name: 'Esqueci',
  data(){
    return {
      user: '',
      email: '',
      year: new Date().getFullYear()
    }
  },
  methods:{
    recover(){
      if(!this.user || !this.email){
        Toast.create('Preencha o usuário e email por favor!')
        return
      }
      
      Loading.show()
      axios.get(API + 'pessoas/recoverpass?email=' + this.email + '&numeroDoc=' + this.user)
      .then((res) => {
        Loading.hide()
        console.info(res)
        if(res.statusMsg === 'Error'){
          Toast.create(res.message)
        }
        else{
          this.$router.push('/novasenha')
        }
      })
      .catch((e) => {
        Loading.hide()
        console.log(e.response)
        let error = e.response
        Toast.create(error.message)
      })
      
    }
  }
}

</script>

<style scoped>
  
  @media (max-width: 600px) {
    img {
      width: 90%;
    }
  }
  .icone{
    margin-left: 15px; 
    height: 50%; 
    width: 50%;  
  }
  .label-icon{
    font-size: 25px;
    color: #57A695;
  }
  
</style>