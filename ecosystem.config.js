module.exports = {
  apps: [
    {
      name: "estoque",
      script: "node_modules/.bin/next",
      args: "start",
      env: {
        PORT: 3001,
      },
    },
  ],
};
