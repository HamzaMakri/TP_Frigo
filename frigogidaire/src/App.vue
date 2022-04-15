<script setup>


import Frigo from "./components/Frigo.vue";
import Freezer from "./components/Freezer.vue";
import Produit from "./model/produit.js";
import Screen from "./components/Screen.vue";
import { ref } from "vue";
import { reactive, onMounted } from "vue";

const screenDisplay =  ref(false) // Boolean permettant de savoir si l'écran est affiché ou non
const isFridgeOpen = ref(); // Boolean permettant de savoir si le frigo est ouvert
const products = reactive([]); // Liste des produits
const url ='https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits';

const liste = ref(null); // Ref vers la liste des produits

// Au montage de la page ...
onMounted(() => {
    liste.value.getAllProducts() // ..on charge la liste des produits
    alert("Bonjour et bienvenue dans mon Frigogidaire ! \n Afin de réaliser ce Frigo je me suis inspiré d'un dessin animé d'enfance, Oggy et les cafards \n Ce frigo est composé de 2 parties : \n -  Une première avec le frigo demandé où les aliments s'affichent. Si il y a trop d'aliment, le frigo devient scrollable. Afin de ne pas empoisonner Oggy, le Frigo fait un tri des aliments et affiche une icone en fonction de la commestibilité de celui-ci pour un chat. \n - Une deuxième partie avec le Freezer QU'IL NE FAUT SURTOUT PAS OUVRIR !! Si en vrai ouvrez la mais attention aux cafards qui vous voleront des produits aléatoirement, si vous ne le refermez pas vite, ils mangeront tout ! \n Voili voilou, je vous laisse tester toutes les fonctionnalités de vous même \n Merciiii !! \n\n PS : N'oubliez pas de cliquer sur la tablette située sur la porte du frigo avant de l'ouvrir si vous voulez voir les produits s'ajouter en temps réel \n #PrenonsSoinD'Oggy" )
})

// Handler : Permet d'afficher l'écran de la tablette du frigo
function displayScreen(){
  screenDisplay.value = !screenDisplay.value;
  console.log(screenDisplay.value);
}

// Handler : Ouvre ou ferme le frigo
function frigdeDoorInteraction() {
  isFridgeOpen.value = !isFridgeOpen.value;
  liste.value.getAllProducts() // on met à jour la liste à l'ouverture
}


// Handler : Met à jour la liste des produits
function updateFrigo(){
  liste.value.getAllProducts();
}

// Handler : Met à jour la liste des produits avec les produits dont le nom contient le filtre passé en parametre
function filterList(filter) {
  liste.value.filterList(filter);
}

// Handler : Supprime un produit de la liste de maniere aléatoire
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
