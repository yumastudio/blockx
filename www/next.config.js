// next.config.js
const plugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules')(['@yumastudio/blockx-react'])

const nextConfig = {}

module.exports = plugins([
  transpileModules
], nextConfig);
