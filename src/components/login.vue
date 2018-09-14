<template>
  <div id="login">
    <center>
      <img src="~/icones/LogoBook360.png">
      <div class="slogan text-right">...conectando você!</div>
    </center>
    
    <input class="bookLogin" 
           type="text" 
           placeholder="usuário ..." 
           style="margin: -10px 5% 10px"
           v-model="user"
           />
    <input class="bookLogin" 
           type="password" 
           placeholder="senha ..." 
           v-model="pass"
           />
    
    <div class="row">
        <div class="col text-right over">
          <button class="bookButton" 
              @click="login"
              style="margin: 10px 18px 0 "
              >entrar</button>
        </div>
    </div>
    
    <div id="esqueci"
         class="text-right cursor-pointer"
         @click="$router.push('esqueci')"
         >recuperar senha</div>
    
    <footer class="text-center">
      book360 ({{year}})<br>
      todos os direitos reservados
    </footer>
  </div>

</template>

<script>
import localforage from 'localforage'
import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'

export default {
  name: 'A1',
  data(){
    return {
      user: 'teste@book.com',
      pass: '1',
      year: new Date().getFullYear()
    }
  },
  methods:{
    login(){
      Loading.show()
      axios.get(API + 'pessoas/auth?login=' + this.user + '&senha=' + this.pass)
      .then((res) => {
        console.info(res)
        localforage.setItem('userRelacao', res.data.data)
        .then(() => {
          Loading.hide()
          this.$router.push('/organizacoes');
        })
        .catch(function(err) {
          console.log(err);
          Toast.create(err)
        });
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
        Toast.create('Login ou senha informados incorretamente')
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
</style>