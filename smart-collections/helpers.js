function create_uid(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
      if (hash < 0) hash = hash * -1;
    }
    return hash.toString() + str.length;
  }
  
  function deep_merge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (is_obj(source[key]) && is_obj(target[key]))
          deep_merge(target[key], source[key]);
        else
          target[key] = source[key];
      }
    }
    return target;
  
    function is_obj(item) {
      return item && typeof item === "object" && !Array.isArray(item);
    }
  }
  
  function collection_instance_name_from(class_name) {
    return class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/y$/, "ie") + "s";
  }
  
  function cos_sim(vector1, vector2) {
    const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
    const normA = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
    return normA === 0 || normB === 0 ? 0 : dotProduct / (normA * normB);
  }
  
  function top_acc(_acc, item, ct = 10) {
    if (_acc.items.size < ct) {
      _acc.items.add(item);
    } else if (item.sim > _acc.min) {
      _acc.items.add(item);
      _acc.items.delete(_acc.minItem);
      _acc.minItem = Array.from(_acc.items).reduce((min, curr) => curr.sim < min.sim ? curr : min);
      _acc.min = _acc.minItem.sim;
    }
  }
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  module.exports = {
    create_uid,
    deep_merge,
    collection_instance_name_from,
    cos_sim,
    top_acc,
    sleep
  };
  