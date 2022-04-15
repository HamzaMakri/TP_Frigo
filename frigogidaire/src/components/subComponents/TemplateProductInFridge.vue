<template>
  <div class="product">
    <span class="tooltiptext">{{ product.displayNom() }}</span>
    <div id="update">
      <div
        class="minus btn"
        @click="
          () => {
            $emit('minus', product);
          }
        "
      >
        <p>-</p>
      </div>

      <p class="qte">{{ product.displayQte() }}</p>

      <div
        class="plus btn"
        @click="
          () => {
            $emit('plus', product);
          }
        "
      >
        <p>+</p>
      </div>
    </div>
    <div class="image edible" v-if="isEdible(product.displayNom())">
      <img src="src\assets\catfood.png" alt="" />
    </div>
    <div class="image poison" v-else>
      <img src="src\assets\skull.png" alt="" />
    </div>

    <div
      class="delete"
      @click="
        () => {
          $emit('delete', product);
        }
      "
    >
      <img src="src\assets\trashcan.png" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import Produit from "../../model/produit";

defineProps(["product"]);

const edibles = [];

onMounted(() => {
  fetch("src/data/edibleList.json")
    .then((response) => response.json())
    .then((json) => {
      edibles.splice(0, edibles.length);
      json.forEach((edible) => {
        edibles.push(edible);
      });
    })
    .catch((e) => console.log(e));
});

function isEdible(test) {
  if (edibles.indexOf(test.trim().toLowerCase() )>-1) {
    return true;
  } else {
    return false
  }
}
</script>

<style scoped>

.qte{
  z-index: 2;
  color: black;
  font-weight: bolder;
  background-color: pink;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
}
.image {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.image > * {
  width: 100%;
  height: 100%;
}

.delete {
  position: absolute;
  top: -10px;
  right: -5px;
  width: 20px;
  height: 30px;
  display: flex;
  z-index: 2;
}

.delete:hover {
  cursor: pointer;
}

#update {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

#update div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.updateBtn {
  width: 30%;
  height: 30%;
  margin: 9px;
  border-radius: 40%;
}

.plus {
  right: -5px;
  background-color: rgb(42, 165, 48);
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.btn * {
  color: black;
  font-weight: bolder;
  font-size: larger;
}

.plus:hover {
  box-shadow: 5px 5px 7px rgb(88, 88, 88);
  cursor: pointer;
}

.minus {
  left: -5px;
  background-color: rgb(255, 41, 41);
}

.minus:hover {
  box-shadow: 5px 5px 7px rgb(88, 88, 88);
  cursor: pointer;
}

.product {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 70px;
  background-color: rgb(142, 214, 221);
  margin: 9px;
  border-radius: 30%;
  box-shadow: 5px 5px 7px rgb(88, 88, 88);
}

.product:hover {
  box-shadow: 5px 5px 7px rgb(241, 241, 241);
}

.product .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  /* Fade in product - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 1s;
}

.product:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>