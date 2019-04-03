"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactHotLoader = require("react-hot-loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactIntegration = function () {
  function ReactIntegration() {
    _classCallCheck(this, ReactIntegration);

    this.components = {};
    this.registerComponent = this.registerComponent.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.createComponent = this.createComponent.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.unmountComponent = this.unmountComponent.bind(this);
    this.renderComponentToString = this.renderComponentToString.bind(this);
  }

  _createClass(ReactIntegration, [{
    key: "registerComponent",
    value: function registerComponent() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[0]) === "object") {
        var _component = args[0];
        this.components = Object.assign({}, this.components, _component);
      }

      var name = args[0],
          component = args[1];

      this.components[name] = component;
    }
  }, {
    key: "registerComponents",
    value: function registerComponents(components) {
      this.components = Object.assign({}, this.components, components);
    }
  }, {
    key: "getComponent",
    value: function getComponent(name) {
      return this.components[name];
    }
  }, {
    key: "createComponent",
    value: function createComponent(name, props) {
      var constructor = this.getComponent(name);
      var element = _react2.default.createElement(constructor, props);
      return _react2.default.createElement(_reactHotLoader.AppContainer, null, element);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(name, props, node) {
      var component = this.createComponent(name, props);
      this._attachIntegrationData(node, name, props);
      _reactDom2.default.render(component, node);
    }
  }, {
    key: "unmountComponent",
    value: function unmountComponent(node) {
      _reactDom2.default.unmountComponentAtNode(node);
    }
  }, {
    key: "renderComponentToString",
    value: function renderComponentToString(name, props) {
      var component = this.createComponent(name, props);
      return _server2.default.renderToString(component);
    }
  }, {
    key: "_attachIntegrationData",
    value: function _attachIntegrationData(node, name, props) {
      var nativeNode = node.selector ? node[0] : node; // normalize jquery objects to native nodes
      var dataset = nativeNode.dataset;
      if (dataset.rwrElement) return;
      dataset.rwrElement = "true";
      dataset.integrationName = "react-component";
      dataset.payload = JSON.stringify({ name: name, props: props });
    }
  }, {
    key: "integrationWrapper",
    get: function get() {
      return {
        mount: function _mount(node, payload) {
          this.renderComponent(payload.name, payload.props, node);
        }.bind(this),

        unmount: function _unmount(node) {
          this.unmountComponent(node);
        }.bind(this),

        nodeRun: function _prerender(payload) {
          return this.renderComponentToString(payload.name, payload.props);
        }.bind(this)
      };
    }
  }]);

  return ReactIntegration;
}();

exports.default = new ReactIntegration();