import { render, wait } from '@testing-library/react';
import React from 'react';
import UserMedia from '.';

describe('UserMedia', () => {
  navigator.mediaDevices = navigator.mediaDevices || {};

  it('renders the placeholder prop', () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => new Promise(() => {}));

    const { container } = render(
      <UserMedia placeholder={'foo'} />
    );

    expect(container).toHaveTextContent('foo');
  });

  it('renders the result of the children prop', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const { container } = render(
      <UserMedia>
        {stream => stream}
      </UserMedia>
    );

    await wait(() => expect(container).toHaveTextContent('foo'));
  });

  it('renders the result of the renderError prop when there is an error', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const { container } = render(
      <UserMedia renderError={stream => stream} />
    );

    await wait(() => expect(container).toHaveTextContent('foo'));
  });
});
