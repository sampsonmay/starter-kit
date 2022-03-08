"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkProjectName"] = self["webpackChunkProjectName"] || []).push([["src_js_Modules_Accordion_js"],{

/***/ "./src/js/Modules/Accordion.js":
/*!*************************************!*\
  !*** ./src/js/Modules/Accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Accordion = () => {\r\n\r\n    const groups = document.querySelectorAll(\"[data-accordion-group]\");\r\n    if(groups.length < 1) return;\r\n\r\n    const activeClass = \"is-active\";\r\n\r\n    // Open/Close accodtions within the accordion group\r\n    const handleAccordion = (el, group) => {\r\n        let target = el;\r\n        let accordion = target.closest(\"[data-accordion]\");\r\n        let body = accordion.querySelector(\"[data-accordion-body]\");\r\n        let height = body.querySelector(\"[data-accordion-height]\").clientHeight;\r\n\r\n        // If the accordion is already open, close it\r\n        if(accordion.classList.contains(activeClass)) {\r\n            accordion.classList.remove(activeClass);\r\n            body.removeAttribute(\"style\");\r\n            return;\r\n        }\r\n\r\n        // Loop through the other accordions, and close them, then open the selected one\r\n        group.querySelectorAll(\"[data-accordion]\").forEach(x => {\r\n            x.classList.remove(activeClass);\r\n            x.querySelector(\"[data-accordion-body]\").removeAttribute(\"style\");\r\n        });\r\n        body.style.maxHeight = height + \"px\";\r\n        accordion.classList.add(activeClass);\r\n    }\r\n \r\n    // Loop all accordion groups\r\n    groups.forEach(group => {\r\n        const toggles = group.querySelectorAll(\"[data-accordion-toggle]\");\r\n        if(toggles.length) {\r\n            toggles.forEach(toggle => {\r\n                toggle.addEventListener(\"click\", (e) => {\r\n                    e.preventDefault();\r\n                    handleAccordion(e.currentTarget, group);\r\n                });\r\n            });\r\n        }\r\n    });\r\n\r\n    // Open accordion on load if hash tag is there\r\n    const accordionHash = window.location.hash.split(\"#\")[1];\r\n    if(accordionHash != null && accordionHash != \"\") {\r\n        const accordionToOpen = document.querySelector('[data-accordion=\"'+accordionHash+'\"]');\r\n        if(accordionToOpen && !accordionToOpen.classList.contains(activeClass)) {\r\n            accordionToOpen.classList.add(activeClass);\r\n            \r\n            setTimeout(() => {\r\n                accordionToOpen.scrollIntoView();\r\n            }, 4000);\r\n\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordion);\n\n//# sourceURL=webpack://ProjectName/./src/js/Modules/Accordion.js?");

/***/ })

}]);