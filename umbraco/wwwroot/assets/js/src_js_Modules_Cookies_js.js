"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkProjectName"] = self["webpackChunkProjectName"] || []).push([["src_js_Modules_Cookies_js"],{

/***/ "./src/js/Modules/Cookies.js":
/*!***********************************!*\
  !*** ./src/js/Modules/Cookies.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Cookies = () => {\r\n    const el = document.querySelectorAll('.js-cookies-open');\r\n    for( let i = 0; i < el.length; i++ ) {\r\n        el[i].addEventListener(\"click\", function(e) {\r\n            e.preventDefault();\r\n        });\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cookies);\n\n//# sourceURL=webpack://ProjectName/./src/js/Modules/Cookies.js?");

/***/ })

}]);