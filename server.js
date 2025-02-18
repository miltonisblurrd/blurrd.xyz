const { createRequestHandler } = require("@remix-run/netlify");
const build = require("@remix-run/dev/server-build");

exports.handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
}); 