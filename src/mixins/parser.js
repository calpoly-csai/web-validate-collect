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
          "firstName",
          "lastName",
          "timestamp",
          "owner"
        ],
        notww: ["type", "description", "location", "noiseLevel", "timestamp"]
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
      let data = {};
      const metadata = file.name.split("_");
      const type = metadata[0];

      const titleStructure = this.fileStructures[type];

      for (let i = 0; i < titleStructure[type].length; i++) {
        try {
          data[titleStructure[i]] = metadata[i];
        } catch {
          return null;
        }
      }
      console.log("data: ", data);
      return data;
    }
  }
};
