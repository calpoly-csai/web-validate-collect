export default {
  data() {
    return {
      fileStructures: {
        ww: [
          "type",
          "gender",
          "description",
          "location",
          "noiseLevel",
          "lastName",
          "firstName",
          "timestamp",
          "owner"
        ],
        notww: ["type", "description", "location", "noiseLevel", "timestamp", "owner"]
      }
    };
  },
  methods: {
    /**
     *
     * @param {File} file
     *
     */
    parseFile(file) {
      if (!this.validateFile(file)) {
        return null;
      }
      return this.parseFileName(file.name);
    },
    parseFileName(fileName) {
      let data = {};
      let type, titleStructure;
      const metadata = fileName.slice(0, fileName.length - 4).split("_");

      type = metadata[0];
      titleStructure = this.fileStructures[type];
      if (!titleStructure) {
        return null;
      }

      for (let i = 0; i < titleStructure.length; i++) {
        try {
          data[titleStructure[i]] = metadata[i];
        } catch {
          return null;
        }
      }

      return data;
    },

    parseCamelCase(str) {
      return str
        .replace(/([A-Z])/g, " $1")
        .split(" ")
        .map(this.capitalize)
        .join(" ");
    },
    /**
     *
     * @param {*} data An unvalidated data object
     * Changes any acronyms in the object into the words they represent by mutating the object passed as an argument.
     */
    parseAcronyms(data) {
      const acronymMap = {
        type: { ww: "Wake Word", notww: "Not Wake Word" },
        gender: { m: "Male", f: "Female" },
        noiseLevel: { q: "Quiet", m: "Moderate", l: "Loud" }
      };

      for (let key in acronymMap) {
        if (data.hasOwnProperty(key)) {
          data[key] = acronymMap[key][data[key]];
        }
      }
      const descriptionWords = data.description.split("-");

      data.description =
        this.capitalize(descriptionWords[0]) + " " + descriptionWords.slice(1).join(" ");
      return data;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    capitalizeValues(data) {
      for (let key in data) {
        if (data[key] instanceof String) {
          data[key] = this.capitalize(data[key]);
        }
      }
      return data;
    },

    formatData(data) {
      return this.capitalizeValues(this.parseAcronyms(data));
    },
    validateFile(file) {
      return file.type === "audio/wav";
    }
  }
};
