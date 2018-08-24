<template>
  <div>
    <center>
      <img src="~/icones/LogoBook360.png">
      <div class="slogan text-right">... recuperando senha</div>
    </center>
    
    <div style="margin: 0px 25px 10px">
      <p>Seu <strong>código</strong> foi enviado para o <i>email</i>.</p>
      <p>Usuário <strong>Igor_Rosa</strong></p>
    </div>
    
    <input class="bookLogin" type="number" placeholder="Cód ..." />
    <input class="bookLogin" type="password" placeholder="Nova senha ..." />
    <input class="bookLogin" type="password" placeholder="Repetir senha ..." />
    
    <div class="row">
        <div class="col text-right over">
          <button class="bookButton" 
              @click="$router.push('/organizacoes')"
              style="margin: 10px 18px 0 "
              >salvar</button>
        </div>
    </div>
    
    
    
    <footer class="footer text-center">
      book360 ({{year}})<br>
      todos os direitos reservados
    </footer>
  </div>

</template>

<script>

export default {
  name: 'nova_senha',
  data(){
    return {
      cod: '',
      new: '',
      repeat: '',
      year: new Date().getFullYear()
    }
  },
}

</script>

<style scoped>
  @media (max-height: 540px){
    footer{
      display: none
    }
  }
  @media (max-width: 600px) {
    img {
      width: 90%;
    }
  }
  strong{
    color: #57A695;
  }
</style>