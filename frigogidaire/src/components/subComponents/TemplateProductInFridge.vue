<template>
  <div class="product">
    <span class="tooltiptext">{{ product.displayNom() }}</span>
    <div id="update">
      <div
        class="minus"
        @click="
          () => {
            $emit('minus', product);
          }
        "
      ></div>

      <p>{{ product.displayQte() }}</p>

      <div
        class="plus"
        @click="
          () => {
            $emit('plus', product);
          }
        "
      ></div>
    </div>

    <div
      class="delete"
      @click="
        () => {
          $emit('delete', product);
        }
      "
    ></div>
  </div>
</template>

<script setup>
defineProps(["product"]);
</script>

<style scoped>
.delete {
  position: absolute;
  background-color: aquamarine;
  top: -10px;
  right: -5px;
  width: 20px;
  height: 30px;
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
}

.minus {
  left: -5px;
  background-color: rgb(255, 41, 41);
}

.product {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 70px;
  background-color: brown;
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