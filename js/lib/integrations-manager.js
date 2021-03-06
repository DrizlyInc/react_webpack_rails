"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("./integrations/react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IntegrationsManager = function () {
  function IntegrationsManager() {
    _classCallCheck(this, IntegrationsManager);

    this.integrations = {
      "react-component": _react2.default.integrationWrapper
    };
  }

  _createClass(IntegrationsManager, [{
    key: "get",
    value: function get(name) {
      var integration = this.integrations[name];
      if (integration === undefined) {
        throw new Error("Missing '" + name + "' integration, register appropriate integration in react/index.js");
      }

      return integration;
    }
  }, {
    key: "register",
    value: function register(name, integration) {
      this.integrations[name] = integration;
    }
  }, {
    key: "runNodeIntegration",
    value: function runNodeIntegration(data) {
      var result = "";

      var _get = this.get(data.integrationName),
          nodeRun = _get.nodeRun;

      if (typeof nodeRun === "function") {
        result = nodeRun(data.payload);
      }
      return result;
    }
  }]);

  return IntegrationsManager;
}();

exports.default = new IntegrationsManager();