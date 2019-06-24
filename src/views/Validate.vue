<template>
  <div class="page diagonal-background">
    <div class="loader white-border on-bottom" v-if="loadingData"></div>
    <transition name="fade-in">
      <div class="validator" v-if="!loadingData">
        <div class="file-info">
          <button class="audio-button" @click="toggleAudio">
            <img src="../assets/play.svg" alt="toggle">
            <audio ref="audio"></audio>
          </button>
          <ul class="file-fields">
            <li v-for="(value, key) in currentData"
                v-bind:key="value.timestamp"
                >
              {{key}}:{{value}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import parser from '../mixins/parser';

export default {
  mixins: [parser],
  data() {
    return {
      fileFields: [],
      loadingData: true,
      currentData: {},
      validatedData: {},
    };
  },
  computed: {
    unvalidatedData() {
      return this.$store.state.unvalidatedData;
    },
  },
  methods: {
    postValidations() {
      // insert loader
      this.$store
        .dispatch('uploadFiles', this.validatedData)
        .then(console.log('turn off loader'));
    },
    nextFile() {
      this.$store.commit('popUnvalidatedData');
      this.currentData = this.parseFile(this.unvalidatedData[0]);
    },
    toggleAudio() {
      console.log(this.$refs.audio);
      console.log('pressed audio button');
    },
  },
  mounted() {
    if (this.unvalidatedData.length > 0) {
      this.currentData = this.parseFile(this.unvalidatedData[0].file);
      this.$refs.audio.src = URL.createObjectURL(this.unvalidatedData[0].file);
    } else {
      console.warn("couldn't find currentData");
    }
  },
};
</script>

<style>
.validator {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;

  grid-template-rows: 4fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "validation validation validation validation validation"
    "left approve center deny right";
}
.file-info {
  background: #e3e3e3;
  height: auto;
  grid-area: validation;
  border-radius: 10px;
}

.audio-button {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--accent);
  border: none;
}

.audio-button img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}

#audioEl {
  display: none;
}
.file-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
}

.on-bottom {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity;
}
</style>
