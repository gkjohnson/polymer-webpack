/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./node_modules/@polymer/polymer/polymer-element.html");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


window.__scriptguards__ = window.__scriptguards__ || {};
const guardDef = 'elements\\child-element\\child-element.html';
if (!(guardDef in window.__scriptguards__)) {
	window.__scriptguards__[guardDef] = true;
	/*__wc__loader*/!function (a) {
		var b = "<dom-module id=\"child-element\">\n\t<style></style>\n\t<template>\n\t\t<h3>Child Element</h3>\n\t\t<div>Child [[name]]</div>\n\t</template>\n</dom-module>\n\n";if (a.body) {
			var c = a.body,
			    d = a.createElement("div");for (d.innerHTML = b; d.children.length > 0;) c.appendChild(d.children[0]);
		} else a.write(b);
	}(document);
	__webpack_require__(0);

	class ChildElement extends Polymer.Element {
		static get is() {
			return 'child-element';
		}

		static get properties() {
			return {
				name: {
					type: String,
					value: 'child'
				}
			};
		}
	}

	customElements.define(ChildElement.is, ChildElement);
}

/***/ })
/******/ ]);