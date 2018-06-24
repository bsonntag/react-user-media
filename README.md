# @bsonntag/react-user-media

> A react component that wraps `getUserMedia`.

## Installation

Using npm:

```sh
$ npm install --save @bsonntag/react-user-media
```

Using yarn:

```sh
$ yarn add @bsonntag/react-user-media
```

This module uses react's `createContext` API,
so make sure you have at least version 16.3.0 installed.

## Example usage

```js
import UserMedia from '@bsonntag/react-user-media';
import React from 'react';

const constraints = { video: true };

const App = () => (
  <UserMedia constraints={constraints}>
    {stream => (
      <video
        autoPlay
        src={URL.createObjectURL(stream)}
      />
    )}
  </UserMedia>
);
```

## Props

- `children` - A function that receives the `MediaStream` and renders something.
- `constraints` - A [`MediaStreamConstraints`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints).
- `onError` - A function that is called when `getUserMedia` throws.
- `onMediaStream` - A function that receives the `MediaStream`.
- `placeholder` - An element that is rendered while `getUserMedia` is being called.
- `renderError` - A function that receives the error thrown by `getUserMedia` and renders something.

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
