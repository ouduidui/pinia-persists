var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
var __DEV__ = true;
function persist(options = {}) {
  const storage = options.storage || window && window.localStorage;
  if (!storage)
    throw new ReferenceError('"window" is undefined.');
  const prefix = options.prefix || "pinia";
  const overwrite = options.overwrite || false;
  return function({ store }) {
    const key = `${prefix}_${store.$id}`;
    const storageResult = getItem(key, storage);
    if (!storageResult || overwrite)
      setItem(key, store.$state, storage);
    else
      store.$patch(storageResult);
    store.$subscribe(() => {
      setItem(key, store.$state, storage);
    });
  };
}
function getItem(key, storage) {
  const value = storage.getItem(key);
  try {
    if (typeof value === "string")
      return JSON.parse(value);
    else if (typeof value === "object")
      return value;
    else
      return null;
  } catch (err) {
    if (__DEV__)
      throw err;
    return null;
  }
}
function setItem(key, state, storage) {
  return storage.setItem(key, JSON.stringify(state));
}
var src_default = persist;
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map