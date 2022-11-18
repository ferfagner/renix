"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.jsonDecorator = void 0;

var _makeDecorator = _interopRequireDefault(require("../../utils/common/makeDecorator"));

var _common = require("../common");

// Defines a model property that's (de)serialized to and from JSON using custom sanitizer function.
//
// Pass the database column name as first argument, and sanitizer function as second.
//
// Stored value will be parsed to JSON if possible, and passed to sanitizer as argument, or
// undefined will be passed on parsing error. Field value will be result of sanitizer call.
//
// Value assigned to field will be passed to sanitizer and its results will be stored as stringified
// value.
//
// Examples:
//   @json('contact_info', jsonValue => jasonValue || {}) contactInfo: ContactInfo
var parseJSON = function (value) {
  try {
    return JSON.parse(value);
  } catch (_) {
    return undefined;
  }
};

var jsonDecorator = (0, _makeDecorator.default)(function (rawFieldName, sanitizer) {
  return function (target, key, descriptor) {
    (0, _common.ensureDecoratorUsedProperly)(rawFieldName, target, key, descriptor);
    return {
      configurable: true,
      enumerable: true,
      get: function get() {
        var rawValue = this.asModel._getRaw(rawFieldName);

        var parsedValue = parseJSON(rawValue);
        return sanitizer(parsedValue, this);
      },
      set: function set(json) {
        var sanitizedValue = sanitizer(json, this);
        var stringifiedValue = null != sanitizedValue ? JSON.stringify(sanitizedValue) : null;

        this.asModel._setRaw(rawFieldName, stringifiedValue);
      }
    };
  };
});
exports.jsonDecorator = jsonDecorator;
var _default = jsonDecorator;
exports.default = _default;