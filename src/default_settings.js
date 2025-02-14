function default_settings() {
  return {
    settings: {
      chat_folder: "smart chat",
      smart_notes_embed_model: "None",
      smart_blocks_embed_model: "TaylorAI/bge-micro-v2",
      smart_connections_folder: ".smart-connections",
      smart_connections_folder_last: ".smart-connections",
      // Smart Blocks Settings (chunking)
      embed_input_min_chars: 50,
      multi_heading_blocks: true,
      // V1
      api_key: "",
      excluded_headings: "",
      file_exclusions: "",
      folder_exclusions: "",
      show_full_path: false,
      expanded_view: true,
      language: "en",
      log_render: false,
      log_render_files: false,
      recently_sent_retry_notice: false,
      smart_chat_model: "gpt-3.5-turbo-0125",
      version: "",
      // skip_sections: false, // DEPRECATED
      // group_nearest_by_file: false, // DEPRECATED
      // path_only: "", // DEPRECATED
      // header_exclusions: "", // DEPRECATED use excluded_headings instead
    },
    api: null,
    embeddings_loaded: false,
    folders: [],
    has_new_embeddings: false,
    nearest_cache: {},
    render_log: {
      deleted_embeddings: 0,
      exclusions_logs: {},
      failed_embeddings: [],
      files: [],
      new_embeddings: 0,
      skipped_low_delta: {},
      token_usage: 0,
      tokens_saved_by_cache: 0,
    },
    retry_notice_timeout: null,
    save_timeout: null,
    sc_branding: {},
    update_available: false,
  };
}
exports.default_settings = default_settings;
