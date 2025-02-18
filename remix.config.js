/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.js",
  serverBuildPath: ".netlify/functions-internal/server.js",
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
  },
};