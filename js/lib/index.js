'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = exports.integrationsManager = exports.nodes = exports.react = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _nodes = require('./nodes');

var _nodes2 = _interopRequireDefault(_nodes);

var _integrationsManager = require('./integrations-manager');

var _integrationsManager2 = _interopRequireDefault(_integrationsManager);

var _react = require('./integrations/react');

var _react2 = _interopRequireDefault(_react);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.react = _react2.default;
exports.nodes = _nodes2.default;
exports.integrationsManager = _integrationsManager2.default;
exports.env = _env2.default;

var RWR = function () {
  function RWR() {
    _classCallCheck(this, RWR);

    this.version = _version2.default;

    this.registerComponent = _react2.default.registerComponent;
    this.getComponent = _react2.default.getComponent;
    this.createComponent = _react2.default.createComponent;
    this.renderComponent = _react2.default.renderComponent;
    this.unmountComponent = _react2.default.unmountComponent;

    this.mountNodes = _nodes2.default.mountNodes;
    this.unmountNodes = _nodes2.default.unmountNodes;
    this.reloadNodes = _nodes2.default.reloadNodes;
  }

  _createClass(RWR, [{
    key: 'run',
    value: function run() {
      if (typeof window !== 'undefined') {
        window.RWR = this;
      } else {
        global.RWR = this;
      }
    }
  }]);

  return RWR;
}();

exports.default = new RWR();