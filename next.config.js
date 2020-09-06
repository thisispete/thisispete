const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = { fs: "empty" };
    return config
  },
})
