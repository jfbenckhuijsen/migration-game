const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: false,
        maxAssetSize: 1000000,
        maxEntrypointSize: 1500000,
    }
});