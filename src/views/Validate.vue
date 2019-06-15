<template>
  <div class="page diagonal-background">
    <div class="validator">
      <div class="file-info">
        <div class="audio-button"></div>
        <ul class="file-fields">
          <li v-for="(value, key) in currentData" :key="currentData.timestamp">{{key}}:{{value}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import parser from "../mixins/parser.js";
export default {
  mixins: [parser],
  data() {
    return {
      fileFields: [],
      currentData: {},
      validatedData: {}
    };
  },
  computed: {
    unvalidatedData() {
      return this.$store.state.unvalidatedData;
    }
  },
  methods: {
    postValidations() {
      //insert loader
      this.$store
        .dispatch("uploadFiles", this.validatedData)
        .then(res => console.log("turn off loader"));
    },
    nextFile() {
      this.$store.commit("popUnvalidatedData");
      this.currentData = this.parseFile(this.unvalidatedData[0]);
    }
  },
  mounted() {
    //TODO: this just fails because of .file
    if (this.unvalidatedData.length) {
      this.currentData = this.parseFile(this.unvalidatedData[0]);
    } else {
      console.warn("couldn't find currentData");
    }
  }
};
</script>

<style>
.validator {
  display: grid;

  background: #e3e3e3;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 50px 1fr 50px;
  grid-template-areas: ".left header .right" ".left fields .right";
}
.file-info {
  width: 500px;
  height: auto;
  grid-area: fields;
  border-radius: 10px;
}
.file-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
}
</style>

