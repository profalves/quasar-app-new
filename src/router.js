import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () => import (`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
      { path: '/', component: load('login') },
      { path: '/hello', component: load('Hello') },
      { path: '/login', component: load('login') },
      { path: '/organizacoes', component: load('Organizacoes') },
      { path: '/perfis', component: load('Perfis') },
      { path: '/sucesso', component: load('confirm') },
      { path: '/empresas', component: load('Empresas') },
      { path: '/cadempresa', component: load('cadEmpresa') },
      { path: '/subempresa', component: load('cadEmpresa2') },
      { path: '/cademail', component: load('cadEmail') },
      { path: '/cadtelefone', component: load('cadTelefone') },
      { path: '/cadendereco', component: load('cadEndereco') },
      { path: '/caddocumento', component: load('cadDocumento') },
      { path: '/pessoas', component: load('Pessoas') },
      { path: '/cadpessoa', component: load('cadPessoa') },
      { path: '/subpessoa', component: load('cadPessoa2') },
      { path: '/carousel', component: load('Carousel') },
      { path: '/esqueci', component: load('Esqueci') },
      { path: '/novasenha', component: load('novaSenha') },
      { path: '/eventos', component: load('Eventos') },
      { path: '/cadevento', component: load('cadEvento') },
      { path: '/turmas', component: load('Turmas') },
      { path: '/cadturma', component: load('cadTurma') },
      { path: '/acompanhamento', component: load('AcompFisico') },
      { path: '/cadacompanhamento', component: load('cadAcFisico') },
      { path: '/acompindividual', component: load('AcFisicoUser') },

      // Always leave this last one
      { path: '*', component: load('Error404') }, // Not found
                             
      // Ambiente de testes
      { path: '/teste', component: load('Test') }, // testes
      { path: '/sliding', component: load('optionSliding') } // testes
  ]
})