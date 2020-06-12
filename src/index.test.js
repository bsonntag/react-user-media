import { render, waitFor } from '@testing-library/react';
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

  it('calls children with the stream and renders its result', async () => {
    const fakeStream = {
      getTracks: () => [],
    };

    navigator.mediaDevices.getUserMedia = jest.fn(() => {
      return Promise.resolve(fakeStream);
    });

    const children = jest.fn(() => 'foo');

    const { container } = render(
      <UserMedia>
        {children}
      </UserMedia>
    );

    await waitFor(() => expect(container).toHaveTextContent('foo'));

    expect(children).toHaveBeenCalledWith(fakeStream);
  });

  it('renders the result of the renderError prop when there is an error', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const { container } = render(
      <UserMedia renderError={stream => stream} />
    );

    await waitFor(() => expect(container).toHaveTextContent('foo'));
  });
});
