"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkProjectName"] = self["webpackChunkProjectName"] || []).push([["src_js_Modules_Tables_js"],{

/***/ "./src/js/Modules/Tables.js":
/*!**********************************!*\
  !*** ./src/js/Modules/Tables.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Tables = () => {\r\n    const tables = document.querySelectorAll(\".editor table\");\r\n    if( tables.length < 1 ) return;\r\n\r\n    for( let i = 0; i < tables.length; i++ ) {\r\n            \r\n        let wrapper = document.createElement(\"div\");\r\n            wrapper.classList.add(\"table\"); \r\n\r\n        tables[i].parentNode.insertBefore(wrapper,tables[i]);\r\n        wrapper.appendChild(tables[i]);\r\n\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tables);\n\n//# sourceURL=webpack://ProjectName/./src/js/Modules/Tables.js?");

/***/ })

}]);