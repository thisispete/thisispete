const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const { createSecureHeaders } = require("next-secure-headers");

dotenvLoad();
const withNextEnv = nextEnv();

module.exports = withNextEnv({
  async headers() {
    return [{
      source: "/(.*)", headers: createSecureHeaders({
        contentSecurityPolicy: false
      }) }];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config
  },
})
