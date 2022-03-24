<template>
  <div id="screen">
    <div id="add">

        <input type="text" v-model="nom" />
        <input type="number" v-model="qte" />
        <button @click="addProduct()">Acheter</button>


    </div>

    <div id="filter"></div>
  </div>
</template>

<script setup>

import {ref} from "vue";

let nom = ref("");
let qte = ref(0);
const url ='https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits';



function addProduct(){

console.log(nom.value);

  let myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ nom: nom.value, qte: qte.value}),
  };

  fetch(url, fetchOptions)
    .then((result) => result.json())
    .then((json) => {
      if (json.status == 1){
            // APPELER LA FONCTION QUI GET LA LISTE DES PRODUITS 
            updateFridgeDisplay() 
      }
    })
    .catch((e) => console.log(e));

}

function updateFridgeDisplay() {
        
}

</script>

<style>
#filter {
  height: 50%;
  width: 100%;
  background-color: rgb(100, 53, 9);
}

#add {
  height: 50%;
  width: 100%;
  background-color: blueviolet;
}

#screen {
  height: 500px;
  width: 350px;
  background-color: aquamarine;
}
</style>