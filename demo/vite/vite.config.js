export default {
  build: {
    sourcemap: true,
  },
  server: {
    fs: {
      strict: false,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          './node_modules',
          '../node_modules',
          '../../node_modules',
        ],
      },
    },
  },
};
