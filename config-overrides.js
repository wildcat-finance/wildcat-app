const { existsSync, writeFileSync, write } = require("fs");
const { config } = require("dotenv");
const path = require("path");

module.exports = {
  webpack: function (config) {
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to modify instead of creating a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      };

      // Return your customized Webpack Development Server config.
      return config;
    };
  },
  paths: function (paths, env) {
    if (!existsSync(path.join(__dirname, ".env.sepolia")) && !existsSync(path.join(__dirname, ".env.mainnet"))) {
      return paths;
    }
    const environmentArg =
      process.argv.find((arg) => arg.startsWith("network=")) ??
      `network=${env === "development" ? `sepolia` : `mainnet`}`;
    const network = environmentArg.split("=")[1];
    const networkEnv = path.join(__dirname, `.env.${network}`);
    if (existsSync(networkEnv)) {
      paths.dotenv = networkEnv;
      config({ path: networkEnv });
    }
    return paths;
  },
};
