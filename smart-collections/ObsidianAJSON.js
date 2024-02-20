const { LongTermMemory } = require('./long_term_memory'); // Adjust the path as necessary

class ObsidianAJSON extends LongTermMemory {
  constructor(collection) {
    super(collection);
    this.adapter = this.brain.main.app.vault.adapter;
  }

  async load() {
    console.log("Loading: " + this.file_path);
    try {
      Object.entries(JSON.parse(`{${await this.adapter.read(this.file_path)}}`)).forEach(([key, value]) => {
        this.collection.items[key] = new this.brain.item_types[value.class_name](this.brain, value);
        this.collection.keys.push(key);
      });
      console.log("Loaded: " + this.file_name);
    } catch (err) {
      console.log("Error loading: " + this.file_path);
      console.log(err.stack);
      if (err.code === "ENOENT") {
        try {
          await this.adapter.mkdir(this.data_path);
          await this.adapter.write(this.file_path, "");
          this.items = {};
          this.keys = [];
        } catch (creationErr) {
          console.log("Failed to create folder or file: ", creationErr);
        }
      }
    }
  }

  save() {
    if (this.save_timeout)
      clearTimeout(this.save_timeout);
    this.save_timeout = setTimeout(() => {
      this._save();
    }, 10000); // 1e4
  }

  async _save(force = false) {
    if (this.save_timeout)
      clearTimeout(this.save_timeout);
    this.save_timeout = null;
    if (this._saving)
      return console.log("Already saving: " + this.file_name);
    this._saving = true;
    setTimeout(() => {
      this._saving = false;
    }, 10000); // 1e4

    const start = Date.now();
    console.log("Saving: " + this.file_name);
    try {
      const file_content = JSON.stringify(this.items, this.replacer.bind(this));
      const new_size = file_content.length;
      if (!force && new_size < 100)
        return console.log("File content empty, not saving");
      const old_size = (await this.adapter.stat(this.file_path)?.size) || 0;
      if (!force && new_size < 0.8 * old_size)
        return console.log("File content smaller than 80% of original, not saving " + this.file_name);
      await this.adapter.write(this.file_path, file_content.substring(1, file_content.length - 1));
      const end = Date.now();
      const time = end - start;
      console.log("Saved " + this.file_name + " in " + time + "ms");
    } catch (err) {
      console.error("Error saving: " + this.file_name);
      console.error(err.stack);
    }
    this._saving = false;
  }

  get file_name() {
    return super.file_name + ".ajson";
  }
}

module.exports = { ObsidianAJSON };
