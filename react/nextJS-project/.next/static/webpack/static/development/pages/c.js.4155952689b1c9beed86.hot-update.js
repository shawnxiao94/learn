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
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MyCount);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(MyCount).call(this));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "state", {
      count: 0
    });

    _this.spanRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
    _this.h2Ref = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MyCount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log(this.h2Ref.current, this.spanRef.current);
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
      return __jsx("div", null, __jsx("h2", {
        ref: this.h2Ref
      }, "c page"), __jsx("span", {
        ref: this.spanRef
      }, this.state.count));
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
      setName = _useState[1];

  var inputRef = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])();
  var spanRef = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])();
  var config = {
    text: "count is ".concat(count),
    color: count > 3 ? 'red' : 'blue' // useEffect(() => {
    //   const interval = setInterval(() => {
    //     // setCount(c => c + 1)
    //     dispatchCount({ type: 'add'})
    //   }, 1000)
    //   return () => clearInterval(interval)
    // }, []) // useEffect 第二个参数作用 => 没有第二个参数时会不断重复渲染，第二个参数为空数组时只渲染一次。第二个参数有依赖时则依据依赖的变量变化而渲染，变量未变化则不渲染

  };
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    console.log('effect invoked');
    return function () {
      return console.log('effect deteched');
    };
  }, [name]); // useLayoutEffect会比useEffect先执行，会在没更新成真正的DOM之前会先执行，useEffect会等插入DOM真实节点后执行

  Object(react__WEBPACK_IMPORTED_MODULE_7__["useLayoutEffect"])(function () {
    console.log('layout effect invoked');
    console.log(inputRef.current, spanRef.current);
    return function () {
      return console.log('layout effect deteched');
    };
  }, [name]);
  return __jsx("div", null, __jsx("h2", null, "c page MyCountFunc"), __jsx("span", {
    ref: spanRef
  }, count), __jsx("input", {
    ref: inputRef,
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
  }, count), __jsx(Child, {
    config: config,
    onButtonClick: function onButtonClick() {
      return dispatchCount({
        type: 'add'
      });
    }
  }));
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

var Child = Object(react__WEBPACK_IMPORTED_MODULE_7__["memo"])(function Child(_ref) {
  var onButtonClick = _ref.onButtonClick,
      config = _ref.config;
  console.log('child render');
  return __jsx("button", {
    onClick: onButtonClick,
    style: {
      color: config.color
    }
  }, config.text);
});
/* harmony default export */ __webpack_exports__["default"] = (MyCountFunc);

/***/ })

})
//# sourceMappingURL=c.js.4155952689b1c9beed86.hot-update.js.map