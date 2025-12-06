const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const { createSecureHeaders } = require("next-secure-headers");

dotenvLoad();
const withNextEnv = nextEnv();

module.exports = withNextEnv({
  async headers() {
    return [{
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: false
        })
    },
    {
      source: "/.well-known/(.*)",
      headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]

    }];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config
  },
  // Turbopack config - empty to silence the warning while keeping webpack config
  turbopack: {},
})

