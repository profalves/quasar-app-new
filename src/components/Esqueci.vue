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
    
    <input class="bookLogin" type="text" placeholder="usuário ..." style="margin: -10px 5% 10px" />
    <input class="bookLogin" type="email" placeholder="email ..." />
    
    <div class="row">
        <div class="col text-right over">
          <button class="bookButton" 
              @click="$router.push('/novasenha')"
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

export default {
  name: 'Esqueci',
  data(){
    return {
      user: '',
      email: '',
      year: new Date().getFullYear()
    }
  },
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