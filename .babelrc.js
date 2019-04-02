module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      process.env.NODE_ENV === 'test' ? { // eslint-disable-line no-process-env
        targets: { node: '8' },
      } : {},
    ],
    '@babel/preset-react',
  ],
};
