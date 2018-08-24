<template>
  <swiper ref="mySwiper"
          :options="swiperOption" 
          style="padding: 10px;"
          
          >
    <!-- slides -->
    <swiper-slide>
      <img src="../assets/logo.png" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide1" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide2" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide3" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide4" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide5" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    <swiper-slide>
      <img :src="slides.slide6" 
           class="avatar"
           style="margin: 5px"
           @click="$router.push('/perfis')"
      >
    </swiper-slide>
    
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import slides from 'data/images.js'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        slides,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(0, 1000, false)
    }
  }
</script>
<style scoped>
  .avatar {
    height: 80px;
    width: 80px;
  }
  .swiper-pagination{
    margin-bottom: -15px;
    height: 20px;
    color: #57A695 !important;
  }
  .swiper-pagination-bullet .swiper-pagination-bullet-active{ 
    color: #57A695 !important;
    background-color: #57a695;
  }
</style>