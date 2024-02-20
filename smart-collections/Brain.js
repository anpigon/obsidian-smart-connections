const { LongTermMemory } = require('./long_term_memory'); // Adjust the path as necessary

class Brain {
  constructor(ltm_adapter = LongTermMemory) {
    this.config = {};
    this.item_types = {};
    this.collections = {};
    this.ltm_adapter = ltm_adapter;
    this.data_path = "./test/data";
  }
  init() {
    this.load_collections();
  }
  load_collections() {
    Object.entries(this.collections).map(([collection_name, collection]) => this[collection_name] = collection.load(this));
  }
  get_ref(ref) {
    return this[ref.collection_name].get(ref.key);
  }
}

module.exports = { Brain };
