<template >
  <div v-if="open" id="openedFridge" class="frigo">
    <div id="fridgeBody_opened">
      <div class="trapeze"></div>
      <div class="trapeze"></div>
      <div class="trapeze"></div>
      <div class="trapeze"></div>

      <div id="productContainer">
        <CaseProduit
          v-for="product in data.products"
          :key="product.id"
          :product="product"
          @minus="() => minusOne(product)"
          @plus="() => plusOne(product)"
          @delete="() => deleteProduct(product)"
        ></CaseProduit>
      </div>
    </div>

    <div
      @click="
        door();
        $emit('frigdeDoorInteraction');
      "
      id="fridgeDoor"
    ></div>
  </div>

  <div v-else id="closedFridge" class="frigo">
    <div
      @click.self="
        door();
        $emit('frigdeDoorInteraction');
      "
      id="fridgeBody_closed"
    >
      <div @click="$emit('displayScreen')" id="miniScreen"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Produit from "../model/produit";
import CaseProduit from "./subComponents/TemplateProductInFridge.vue";
import { reactive, onMounted } from "vue";

const open = ref(false);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits";

const data = reactive({
  products: [],
});

defineExpose({
  // On expose les méthodes pour être utilisée par le parent
  getAllProducts,
  filterList,
  stealRandom,
});

// Appel API pour recuperer la liste des produits
function getAllProducts() {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      data.products.splice(0, data.products.length);
      json.forEach((product) => {
        data.products.push(new Produit(product.nom, product.qte, product.id));
      });
    })
    .catch((e) => console.log(e));
}

// Met à jour la liste des produits avec les produits dont le nom contient le filtre passé en parametre
function filterList(filter) {
  fetch(url + "?search=" + filter)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      data.products.splice(0, data.products.length);
      json.forEach((product) => {
        data.products.push(new Produit(product.nom, product.qte, product.id));
      });
      console.log(data.products);
    })
    .catch((e) => console.log(e));
}

// Supprime un produit passé en parametre
// Petit time out pour laisser le temps à l'appel API asynchrone de se terminer
function minusOne(product) {
  document.getElementById("");
  product.minusOne(url);
  setTimeout(() => {
    filterList(document.getElementById("searchBar").value); // On appel la fonction filter et non getAllProducts afin de garder la frigo filtré apres la soustraction d'une quantité d'un produit
  }, 100);
}

// Ajoute un produit passé en parametre
// Petit time out pour laisser le temps à l'appel API asynchrone de se terminer
function plusOne(product) {
  product.plusOne(url);
  setTimeout(() => {
    filterList(document.getElementById("searchBar").value); // On appel la fonction filter et non getAllProducts afin de garder la frigo filtré apres l'ajout d'une quantité d'un produit
  }, 100);
}

// Supprime un produit passé en parametre
// Petit time out pour laisser le temps à l'appel API asynchrone de se terminer
function deleteProduct(product) {
  product.deleteSelf(url);
  setTimeout(() => {
    filterList(document.getElementById("searchBar").value); // On appel la fonction filter et non getAllProducts afin de garder la frigo filtré apres la suppression du produit
  }, 100);
}

// Inverse la valeur du boolean
function door() {
  open.value = !open.value;
}

// Genere un nombre aléatoire entre 0 et le nombre de produit dans la liste
// Recupere le produit et le supprime
function stealRandom() {
  if (data.products.length > 0) {
    let randomNb = Math.floor(Math.random() * data.products.length);
    let randomId = data.products[randomNb].displayId();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(url + "/" + randomId, fetchOptions)
      .then((result) => result.json())
      .then((json) => {
        if (json.status == 1) {
          //update la liste
          getAllProducts();
        }
      })
      .catch((e) => console.log(e));
  }
}
</script>


<style scoped>
#productContainer {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: scroll; /* Add the ability to scroll */

  width: 370px;
  height: 570px;
  top: 2px;

  padding-top: 10%;
}

#productContainer::-webkit-scrollbar {
  display: none;
}

#productContainer:first-child:nth-last-child(26),
#productContainer:first-child:nth-last-child(26) ~ #productContainer {
  width: 25%;
  background-color: blue;
}

.caisson_body {
  width: 300px;
  height: 600px;
  border-radius: 4%;
  background-color: beige;
}

#fridgeDoor:hover {
  cursor: grab;
}

#fridgeBody_closed:hover {
  cursor: grab;
}

#openedFridge {
  display: flex;
  justify-content: center;
}

#fridgeBody_opened {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 40px 0 25px 0;

  width: 400px;
  height: 600px;
  border-radius: 3%;
  border: pink solid 16px;
  outline: 5px ridge pink;
  outline-offset: -20px;
  background-color: rgb(166, 245, 245);
  box-shadow: 30px -2px 5px 0px rgb(231, 150, 199);
}

#fridgeBody_closed {
  margin-right: 300px;
  width: 400px;
  height: 600px;
  border-radius: 3%;
  background-color: rgb(240, 182, 217);
  box-shadow: 30px 0px 5px 0px rgb(231, 150, 199);
}

#fridgeDoor {
  width: 300px;
  height: 600px;

  background-color: rgb(140, 224, 224);

  outline: 5px ridge pink;
  outline-offset: -20px;

  border: pink solid 16px;
  border-radius: 3%;
}

#closedFridge {
  display: flex;
  justify-content: center;
}

.trapeze {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  height: 24px;
  width: 355px;
  border-bottom: 60px solid #c2fdf8af;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  box-shadow: 0px 3px 5px 0px rgb(255, 255, 255);
}

#miniScreen {
  border-radius: 10%;

  position: absolute;
  right: 15%;
  bottom: 50%;

  width: 20%;
  height: 20%;
  background-color: black;
}

#miniScreen:hover {
  cursor: pointer;
  box-shadow: 0px 0px 20px 5px rgb(250, 247, 247);
  background-image: url(../assets/tactile.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
 