"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkProjectName"] = self["webpackChunkProjectName"] || []).push([["src_js_Modules_Carousels_js"],{

/***/ "./src/js/Modules/Carousels.js":
/*!*************************************!*\
  !*** ./src/js/Modules/Carousels.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Example\": () => (/* binding */ Example),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Swiper;\r\n\r\nconst Example = () => {\r\n    const swipers = document.querySelectorAll(\"[data-swiper-example]\");\r\n    if(!swipers.length) return;\r\n    swipers.forEach(x => {\r\n        const swiper = new Swiper(x, {\r\n            speed: 500,\r\n            slidesPerView: 1,\r\n            breakpoints: {\r\n                768: {\r\n                    slidesPerView: 3,\r\n                    slidesPerGroup: 3\r\n                }\r\n            },\r\n            navigation: {\r\n                nextEl: x.querySelector('.swiper-button-next'),\r\n                prevEl: x.querySelector('.swiper-button-prev')\r\n            },\r\n            pagination: {\r\n                el: x.querySelector('.swiper-pagination'),\r\n                type: 'bullets',\r\n                clickable: true\r\n            }\r\n        });\r\n    });\r\n}\r\n\r\nconst Carousels = () => {\r\n    __webpack_require__.e(/*! import() */ \"vendors-node_modules_swiper_swiper_esm_js\").then(__webpack_require__.bind(__webpack_require__, /*! swiper */ \"./node_modules/swiper/swiper.esm.js\")).then((module) => {\r\n        \r\n        Swiper = module.default;\r\n        Swiper.use([module.Autoplay, module.Navigation, module.Pagination]);\r\n        \r\n        // List of Carousels\r\n        Example();\r\n\r\n    });\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousels);\n\n//# sourceURL=webpack://ProjectName/./src/js/Modules/Carousels.js?");

/***/ })

}]);