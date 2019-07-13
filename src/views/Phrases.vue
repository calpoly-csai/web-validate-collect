<script>
export default {
  data: function() {
    return {
      categories: ["Building", "Office Hours", "Professor", "create_placeholder?"],
      phrase: "",
    }
  },
  computed: { // return cached values until dependencies change
    tokens: function () {
      return this.tokenize()
    }
  },
  methods: {
    tokenize: function() { /// given a string, output an array of words
      let arr = this.phrase.split(/[ ?]/);
      // remove the last one if it's the empty string
      arr[arr.length - 1] == '' ? arr.pop() : null;
      return arr;
    }
  }
};
</script>


<template>
  <!-- TODO: change background -->
  <div class="page diagonal-background">
    <h1 class="page-title">Phrases</h1>
    <div class="dropdown-menu">
      <select>
        <option v-for="(cat, index) in categories" v-bind:key="index">
          {{ cat }}
        </option>
      </select>
    </div>
    <div class="phrase-input-category-box is-centered">
      <div class="phrase-category-box">
        <button class="phrase-category-button">Building</button>
        <button class="phrase-category-button">Office Hours</button>
        <button class="phrase-category-button">Professor</button>
        <button class="phrase-category-button">create_placeholder?</button>
      </div>

      <div class="phrase-input-box">
        <br>
        <strong>Input Example:</strong>
        <br><br>
        <input
          type="text"
          placeholder="Phrase Example"
          class="phrase-input"
          v-model="phrase"
        >
        <br><br>
      </div>

      <div v-if="this.phrase != ''" class="phrase-input-box">
        <br>
        <div><strong>Query:</strong></div>
        <img src="../assets/start-quote.svg" alt="start-quote.svg">
        <br>
        <div>
          <button v-for="(token, index) in this.tokens"
                  v-bind:key="index"
                  v-bind:class="{ 'data-button': true, 'selected': true }">
            {{ token }}
          </button>
        </div>
        <img src="../assets/end-quote.svg" alt="end-quote.svg">
      </div>

    </div>
  </div>
</template>

<style>

.data-button {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  margin: 0.5em;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  border-color: #2196F3;
  color: dodgerblue
}

.data-button:hover {
  background: #2196F3;
  color: white;
}

.data-button.selected {
  background: #2196F3;
  color: white;
}

select {
  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image:
    linear-gradient(135deg, green 50%, transparent 50%),
    linear-gradient(45deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}


select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}


.phrase-category-button {
  margin: auto;
  font-size: 100%;
  padding: 1em;
  border-radius: 10px;
  transition: background-color 0.5s, border-radius 0.5s;
  color: rgb(101, 138, 185);
  font-weight: 500; /* 400 is normal */
}

.phrase-category-button:hover {
  background-color: rgba(255, 255, 255, 0.26);
  border-radius: 15px;
}

.page-title {
  text-align: center;
  grid-area: header;
  margin-top: 30px;
}

.phrase-input-category-box {
  /* background-color: black; */
  text-align: center;
}

.phrase-input-box {
  background-color: rgb(236,236,236);
}

.phrase-input {
  width: 90%;
  text-align: center;
}

.phrase-category-box {
  background-color: rgb(226, 225, 225);
}

.phrase-category-button {

}

.is-centered {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>

