<template>
<div>
  <c-header></c-header>

  <q-list no-border multiline>
    
    <!--<q-item class="titleBook">
      <q-item-side>
        <img src="~icones/editar.png" width="50px">
      </q-item-side>
      <q-item-main style="font-size: 30px">cadastro documento</q-item-main>
    </q-item>-->
    
    <q-item class="titleBook" id="titleCad">
      <q-item-main>Cadastro Documento</q-item-main>
    </q-item>

    <!--<q-item class="titleBook">
      <q-item-main>
        <div class="name">{{nome.nome}}</div>
      </q-item-main>
    </q-item>-->
    
    <form>
      
      <select required style="margin: 2% 5%" class="bookSelect" v-model="select">
        <option value="" disabled selected hidden>documento ...</option>
        <option v-for="doc in documentos">{{doc}}</option>
      </select>
      
      <!--CPF-->
      <div v-if="select === 'CPF'">
        <the-mask :mask="['###.###.###-##']" 
                  placeholder="CPF ..."
                  style="margin: 2% 5%"
                  class="bookInput"
                  v-model="cpf.numero"
        />
      </div>
      
      <!--CNPJ-->
      <div v-if="select === 'CNPJ'">
        <the-mask :mask="['##.###.###/####-##']"
                  placeholder="CNPJ ..."
                  style="margin: 2% 5%"
                  class="bookInput"
                  v-model="cnpj.numero"
        />
      </div>
      
      <!--IE-->
      <div v-if="select === 'IE'">
        <input class="bookInput"
               placeholder="Inscição Estadual ..."
               style="margin: 2% 5%"
               v-model.number="ie.numero"
        />
      </div>
      
      <!--RG-->
      <div v-if="select === 'RG'">
        <input class="bookInput"
               placeholder="RG ..."
               style="margin: 2% 5%"
               v-model.number="rg.numero"
        />
        <input id="#dataExp"
               type="text"
               class="bookInput"
               placeholder="expedição ..."
               style="margin: 2% 5%"
               v-model="dataExped"
               maxlength="10"
               @keyup="maskDV"
               @blur="toUTC(dataExped)"
               
        />
        <input class="bookInput"
               placeholder="org. emissor ..."
               v-model="pessoaEmissor.nome"
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="pai ..."
               style="margin: 2% 5%"
               v-model="rg.nomePai"
        />
        <input class="bookInput"
               placeholder="mãe ..."
               style="margin: 2% 5%"
               v-model="rg.nomeMae"
        />
        <select style="margin: 2% 5%" class="bookSelect" v-model="rg.idCidade">
          <option value="" disabled selected>naturalidade ...</option>
          <option v-for="cidade in cidades" :value="cidade.idCidade">{{cidade.nome}}</option>
        </select>
        
        <input class="bookInput"
               type="text"
               placeholder="nascimento ..."
               style="margin: 2% 5%"
               v-model="dataInicio"
               @keyup="maskDP"
               @blur="toUTC2(dataNasc)"
        />      
          
      </div>
      
      <!--TITULO-->
      <div v-if="select === 'TíTULO'">
        <input class="bookInput"
               placeholder="número ..."
               style="margin: 2% 5%"
               type="number"
               v-model.number="titulo.numero"
        />
        <input class="bookInput"
               placeholder="zona ..."
               style="margin: 2% 5%"
               type="number"
               v-model="titulo.zona"
        />
        <input class="bookInput"
               placeholder="seção ..."
               style="margin: 2% 5%"
               type="number"
               v-model="titulo.secao"
        />
        <select style="margin: 2% 5%" class="bookSelect" v-model="titulo.idCidade">
          <option value="" disabled selected>município ...</option>
          <option v-for="cidade in cidades" :value="cidade.idCidade">{{cidade.nome}}</option>
        </select>
        <input class="bookInput"
               placeholder="uf ..."
               style="margin: 2% 5%"
               v-model="titulo.uf"
               maxlength="2"
               @change="uppercaser()"
        />
        <input class="bookInput"
               type="text"
               placeholder="nascimento ..."
               style="margin: 2% 5%"
               v-model="dataNasc"
               @keyup="maskDP"
               @blur="toUTC2(dataNasc)"
        />
      </div>
      
      <!--CTPS-->
      <div v-if="select === 'CTPS'">
        <input class="bookInput"
               placeholder="PIS/PASEP ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="número ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="série ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="uf ..."
               style="margin: 2% 5%"
        />
      </div>
      
      <!--CNH-->
      <div v-if="select === 'CNH'">
        <input class="bookInput"
               placeholder="número ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="categoria ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="1ª habilitação ..."
               style="margin: 2% 5%"
        />
        <input class="bookInput"
               placeholder="validade ..."
               style="margin: 2% 5%"
        />
      </div>
      

      
      <!--Botoes-->
      <div class="row">
        <div class="col text-left">
          <button class="backButton" 
              @click="$router.go(-1)"
              style="margin: 10% 0 0 10%"
              >voltar</button>
  
          
        </div>
        <div class="col text-right">
          <button class="bookButton" 
              @click="salvar"
              style="margin: 10% 10% 0 0"
              >salvar</button>
        </div>
      </div>
      
    </form>
    
  </q-list>
