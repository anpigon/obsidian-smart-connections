const models = require('./models.json'); // Adjust the path as necessary

class SmartEmbed {
  constructor(model_config_key) {
    this.model_config_key = model_config_key;
    this.config = models[this.model_config_key];
  }
  static async create(model_config_key, ...args) {
    const adapter = new this(model_config_key, ...args);
    await adapter.init();
    return adapter;
  }
  async init() {
    // Initialization logic
  }
  /**
   * @param {string} input
   * @returns {Promise<number>}
   */
  async count_tokens(input) {
    // Count tokens logic
  }
  /**
   * @param {string} input
   * @returns {Promise<number[]>}
   */
  async embed(input) {
    // Embed logic
  }
  /**
   * @param {string[]} input
   * @returns {Promise<number[][]>}
   */
  async embed_batch(input) {
    // Embed batch logic
  }
  get batch_size() {
    return this.config.batch_size;
  }
  get dims() {
    return this.config.dims;
  }
  get max_tokens() {
    return this.config.max_tokens;
  }
  get model_name() {
    return this.config.model_name;
  }
}

module.exports = { SmartEmbed };
