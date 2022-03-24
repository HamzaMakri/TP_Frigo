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



function displayScreen(){
  screenDisplay.value = !screenDisplay.value;
  console.log(screenDisplay.value);
}

function frigdeDoorInteraction() {
  isFridgeOpen.value = !isFridgeOpen.value;
  getAllProducts()
}

function getAllProducts() {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {

      console.log(json);

      products.splice(0, products.length);

      json.forEach((product) => {
        products.push(new Produit(product.nom, product.qte, product.id));
      });
        console.log(products);
    })
    .catch((e) => console.log(e));
}


</script>

<template>

  <div id="frigogidaire">
    <Freezer />
    <Frigo
      @displayScreen="displayScreen"
      @frigdeDoorInteraction="frigdeDoorInteraction"
    ></Frigo>

  </div>

  
  <Screen v-if="screenDisplay" />

  

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
