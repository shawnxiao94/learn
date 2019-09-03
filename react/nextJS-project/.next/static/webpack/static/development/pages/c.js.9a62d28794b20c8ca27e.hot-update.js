webpackHotUpdate("static\\development\\pages\\c.js",{

/***/ "./pages/c.js":
/*!********************!*\
  !*** ./pages/c.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);







var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;


var MyCount =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(MyCount, _Component);

  function MyCount() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MyCount);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(MyCount)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "state", {
      count: 0
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MyCount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.setState({
          count: _this2.state.count + 1
        });
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return __jsx("div", null, __jsx("h2", null, "c page"), __jsx("span", null, this.state.count));
    }
  }]);

  return MyCount;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

function MyCountFunc() {
  // const [count, setCount] = useState(0) // 返回数组[a,b]，通过解构使用
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_7__["useReducer"])(CountReducer, 0),
      count = _useReducer[0],
      dispatchCount = _useReducer[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])('jokcy'),
      name = _useState[0],
      setName = _useState[1]; // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c + 1)
  //     dispatchCount({ type: 'minus'})
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])


  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    console.log('effect invoked');
    return function () {
      return console.log('effect deteched');
    };
  }, [count]);
  return __jsx("div", null, __jsx("h2", null, "c page MyCountFunc"), __jsx("span", null, count), __jsx("input", {
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), __jsx("button", {
    onClick: function onClick() {
      return dispatchCount({
        type: 'add'
      });
    }
  }, count));
}

function CountReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;

    case 'minus':
      return state - 1;

    default:
      return state;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MyCountFunc);

/***/ })

})
//# sourceMappingURL=c.js.9a62d28794b20c8ca27e.hot-update.js.map