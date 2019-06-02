export let parser = {
  data() {
    return {
      files: [],
      titleStructures: {
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
      },
      structuredData: []
    };
  },
  methods: {
    parseFile(fileName) {
      let data = {};
      const metadata = fileName.split("_");
      const type = metadata[0];

      const titleStructure = titleStructures[type];

      for (let i = 0; i < titleStructure[type].length; i++) {
        data[titleStructure[i]] = metadata[i];
      }
      return data;
    }
  }
};