</div>

</template>

<script>
import API from 'data/config.js'
import axios from 'axios'
import { Loading, Toast } from 'quasar'
import cHeader from 'components/Header.vue'

function convertData(value){
  let c = value
  let d = c.substring(0,2)
  let m = c.substring(3,5)
  let y = c.substring(6,10)
  let dia = parseInt(d)
  let mes = parseInt(m)
  
  if(dia > 31 || mes > 12){
    Toast.create("Verifique a data, dia ou mês está fora do intervalo adequado")
    return
  }
  
  let data = new Date(y + '-' + m + '-' + d + 'T00:00:00').toISOString()
  
  return data.split('.').shift()

}

export default {
  name: 'L0202_2210_documento',
  components: { cHeader },
  data(){
    return{
      tela: localStorage.getItem('tela'),
      API,
      pessoa: '',
      select: '',
      nome: '',
      cpf: {
        idPessoaEmissor: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        numero: '',
        idUsuario: 1
      },
      cnpj: {
        idPessoaEmissor: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        numero: '',
        idUsuario: 1
      },
      ie: {
        idPessoaEmissor: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        numero: '',
        idUsuario: 1
      },
      rg: {
        dhCriacao: new Date().toISOString(),
        idEstacao: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        pessoaEmissor:{
          nome: '',
          CRT: 1,
          genero: 'M',
        },
        idStatusReg: 1,
        idUsuario: 1,
        numero: '',
        nomePai: '',
        nomeMae: '',
        dataExped: '',
        uf: 'BA',
        idCidade: '',
      },
      titulo: {
        dhCriacao: new Date().toISOString(),
        idEstacao: 1,
        idPessoa: parseInt(localStorage.getItem('idPessoa')),
        idPessoaEmissor: 1,
        idStatusReg: 1,
        idUsuario: 1,
        numero: '',
        registroAtivo: true,
        secao: '',
        uf: '',
        zona: '',
        idCidade: '',
      },
      pessoaEmissor:{
        nome: '',
        CRT: 2,
        genero: 'M',

      },
      dataInicio: '',
      documentos: [], 
      docPF: [ 'CPF', 'RG', 'TíTULO'], //, 'CTPS', 'CNH'],
      docPJ: [ 'CNPJ', 'IE'],
      cidades: [],
      cidade: '',
      dataExped: '',
      dataNasc: '',
      idPessoa: parseInt(localStorage.getItem('idPessoa')),
      metodo: ''
      
    }
  },
  methods:{
    voltar(){
      window.history.back()
      
      /*if(localStorage.getItem('setor') === 'empresa'){
        this.$router.push('/empresas')
      }
      else{
        this.$router.push('/pessoas')
      }*/
    },
    uppercaser(){
      this.titulo.uf = this.titulo.uf.toUpperCase()
    },
    maskDV(){
      if(this.dataExped.substring(0,1) !== '1' &&
         this.dataExped.substring(0,1) !== '2' &&
         this.dataExped.substring(0,1) !== '3' &&
         this.dataExped.substring(0,1) !== '4' &&
         this.dataExped.substring(0,1) !== '5' &&
         this.dataExped.substring(0,1) !== '6' &&
         this.dataExped.substring(0,1) !== '7' &&
         this.dataExped.substring(0,1) !== '8' &&
         this.dataExped.substring(0,1) !== '9' &&
         this.dataExped.substring(0,1) !== '0'){
        this.dataExped = ''
        return
      }
      
      let v = this.dataExped;
      if (v.match(/^\d{2}$/) !== null) {
          this.dataExped = v + '/';
      } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
          this.dataExped = v + '/';
      }
    },
    maskDP(){
      if(this.dataExped.substring(0,1) !== '1' &&
         this.dataExped.substring(0,1) !== '2' &&
         this.dataExped.substring(0,1) !== '3' &&
         this.dataExped.substring(0,1) !== '4' &&
         this.dataExped.substring(0,1) !== '5' &&
         this.dataExped.substring(0,1) !== '6' &&
         this.dataExped.substring(0,1) !== '7' &&
         this.dataExped.substring(0,1) !== '8' &&
         this.dataExped.substring(0,1) !== '9' &&
         this.dataExped.substring(0,1) !== '0'){
        this.dataExped = ''
        return
      }
      let v = this.dataNasc;
      if (v.match(/^\d{2}$/) !== null) {
          this.dataNasc = v + '/';
      } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
          this.dataNasc = v + '/';
      }
    },
    toUTC(value){
      let data = convertData(value)
      this.rg.dataExped = data
    },
    toUTC2(value){
      let data = convertData(value)
      this.dataInicio = data
    },
    obterPessoa(){
      let url
      if(localStorage.getItem('setor') === 'empresa'){
        url = this.API + 'pessoas/obterPJ?IdPessoa=' + localStorage.getItem('idPessoa')
      }
      else{
        url = this.API + 'pessoas/obterPF?IdPessoa=' + localStorage.getItem('idPessoa')
      }
      
      console.log('url: ', url)
      
      Loading.show()
      axios.get(url)
      .then((res) => {
        Loading.hide()
        console.log('pessoa', res)
        this.pessoa = res.data.data
        this.nome = this.pessoa.pessoa
        if(this.pessoa.cnpj){
          this.cnpj = this.pessoa.cnpj
        }
        if(this.pessoa.ie){
          this.ie = this.pessoa.ie
        }
        if(this.pessoa.cpf){
          this.cpf = this.pessoa.cpf
        }
        if(this.pessoa.rg){
          this.rg = this.pessoa.rg
          let dataExped = new Date(this.rg.dataExped).toLocaleString()
          this.dataExped = dataExped.split(' ').shift()
          let dataInicio = new Date(this.pessoa.dataInicio).toLocaleString()
          this.dataInicio = dataInicio.split(' ').shift()
        }
        if(this.pessoa.tituloEleitor){
          this.titulo = this.pessoa.tituloEleitor
        }
          
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    obterCidades(){
      Loading.show()
      axios.get(this.API + 'tipos/cidades')
      .then((res) => {
        Loading.hide()
        console.log('cidades', res)
        this.cidades = res.data.data
      })
      .catch((e) => {
        Loading.hide()
        console.log(e)
      })
    },
    salvar(){
      let pessoa = { pessoa: this.nome }
      
      switch (this.select){
        case 'CNPJ':
          pessoa.cnpj = this.cnpj
          
          break;
        
        case 'IE':
          pessoa.ie = this.ie
          
          break;
        
        case 'CPF':
          pessoa.cpf = this.cpf
          
          break;
        
        case 'RG':
          pessoa.rg = this.rg
          if(this.dataInicio){
            pessoa.dataInicio = this.dataInicio
          }
          if(this.pessoaEmissor.nome){
            pessoa.rg.pessoaEmissor.nome = this.pessoaEmissor.nome
            console.log('pessoa', pessoa.rg.pessoaEmissor.nome);
          }
          break;
        default:
          pessoa.tituloEleitor = this.titulo
          break;
      }
      
      Loading.show()
      axios.post(this.API + this.metodo, pessoa)
      .then((res) => {
        Loading.hide()
        console.info(res)
        if(res.status === 200){
          this.$router.push('sucesso')
        }
        
      })
      .catch((e) => {
        Loading.hide()
        console.log(e.response)
        let erro = e.response.data.exception.Message
        console.log('erro', erro);
        Toast.create({
          html: erro,
          timeout: 5000,
        })
      })
    },
    mascaraData(val){
      var pass = val.value;
      var expr = /[0123456789]/;

      for (i = 0; i < pass.length; i++) {
        // charAt -> retorna o caractere posicionado no índice especificado
        var lchar = val.value.charAt(i);
        var nchar = val.value.charAt(i + 1);

        if (i == 0) {
          // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
          // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
          // instStr.search(expReg);
          if ((lchar.search(expr) != 0) || (lchar > 3)) {
            val.value = "";
          }

        } else if (i == 1) {

          if (lchar.search(expr) != 0) {
            // substring(indice1,indice2)
            // indice1, indice2 -> será usado para delimitar a string
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
            continue;
          }

          if ((nchar != '/') && (nchar != '')) {
            var tst1 = val.value.substring(0, (i) + 1);

            if (nchar.search(expr) != 0)
              var tst2 = val.value.substring(i + 2, pass.length);
            else
              var tst2 = val.value.substring(i + 1, pass.length);

            val.value = tst1 + '/' + tst2;
          }

        } else if (i == 4) {

          if (lchar.search(expr) != 0) {
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
            continue;
          }

          if ((nchar != '/') && (nchar != '')) {
            var tst1 = val.value.substring(0, (i) + 1);

            if (nchar.search(expr) != 0)
              var tst2 = val.value.substring(i + 2, pass.length);
            else
              var tst2 = val.value.substring(i + 1, pass.length);

            val.value = tst1 + '/' + tst2;
          }
        }

        if (i >= 6) {
          if (lchar.search(expr) != 0) {
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
          }
        }
      }

      if (pass.length > 10)
        val.value = val.value.substring(0, 10);
      return true;
    }
    
  },
  mounted(){
    this.obterPessoa()
    this.obterCidades()
    if(localStorage.getItem('setor') === 'empresa'){
      this.documentos = this.docPJ
      this.metodo = 'pessoas/insertPJ'
    }
    else{
      this.documentos = this.docPF
      this.metodo = 'pessoas/insertPF'
    }
    localStorage.setItem('tela', 'Documentos')
  }
}
</script>

<style scoped>
  .addLogo{
    font-size: 35px;
    color: #BCBDC0;
    margin: 15px 90px 0 0
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
</style>
