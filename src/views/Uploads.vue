<template>
  <div
    class="page"
    @dragover.prevent="handleDrag"
    @dragend="handleDragEnd"
    @dragleave="handleDragEnd"
    @drop.prevent.stop="getFile"
  >
    <div class="files">
      <div v-for="file in files" class="file">
        <!-- <img src="../" alt> -->
      </div>
    </div>

    <div
      class="drop-indicator"
      :style="{top:dropPostion.y, left: dropPostion.x}"
      v-if="dropPostion.active"
    >
      <div class="drop-square base" style="{}"></div>
      <div class="drop-square accent"></div>
    </div>
  </div>
</template>

<script>
import parser from "../mixins/parser.js";
export default {
  mixins: [parser],
  data() {
    return {
      files: [],
      dropPostion: {
        x: "200px",
        y: "200px",
        active: false
      }
    };
  },
  methods: {
    getFile(event) {
      this.dropPostion.active = false;
      event.preventDefault();

      const file = event.dataTransfer.files[0];
      const data = this.parseFile(file);
      if (!data) {
        //Display the failure in the app
        console.log("file could not be parsed");
      }
      this.files.push({ data, file });
    },
    handleDrag(event) {
      const squareMid = 37.5;
      this.dropPostion.active = true;
      this.dropPostion.x = event.x + "px";
      this.dropPostion.y = event.y + "px";
    },
    handleDragEnd() {
      this.dropPostion.active = false;
    }
  }
};
</script>

<style>
.drop-square {
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 5px;
  border: 1px solid var(--dark);
  transform: translate(-100%, -50%);
}

.accent {
  animation: spin 2s linear infinite;
}

.base {
  animation: spin 1.5s linear infinite;
}

.drop-indicator {
  position: absolute;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


