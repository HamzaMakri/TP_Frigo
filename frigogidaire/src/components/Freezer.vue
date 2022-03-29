<template >
  <div v-if="open" id="openedFreezer" class="freezer">


    <div id="freezerBody_opened">
            <div class="trapeze"></div>
    </div>



    <div @click="door()" id="freezerDoor">
            <audio id="audio" src="../assets/generique-oggy-et-les-cafards-gaumont.mp3"></audio>
    </div>



  </div>

  <div v-else id="closedFreezer" class="freezer">
    <div @click="door()" id="freezerBody_closed"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
console.log(open.value);

function door() {
  console.log("bjfehbrf");
  open.value = !open.value;
  
}
</script>


<style scoped>
.caisson_body {
  width: 300px;
  height: 600px;
  border-radius: 4%;
  background-color: beige;
}

#openedFreezer {
  display: flex;
  justify-content: center;
}

#freezerBody_opened {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 400px;
  height: 250px;
  padding-bottom: 27px;
  border: pink solid 16px;
  border-radius: 3%;
  background-color: rgb(166, 245, 245);
  outline: 5px ridge pink;
  outline-offset: -20px;
  box-shadow: 30px 2px 5px 0px rgb(231, 150, 199);

}

#freezerBody_closed {
  margin-right: 300px;
  width: 400px;
  height: 250px;
  border-radius: 3%;
  background-color: rgb(240,182,217);
  box-shadow: 30px 2px 5px 0px rgb(231, 150, 199);

}

#freezerDoor {
  width: 300px;
  height: 250px;
  border: pink solid 16px;
    background-color: rgb(140, 224, 224);
  border-radius: 3%;
  outline: 5px ridge pink;
  outline-offset: -20px;
}

#closedFreezer {
  display: flex;
  justify-content: center;
}

.freezer {
  margin-top: 60px;
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

  ;
 }
</style>
 