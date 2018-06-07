#!/usr/bin/env node

// sw-precache --config=sw-precache-config.js && uglifyjs build/service-worker.js -m -c join_vars -o build/service-worker.js

const swPrecache = require('sw-precache');
const UglifyJS = require("uglify-js");
const fs = require('fs');

// TODO parse command line option from

const defaultConfig = {
  swFilePath: './build/service-worker.js',
  cacheId: 'sw-precache-webpack-plugin',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  staticFileGlobs: [
    './build/**/**.html',
    './build/static/js/*.js',
    './build/static/css/*.css',
    './build/static/media/**',
  ],
  stripPrefix: './build',
};

const minify = true;  // TODO parse from cli
swPrecache
  .generate({
    ...defaultConfig,
    // NOTE add user configs to override here
  })
  .then(swCode => {
    fs.writeFile(
      defaultConfig.swFilePath,
      minify
        ? UglifyJS.minify(swCode, {
            mangle: true,
            compress: {
              join_vars: true,
            },
          }).code
        : swCode,
      error => {
        if (error) throw error;
      },
    );
  })
  .catch(error => {
    throw error;
  });
