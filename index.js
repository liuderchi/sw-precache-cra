#!/usr/bin/env node

const program = require('commander');
const swPrecache = require('sw-precache');
const UglifyJS = require('uglify-js');
const fs = require('fs');
const path = require('path');

program
  .version(require('./package.json').version)
  .usage('[-m] [--config]')
  .option('-l, --list-config', 'List config for sw-precache')
  .option('--config <path>', 'Set config file to override the default', String)
  .option('--no-minify', 'Do not minify service worker script')
  .parse(process.argv);

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

const finalConfig = {
  ...defaultConfig,
  ...(program.config ? require(path.resolve(program.config)) : {}),
};

function minify(code) {
  return UglifyJS.minify(code, {
    mangle: true,
    compress: {
      join_vars: true,
    },
  }).code;
}

if (program.listConfig) {
  console.log(finalConfig);
} else {
  swPrecache
    .generate(finalConfig)
    .then(swCode => {
      fs.writeFile(
        defaultConfig.swFilePath,
        program.minify ? minify(swCode) : swCode,
        error => {
          if (error) throw error;
        },
      );
    })
    .catch(error => {
      throw error;
    });
}
