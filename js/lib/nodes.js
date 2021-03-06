'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _integrationsManager = require('./integrations-manager');

var _integrationsManager2 = _interopRequireDefault(_integrationsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ELEMENT_ATTR = 'data-rwr-element';
var PAYLOAD_ATTR = 'data-payload';
var INTEGRATION_NAME_ATTR = 'data-integration-name';
var OPTIONS_ATTR = 'data-options';

function _findDOMNodes(searchSelector) {
  var selector = searchSelector || '[' + ELEMENT_ATTR + ']';
  return document.querySelectorAll(selector);
}

function _nodeData(node) {
  var rawPayload = node.getAttribute(PAYLOAD_ATTR);
  var rawOptions = node.getAttribute(OPTIONS_ATTR);

  return {
    payload: rawPayload && JSON.parse(rawPayload),
    options: rawOptions && JSON.parse(rawOptions),
    integrationName: node.getAttribute(INTEGRATION_NAME_ATTR)
  };
}

function _mountNode(node) {
  var data = _nodeData(node);
  var mount = _integrationsManager2.default.get(data.integrationName).mount;
  if (typeof mount === 'function') {
    mount(node, data.payload);
  }
}

function _unmountNode(node) {
  var data = _nodeData(node);
  var unmount = _integrationsManager2.default.get(data.integrationName).unmount;
  if (typeof unmount === 'function') {
    unmount(node, data.payload);
  }
}

function mountNodes(searchSelector) {
  var nodes = _findDOMNodes(searchSelector);
  for (var i = 0; i < nodes.length; ++i) {
    _mountNode(nodes[i]);
  }
}

function unmountNodes(searchSelector) {
  var nodes = _findDOMNodes(searchSelector);
  for (var i = 0; i < nodes.length; ++i) {
    _unmountNode(nodes[i]);
  }
}

exports.default = {
  mountNodes: mountNodes,
  unmountNodes: unmountNodes,
  // Used after hot module replacement
  reloadNodes: mountNodes
};