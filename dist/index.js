'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stopMediaStream = require('stop-media-stream');

var _stopMediaStream2 = _interopRequireDefault(_stopMediaStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserMedia = function (_Component) {
  _inherits(UserMedia, _Component);

  function UserMedia() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UserMedia);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserMedia.__proto__ || Object.getPrototypeOf(UserMedia)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      error: null,
      stream: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UserMedia, [{
    key: 'getUserMedia',
    value: function getUserMedia() {
      var _this2 = this;

      navigator.mediaDevices.getUserMedia(this.props.constraints).then(function (stream) {
        _this2.setState({ stream: stream });
        _this2.props.onMediaStream(stream);
      }, function (error) {
        _this2.setState({ error: error });
        _this2.props.onError(error);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getUserMedia();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.constraints !== prevProps.constraints) {
        (0, _stopMediaStream2.default)(this.state.stream);
        this.getUserMedia();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _stopMediaStream2.default)(this.state.stream);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          placeholder = _props.placeholder,
          renderError = _props.renderError;
      var _state = this.state,
          error = _state.error,
          stream = _state.stream;


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

UserMedia.propTypes = {
  children: _propTypes2.default.func,
  constraints: _propTypes2.default.object,
  onError: _propTypes2.default.func,
  onMediaStream: _propTypes2.default.func,
  placeholder: _propTypes2.default.node,
  renderError: _propTypes2.default.func
};
UserMedia.defaultProps = {
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
};
exports.default = UserMedia;