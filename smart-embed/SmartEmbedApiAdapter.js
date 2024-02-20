const { SmartEmbed } = require('smart-embed/SmartEmbed'); // Adjust the path as necessary

class SmartEmbedApiAdapter extends SmartEmbed {
  constructor(model_config_key, http_request_adapter, api_key, opts = {}) {
    super(model_config_key);
    this.http_request_adapter = http_request_adapter;
    this.api_key = api_key;
    this.opts = opts;
  }
}

module.exports = { SmartEmbedApiAdapter };
