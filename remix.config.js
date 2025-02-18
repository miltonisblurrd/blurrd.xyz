/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.js",
  serverBuildPath: ".netlify/functions-internal/server.js",
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
};