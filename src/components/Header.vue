<template>
  <div id="header">
    
    <div class="row">
      <div class="col-auto">
        <img src="../assets/logo.png" 
             class="avatar"
             style="margin: 5px"
        >
      </div>
      <div class="col title-book">
        Book360
      </div>
      <div class="col-auto text-right">
        <img src="../icones/logBookCorte.png" 
             width="100px"
             style="margin: 5px 0"
        >
      </div>
      <div class="col-auto text-right">
        <img src="../icones/19062043.jpg" 
             class="avatar"
             id="user"
             style="margin: 5px 6px 0 0"
        >
      </div>
    </div>
    <div class="row" style="margin:-15px 15px 0">
      <div class="col-7">
      </div>
      <div class="col">
        <div class="row text-right">
          <div class="col name text-right">
            Igor Rosa
            <br>
            <div class="subtitle">{{perfil}}</div>
          </div>
          <div class="col-auto">
            <i class="fa fa-cogs config"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      perfil: localStorage.getItem('perfil')
    }
  }
}
</script>

<style scoped>
  .title-book{
    margin: 5px;
    padding-top: 17px;
    font-size: 14px;
    height: 50px;
  }
  .text-book{
    color: #57A595;
  }
  .col{
    font-size: 13px;
  }
  #user{
    height: 70px;
    width: 70px;
  }
  .subtitle{
    font-size: 12px;
    padding-right: 3px;
  }
  .name{
    font-size: 14px;
  }
  .config{
    font-size: 27px;
    color: #E6E7E8;
  }
</style>

