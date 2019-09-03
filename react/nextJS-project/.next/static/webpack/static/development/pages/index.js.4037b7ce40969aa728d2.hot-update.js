webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var events = ['routeChangeStart', 'routeChangeComplete', 'routeChangeError', 'beforeHistoryChange', 'hashChangeStart', 'hashChangeComplete'];

function makeEvent(type) {
  return function () {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, [type].concat(args));
  };
}

events.forEach(function (event) {
  next_router__WEBPACK_IMPORTED_MODULE_1___default.a.events.on(event, makeEvent(event));
});
/* harmony default export */ __webpack_exports__["default"] = (function () {
  function gotoB() {
    next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push({
      pathname: '/b',
      query: {
        id: 2
      }
    }, '/b/2');
  }

  return __jsx("div", null, __jsx("h2", null, "index page"), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/c"
  }, __jsx("div", null, __jsx("h1", null, "goto C"))), __jsx("button", {
    onClick: gotoB
  }, "goto B page"));
});

/***/ })

})
//# sourceMappingURL=index.js.4037b7ce40969aa728d2.hot-update.js.map