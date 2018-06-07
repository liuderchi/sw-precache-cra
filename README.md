# sw-precache-cra

👷 Customize your service worker in create react app without `npm run eject`


## The Problem

Create-react-app provides built-in `service-worker.js` but _when you want to extend it_ \
(e.g. to cache REST API response) you need to do `npm run eject` to maintain configs yourself. \

Sometimes we just want to enjoy tiny customization but keep those configs unchanged. \
This cli tool helps you do that with ease.


## Extend Service Worker in Create React App in 2 steps

1. `$ npm i -S sw-precache-cra`

2. Edit the `build` script in `package.json`

There are 2 examples:

💡 If you want your service worker _cache API response with url `/messages`_:

concat the build script

```diff
"scripts": {
  "start": "react-scripts start",
- "build": "react-scripts build",
+ "build": "react-scripts build && sw-precache-cra --config sw-config.js",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

with one additional js module having any [`sw-precache` configs][sw-precache-configs]:

```js
// sw-config.js
module.exports = {
  runtimeCaching: [
    {
      urlPattern: '/messages',
      handler: 'networkFirst',
    },
  ],
};
```

🎉  You've got custom `build/service-worker.js` after `npm run build`

---

💡 If you want to have _Non minified_ `build/service-workder.js` you can do this:

```diff
"scripts": {
  "start": "react-scripts start",
- "build": "react-scripts build",
+ "build": "react-scripts build && sw-precache-cra --no-minify",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

🎉  You've got Un-minified `build/service-worker.js` after `npm run build`


## Other API

```bash
$ sw-precache-cra --list-config
# Print current config for sw-precache
# If you do not specify a config file, default config by CRA is printed
#
{ swFilePath: './build/service-worker.js',
  cacheId: 'sw-precache-webpack-plugin',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [ /^(?!\/__).*/ ],
  staticFileGlobsIgnorePatterns: [ /\.map$/, /asset-manifest\.json$/ ],
  staticFileGlobs:
   [ './build/**/**.html',
     './build/static/js/*.js',
     './build/static/css/*.css',
     './build/static/media/**' ],
  stripPrefix: './build' }
```

For more API please check `sw-precache-cra --help`

## Reference

- [Add more service-worker functionality with create-react-app
](https://stackoverflow.com/questions/47636757/add-more-service-worker-functionality-with-create-react-app)
- [sw-precache README][sw-precache-configs]
- [facebook/create-react-app issue #3132](https://github.com/facebook/create-react-app/issues/3132#issuecomment-330610440)
- [bbhlondon/cra-append-sw
](https://github.com/bbhlondon/cra-append-sw)


## License

[MIT License][mit-license]


[mit-license]: https://liuderchi.mit-license.org/ "mit-license"

[sw-precache-configs]: https://github.com/GoogleChromeLabs/sw-precache#options-parameter "sw-precache-config"
