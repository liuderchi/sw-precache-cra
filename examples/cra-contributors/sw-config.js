module.exports = {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.github\.com\/.*/,
      handler: 'cacheFirst',
    },
    {
      urlPattern: /^https:\/\/avatars\d?\.githubusercontent\.com\/u\/.*/,
      handler: 'fastest',
    }
  ],
};
