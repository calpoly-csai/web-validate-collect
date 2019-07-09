<template>
  <!-- TODO: change background -->
  <div class="page diagonal-background">
    <h1 class="page-title">Phrases</h1>
    <div class="dropdown-menu">
      <select>
        <option value="cat1">Cat1</option>
        <option value="cat2">Cat2</option>
        <option value="cat3">Cat3</option>
        <option value="cat4">Cat4</option>
      </select>
    </div>
    <div class="phrase-input-category-box is-centered">
      <div class="phrase-category-box">
        <button class="phrase-category-button">cat1</button>
        <button class="phrase-category-button">cat2</button>
        <button class="phrase-category-button">cat3</button>
        <button class="phrase-category-button">cat4</button>
      </div>
      <div class="phrase-input-box">
        <img src="../assets/start-quote.svg" alt="start-quote.svg">
        <input
          type="text"
          placeholder="Phrase"
          class="phrase-input"
        >
        <img src="../assets/end-quote.svg" alt="end-quote.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>


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
}


select:focus {
  background-image:
    linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
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

