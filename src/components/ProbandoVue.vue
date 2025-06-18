<template>
    <h1>
        Estoy probando
    </h1>
    <h2>
        {{ probando + numero }}
        {{ String(numero) + 2}}
        {{ calculo }}
    </h2>
    <button @click = "calculo = calculo + 1">sumar</button>
    <button @click = "ver = !ver">ver</button>
    <div v-if = "ver">Me ven</div>
    <div v-else >No me ven</div>
    <div v-if="calculo < 60 ">es menor a 60</div>
    <div v-else-if="calculo == 60">es 60</div>
    <div v-else>es mayor a 60</div>
    <h1>{{ texto }}</h1>
    <input type="text" v-model="texto">
    precio {{ iva * 1.22 }}
    <input type="number" v-model="iva" />
</template>

<script>


export default {
  name: 'ProbandoVue',
  components: {

  },
  props:{
    probando: String,
    numero: Number
  },
  data(){
    return{
        calculo: 50,
        ver: true,
        texto: "mi texto",
        iva: 22
    }
  }
}
</script>

<style>

</style>
