module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@helpers": "./src/helpers",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
          },
        },
      ],
    ],
  };
};
