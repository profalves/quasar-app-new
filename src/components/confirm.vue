<template>
  <div>
    <c-header></c-header>
    <div class="layout-padding center">
      <img src="~/icones/check-circle.gif"
           style="margin-top: 50px"
           />
    </div>
    <div class="msg">dados salvos</div>
  </div>
</template>

<script>
  import cHeader from 'components/Header.vue'
  export default{
    name: 'sucesso',
    components: { cHeader },
    mounted(){
      setTimeout(() => {
        if(localStorage.getItem('setor') === 'empresa'){
          this.$router.push('/subempresa')
        }
        else{
          this.$router.push('/subpessoa')
        }
      }, 5000)
    }
  }

</script>

<style scoped>
  .msg{
    text-align: center;
    font-size: 40px;
    color: #59A595; /* #00CFAD */
  }
  
</style>