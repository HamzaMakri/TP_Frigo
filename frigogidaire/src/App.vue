<script setup>


import Frigo from "./components/Frigo.vue";
import Freezer from "./components/Freezer.vue";
import Produit from "./model/produit.js";
import Screen from "./components/Screen.vue";
import { ref } from "vue";
import { reactive, onMounted } from "vue";

const screenDisplay =  ref(false)
const isFridgeOpen = ref();
const products = reactive([]);
const url ='https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits';

const liste = ref(null); //Ref vers la liste des produits

onMounted(() => {
    liste.value.getAllProducts()
})


function displayScreen(){
  screenDisplay.value = !screenDisplay.value;
  console.log(screenDisplay.value);
}

function frigdeDoorInteraction() {
  isFridgeOpen.value = !isFridgeOpen.value;
  liste.value.getAllProducts()
}

function updateFrigo(){
  console.log(liste);
  liste.value.getAllProducts();
  
}

/*
function getAllProducts() {
    console.log('Get de App');

    fetch(url)
    .then((response) => response.json())
    .then((json) => {

      console.log(json);
      products.splice(0, products.length);
      json.forEach((product) => {
        products.push(new Produit(product.nom, product.qte, product.id));
      });
    })
    .catch((e) => console.log(e));
}*/

function filterList(filter) {
  liste.value.filterList(filter);
}

function stealRandom() {
  liste.value.stealRandom();  
}

</script>

<template>

  <div id="frigogidaire">
    <Freezer
    @stealRandom="stealRandom"
    ></Freezer>


    <Frigo
      @displayScreen="displayScreen"
      @frigdeDoorInteraction="frigdeDoorInteraction"
      ref="liste"
    ></Frigo>

  </div>

  
  <Screen v-if="screenDisplay"
  @updateFridgeDisplay="updateFrigo"
  @search="filterList"
  />



</template>

<style >
@import "./assets/base.css";

#app{
  display: flex ;
  justify-content: center;
  align-items: center;
  
}

h1{
  color: aquamarine;
}


</style>
