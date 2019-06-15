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
      let data = {};
      let type, titleStructure;
      const metadata = file.name.split("_");

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
    validateFile(file) {
      return file.type === "audio/wav";
    }
  }
};
