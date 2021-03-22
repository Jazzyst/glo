/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateglo"]("main",{

/***/ "./src/modules/validateInputs.js":
/*!***************************************!*\
  !*** ./src/modules/validateInputs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar validateInputs = function validateInputs() {\n  var calcBlock = document.querySelector('.calc-block'),\n      calcBlockInputs = calcBlock.querySelectorAll('input'),\n      body = document.querySelector('body');\n  calcBlockInputs.forEach(function (item) {\n    item.addEventListener('input', function () {\n      item.value = item.value.replace(/\\D/g, '');\n    });\n  });\n  body.addEventListener('input', function (e) {\n    var target = e.target;\n\n    if (target.matches('input[name=user_message]')) {\n      target.value = target.value.replace(/[^а-я\\s\\d-,.!?]/ig, '').replace(/\\s+/g, ' ').replace(/\\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\\s/g, '');\n      target.value = target.value.charAt(0).toUpperCase() + target.value.slice(1);\n    }\n\n    if (target.matches('input[name=user_name]')) {\n      target.value = target.value.replace(/[^а-я\\s-]/ig, '').replace(/\\s+/g, ' ').replace(/\\-+/g, '-').replace(/^-+|-+$/g, '').replace(/^\\s/g, '');\n      target.value = target.value.toLowerCase().split(' ').map(function (word) {\n        if (word !== '') {\n          return word[0].toUpperCase() + word.substr(1);\n        }\n      }).join(' ');\n    }\n\n    if (target.matches('input[name=user_email]')) {\n      if (!target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/)) {\n        target.value === '';\n      }\n    }\n\n    if (target.matches('input[name=user_phone]')) {\n      target.value = target.value.replace(/^\\+?[78]([-()]*\\d){10}$/, '').replace(/\\++/g, '+').replace(/^-+|-+$/g, '').replace(/\\d{9}/g, '').trim();\n    }\n  }, true);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateInputs);\n\n//# sourceURL=webpack://glo/./src/modules/validateInputs.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba57aaf9821d9372ed18")
/******/ })();
/******/ 
/******/ }
);