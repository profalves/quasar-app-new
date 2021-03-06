// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import './components/index'
import cHeader from './components/Header'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueAwesomeSwiper, /* { default global options } */)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

// ============= FILTERS ============================

Vue.filter('formatMoney', function (value) {
  if (!value) { return 'R$ 0,00' }
  function numberToReal (numero) {
    numero = numero.toFixed(2).split('.')
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }
  let x = numberToReal(value)
  return x
})

Vue.filter('formatPerc', function (value) {
  if (!value) { return '0,00 %' }
  function numberToReal (numero) {
    numero = numero.toFixed(2).split('.')
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',') + ' %'
  }
  let x = numberToReal(value)
  return x
})

Vue.filter('formatDate', function (value) {
  if (value === null) { return null }
  return new Date(value).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString().toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.component('c-header', { cHeader })

var localforage = require('localforage')
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'bookDB'
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})
