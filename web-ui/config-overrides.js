const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {
    addBabelPlugin,
    addWebpackPlugin,
    override,
    overrideDevServer,
} = require('customize-cra');

const isDevelopment = process.env.NODE_ENV === 'development';

const devServerConfig = () => (config) => ({
    ...config,
    progress: true,
});

module.exports = {
    webpack: override(
        isDevelopment && addBabelPlugin(require.resolve('react-refresh/babel')),
        isDevelopment && addWebpackPlugin(new ReactRefreshPlugin())
    ),
    devServer: overrideDevServer(devServerConfig()),
};
