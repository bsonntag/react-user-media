import { Component } from 'react';
import PropTypes from 'prop-types';
import stopMediaStream from 'stop-media-stream';

export default class UserMedia extends Component {

  static propTypes = {
    children: PropTypes.func,
    constraints: PropTypes.object,
    onError: PropTypes.func,
    onMediaStream: PropTypes.func,
    placeholder: PropTypes.node,
    renderError: PropTypes.func,
  };

  static defaultProps = {
    children: () => null,
    constraints: {},
    onError: () => null,
    onMediaStream: () => null,
    placeholder: null,
    renderError: () => null,
  };

  state = {
    error: null,
    stream: null,
  };

  getUserMedia() {
    navigator.mediaDevices.getUserMedia(this.props.constraints)
      .then(stream => {
        this.setState({ stream });
        this.props.onMediaStream(stream);
      }, error => {
        this.setState({ error });
        this.props.onError(error);
      });
  }

  componentDidMount() {
    this.getUserMedia();
  }

  componentDidUpdate(prevProps) {
    if (this.props.constraints !== prevProps.constraints) {
      stopMediaStream(this.state.stream);
      this.getUserMedia();
    }
  }

  componentWillUnmount() {
    stopMediaStream(this.state.stream);
  }

  render() {
    const { children, placeholder, renderError } = this.props;
    const { error, stream } = this.state;

    if (stream) {
      return children(stream);
    }

    if (error) {
      return renderError(error);
    }

    return placeholder;
  }

}
