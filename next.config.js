module.exports = { reactStrictMode: true };
const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    disable: false,
    skipWaiting: true,
  },
});

module.exports = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
