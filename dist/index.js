"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _stopMediaStream = _interopRequireDefault(require("stop-media-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserMedia =
/*#__PURE__*/
function (_Component) {
  _inherits(UserMedia, _Component);

  function UserMedia() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UserMedia);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UserMedia)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: null,
      stream: null
    });

    return _this;
  }

  _createClass(UserMedia, [{
    key: "getUserMedia",
    value: function getUserMedia() {
      var _this2 = this;

      navigator.mediaDevices.getUserMedia(this.props.constraints).then(function (stream) {
        _this2.setState({
          stream: stream
        });

        _this2.props.onMediaStream(stream);
      }, function (error) {
        _this2.setState({
          error: error
        });

        _this2.props.onError(error);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getUserMedia();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.constraints !== prevProps.constraints) {
        (0, _stopMediaStream["default"])(this.state.stream);
        this.getUserMedia();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _stopMediaStream["default"])(this.state.stream);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          placeholder = _this$props.placeholder,
          renderError = _this$props.renderError;
      var _this$state = this.state,
          error = _this$state.error,
          stream = _this$state.stream;

      if (stream) {
        return children(stream);
      }

      if (error) {
        return renderError(error);
      }

      return placeholder;
    }
  }]);

  return UserMedia;
}(_react.Component);

exports["default"] = UserMedia;

_defineProperty(UserMedia, "propTypes", {
  children: _propTypes["default"].func,
  constraints: _propTypes["default"].object,
  onError: _propTypes["default"].func,
  onMediaStream: _propTypes["default"].func,
  placeholder: _propTypes["default"].node,
  renderError: _propTypes["default"].func
});

_defineProperty(UserMedia, "defaultProps", {
  children: function children() {
    return null;
  },
  constraints: {},
  onError: function onError() {
    return null;
  },
  onMediaStream: function onMediaStream() {
    return null;
  },
  placeholder: null,
  renderError: function renderError() {
    return null;
  }
});