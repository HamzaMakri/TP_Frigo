<template >
  <div v-if="open" id="openedFridge" class="frigo">
    <div id="fridgeBody_opened">
      <div class="trapeze"></div>
      <div class="trapeze"></div>
      <div class="trapeze"></div>
      <div class="trapeze"></div>

      <div id="productContainer">
        <CaseProduit
          v-for="product in products"
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
const products = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/19/produits";




function minusOne(product) {
    product.minusOne(url);

}

function plusOne(product) {
  product.plusOne(url);
}

function deleteProduct(product) {
  product.deleteSelf(url);
}

function door() {
  open.value = !open.value;
  getAllProducts();
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


<style scoped>
#productContainer {
  position: absolute;
  display: flex;
  flex-wrap: wrap;

  width: 370px;
  height: 570px;
  top: 2px;

  padding-top: 10%;
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

.frigo {
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
  position: absolute;
  right: 15%;
  bottom: 50%;

  width: 20%;
  height: 20%;
  background-color: black;
}
</style>
 