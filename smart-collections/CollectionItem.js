const helpers = require("./helpers"); // Adjust the path as necessary
const { create_uid, deep_merge, collection_instance_name_from } = helpers;

class CollectionItem {
  static get defaults() {
    return {
      data: {
        key: null,
      },
    };
  }
  constructor(brain, data = null) {
    var _a;
    this.brain = brain;
    this.config = (_a = this.brain) == null ? void 0 : _a.config;
    this.merge_defaults();
    if (data) this.data = data;
    this.data.class_name = this.constructor.name;
  }
  merge_defaults() {
    let current_class = this.constructor;
    while (current_class) {
      for (let key in current_class.defaults) {
        if (typeof current_class.defaults[key] === "object")
          this[key] = { ...current_class.defaults[key], ...this[key] };
        else this[key] = current_class.defaults[key];
      }
      current_class = Object.getPrototypeOf(current_class);
    }
  }
  get_key() {
    console.log("called default get_key");
    return create_uid(this.data);
  }
  update_data(data) {
    data = JSON.parse(JSON.stringify(data, this.update_data_replacer));
    deep_merge(this.data, data);
    return true;
  }
  update_data_replacer(key, value) {
    if (value instanceof CollectionItem) return value.ref;
    if (Array.isArray(value))
      return value.map((val) =>
        val instanceof CollectionItem ? val.ref : val
      );
    return value;
  }
  init() {
    this.save();
  }
  save() {
    if (!this.validate_save()) {
      if (this.key) this.collection.delete(this.key);
      return console.error("Invalid save: ", {
        data: this.data,
        stack: new Error().stack,
      });
    }
    this.collection.set(this);
    this.collection.save();
  }
  validate_save() {
    if (!this.key) return false;
    if (this.key === "") return false;
    if (this.key === "undefined") return false;
    return true;
  }
  delete() {
    this.collection.delete(this.key);
  }
  filter(opts = {}) {
    const {
      exclude_key,
      exclude_keys = exclude_key ? [exclude_key] : [],
      exclude_key_starts_with,
      key_ends_with,
    } = opts;
    if (exclude_keys == null ? void 0 : exclude_keys.includes(this.key))
      return false;
    if (exclude_key_starts_with && this.key.startsWith(exclude_key_starts_with))
      return false;
    if (key_ends_with && !this.key.endsWith(key_ends_with)) return false;
    return true;
  }
  parse() {}
  // HELPER FUNCTIONS
  // CONVENIENCE METHODS (namespace getters)
  static get collection_name() {
    return collection_instance_name_from(this.name);
  }
  get collection_name() {
    return this.data.collection_name
      ? this.data.collection_name
      : this.constructor.collection_name;
  }
  get collection() {
    return this.brain[this.collection_name];
  }
  get key() {
    return (this.data.key = this.data.key || this.get_key());
  }
  get ref() {
    return { collection_name: this.collection_name, key: this.key };
  }
  get seq_key() {
    return this.key;
  }
}

module.exports = { CollectionItem };
