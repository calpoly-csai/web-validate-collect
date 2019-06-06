<template>
  <div
    class="page uploads diagonal-background"
    @dragover.prevent="handleDrag"
    @dragend="handleDragEnd"
    @dragleave="handleDragEnd"
    @drop.prevent.stop="getDroppedFiles"
  >
    <h1 class="page-title uploads-title">Uploads</h1>
    <ul class="files">
      <transition-group name="drop" mode="out-in">
        <li
          v-for="file in files"
          class="file"
          :class="{selectedUpload: file.isSelected}"
          @click="file.selected = !file.isSelected"
          :key="file.metadata.timestamp"
        >
          <img :src="require(`@/assets/${file.metadata.type}-tag.svg`)" alt>
          <h3 class="subject-descriptor">Subject</h3>
          <h3 class="subject-value">{{file.metadata.firstName + " " + file.metadata.lastName}}</h3>
          <h3 class="description-descriptor">Description</h3>
          <h3 class="description-value">{{file.metadata.description}}</h3>
          <h3 class="location-descriptor">Location</h3>
          <h3 class="location-value">{{file.metadata.location}}</h3>
        </li>
      </transition-group>
    </ul>
    <div class="task-bar">
      <button v-if="files.length > 0" @click="uploadFiles" class="send-button">Send</button>
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
import { Promise } from "q";
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
    getDroppedFiles(event) {
      this.dropPostion.active = false;
      event.preventDefault();
      const { files } = event.dataTransfer;
      for (let file of files) {
        const data = this.parseFile(file);
        console.log("data: ", data);
        if (!data) {
          //Display the failure in the app
          console.log("file could not be parsed");
          return;
        }
        this.files.push({ metadata: data, contents: file, isSelected: false });
      }
    },
    handleDrag(event) {
      const squareMid = 37.5;
      this.dropPostion.active = true;
      this.dropPostion.x = event.x - squareMid + "px";
      this.dropPostion.y = event.y - squareMid + "px";
    },
    handleDragEnd() {
      this.dropPostion.active = false;
    },
    getTag(type) {
      if (type === "ww") {
        console.log("identified as ww");
        return "../assets/ww-tag.svg";
      } else if (type == "nww") {
        return "../assets/nww-tag.svg";
      } else {
        console.warn(`couldn't identify type of ${type}`);
      }
    },
    uploadFiles() {
      this.$store.dispatch("uploadFiles", this.files);
      this.files = [];
    }
  }
};
</script>

<style>
.uploads {
  display: grid;
  grid-template-rows: 100px 1fr 20px;
  grid-template-columns: 100px 1fr 20px;
  grid-template-areas:
    "buffer-left header buffer-right"
    "buffer-left files buffer-right"
    "buffer-left buffer-bottom buffer-right";
}

.page-title {
  text-align: center;
}

.uploads-title {
  grid-area: header;
}
.files {
  position: relative;
  grid-area: files;
}

.file {
  cursor: default;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "tag buffer-top buffer-top buffer-top"
    "tag subject description location"
    "tag subjectVal descriptionVal locationVal"
    "tag buffer-bottom buffer-bottom buffer-bottom";
  position: relative;
  width: 70%;
  height: 50px;
  background-color: #d8d8d8;
  border-radius: 5px;
  margin: 10px auto;
}
.file h3 {
  font-size: 0.5em;
}

.file img {
  grid-area: tag;
  height: 100%;
}

.subject-descriptor,
.description-descriptor,
.location-descriptor {
  text-align: left;
  font-size: 50px;
}

.subject-value,
.description-value .location-value {
  text-align: left;
  font-size: 1.5rem;
}

.subject-descriptor {
  grid-area: subject;
  text-align: left;
}
.description-descriptor {
  grid-area: description;
}
.location-descriptor {
  grid-area: location;
}

.subject-value {
  grid-area: subjectVal;
}
.description-value {
  grid-area: descriptionVal;
}
.location-value {
  grid-area: locationVal;
}

.drop-square {
  pointer-events: none;
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

.task-bar {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.send-button {
  margin: 20px auto;
  color: white;
  border-color: white;
}
.selected-upload {
  border: 1px solid var(--accent);
}
.drop-enter {
  opacity: 0;
  transform: translateY(50px);
}
.drop-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.drop-enter-active,
.drop-leave-active {
  transition: transform 1s, opacity 1s;
}

.drop-move {
  transition: transform 0.7s;
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


