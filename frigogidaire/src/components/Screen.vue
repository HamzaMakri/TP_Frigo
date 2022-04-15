<template>
  <div id="screen">
    <div id="add">
      <h2>Ajouter un produit :</h2>
      <input type="text" v-model="nom" />
      <input type="number" min="1" v-model="qte" />
      <button @click="addNewProduct()">Ajouter</button>
    </div>

    <div id="filter">
      <h2>Rechercher :</h2>
      <input id="searchBar" type="text" v-model="filter" @change="emit('search', filter)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let nom = ref("");
let filter = ref("");
let qte = ref(0);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits";

const emit = defineEmits(["updateFridgeDisplay", "search"]);

function addNewProduct() {
  if (qte.value > 0) {
    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ nom: nom.value, qte: qte.value }),
    };

    fetch(url, fetchOptions)
      .then((result) => result.json())
      .then((json) => {
        if (json.status == 1) {
          // APPELER LA FONCTION QUI GET LA LISTE DES PRODUITS
          emit("updateFridgeDisplay", json);
        }
      })
      .catch((e) => console.log(e));
  } else {
    window.alert("La quantité de produit doit être > 0");
  }
}
</script>

<style>

input {
  border: 2px solid rgb(114, 114, 114);
  border-radius: 4px;
  text-align: center;
  color: rgb(192, 192, 192);;
  background-color: black;
  margin: 5px;
}

#filter {
  height: 50%;
  width: 100%;
}

#add {
  height: 50%;
  width: 100%;
}

#screen {
  height: 500px;
  width: 350px;
  background-color: rgb(0, 0, 0);
  margin: 20px;
  border-radius: 2%;
  border: solid 2px rgb(104, 104, 104);
  
}

#screen:hover{
    box-shadow: 0px 0px 20px 5px rgb(99, 99, 99);

}

#screen * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>