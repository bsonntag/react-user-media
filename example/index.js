import { render } from 'react-dom';
import React from 'react';
import UserMedia from '../src';
import Video from '@bsonntag/react-video';

const constraints = { video: true };

const renderError = error => (
  <p>
    {'Error: '}
    {error.message}
  </p>
);

const App = () => (
  <UserMedia
    constraints={constraints}
    renderError={renderError}
  >
    {stream => (
      <Video
        play
        srcObject={stream}
      />
    )}
  </UserMedia>
);

render(<App />, document.getElementById('root'));
